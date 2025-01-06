import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { EmailService } from "@/lib/email/email-service";

const settingsSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  ).optional(),
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
    agent: z.boolean().optional(),
  }).optional(),
  appearance: z.object({
    animations: z.boolean().optional(),
  }).optional(),
  api: z.object({
    webhookUrl: z.string().url().optional(),
  }).optional(),
});

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = settingsSchema.parse(json);

    // If changing password, verify current password
    if (body.newPassword) {
      if (!body.currentPassword) {
        return NextResponse.json(
          { message: "Current password is required" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { password: true },
      });

      if (!user?.password) {
        return NextResponse.json(
          { message: "Invalid current password" },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        body.currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid current password" },
          { status: 400 }
        );
      }
    }

    // Get current user data for comparison
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true, name: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Handle email change verification
    if (body.email && body.email !== currentUser.email) {
      // Create verification token for new email
      const verificationToken = randomBytes(32).toString('hex');
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token expires in 24 hours

      // Store the new email and verification token
      await prisma.verificationToken.create({
        data: {
          identifier: body.email,
          token: verificationToken,
          expires: tokenExpiry,
        },
      });

      // Send verification email to new address
      const emailService = EmailService.getInstance();
      await emailService.sendVerificationEmail({
        email: body.email,
        name: currentUser.name || 'there',
        verificationToken,
      });

      // Don't update email until verified
      delete body.email;
    }

    // Update user data
    const updateData: any = {};
    if (body.name) updateData.name = body.name;
    if (body.newPassword) {
      updateData.password = await bcrypt.hash(body.newPassword, 10);
    }

    // Update user settings
    await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

    return NextResponse.json({
      message: body.email ? 
        "Settings updated successfully. Please check your new email address for verification." :
        "Settings updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Settings update error:', error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
} 