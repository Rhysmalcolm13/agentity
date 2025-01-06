import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { randomBytes } from "crypto";
import { EmailService } from "@/lib/email/email-service";
import { withRateLimit } from "@/lib/rate-limit";

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  ),
});

// More strict rate limiting for registration
const registerRateLimit = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,           // 5 requests per hour
};

async function handler(req: Request): Promise<NextResponse> {
  try {
    const json = await req.json();
    const body = registerSchema.parse(json);

    const exists = await prisma.user.findUnique({
      where: { email: body.email },
      select: { id: true },
    });

    if (exists) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(body.password, 10);

    // Create verification token
    const verificationToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token expires in 24 hours

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        identifier: user.email as string,
        token: verificationToken,
        expires: tokenExpiry,
      },
    });

    // Send verification email
    const emailService = EmailService.getInstance();
    await emailService.sendVerificationEmail({
      email: user.email as string,
      name: user.name as string,
      verificationToken,
    });

    // Also send welcome email
    await emailService.sendWelcomeEmail({
      email: user.email as string,
      name: user.name as string,
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(handler, registerRateLimit); 