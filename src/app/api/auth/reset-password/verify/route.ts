import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { withRateLimit } from "@/lib/rate-limit";

const resetPasswordVerifySchema = z.object({
  token: z.string(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  ),
});

// Strict rate limiting for password reset verification
const resetPasswordVerifyRateLimit = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,           // 5 attempts per hour
};

async function handler(req: Request): Promise<NextResponse> {
  try {
    const json = await req.json();
    const body = resetPasswordVerifySchema.parse(json);

    // Find and validate the reset token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token: body.token,
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date() > verificationToken.expires) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });

      return NextResponse.json(
        { message: "Reset token has expired" },
        { status: 400 }
      );
    }

    // Update user's password
    const hashedPassword = await hash(body.password, 10);
    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: {
        password: hashedPassword,
      },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      },
    });

    return NextResponse.json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Password reset verification error:', error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(handler, resetPasswordVerifyRateLimit); 