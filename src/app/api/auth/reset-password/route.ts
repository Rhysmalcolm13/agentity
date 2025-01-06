import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { randomBytes } from "crypto";
import { EmailService } from "@/lib/email/email-service";
import { withRateLimit } from "@/lib/rate-limit";

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

// Strict rate limiting for password reset requests
const resetPasswordRateLimit = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,           // 3 requests per hour
};

async function handler(req: Request): Promise<NextResponse> {
  try {
    const json = await req.json();
    const body = resetPasswordSchema.parse(json);

    // Delete any existing reset tokens for this user
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: body.email,
      },
    });

    // Create reset token
    const resetToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // Token expires in 1 hour

    // Store reset token
    await prisma.verificationToken.create({
      data: {
        identifier: body.email,
        token: resetToken,
        expires: tokenExpiry,
      },
    });

    // Get user details for the email
    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: { name: true },
    });

    // Send password reset email
    const emailService = EmailService.getInstance();
    await emailService.sendPasswordResetEmail({
      email: body.email,
      name: user?.name || 'there',
      resetToken,
    });

    return NextResponse.json({
      message: "If an account exists with this email, you will receive password reset instructions.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Password reset error:', error);
    // Return the same message even if there's an error to prevent email enumeration
    return NextResponse.json({
      message: "If an account exists with this email, you will receive password reset instructions.",
    });
  }
}

export const POST = withRateLimit(handler, resetPasswordRateLimit); 