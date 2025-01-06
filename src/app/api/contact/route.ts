import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  category: z.enum(['general', 'support', 'sales', 'partnership', 'press']),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  attachmentUrl: z.string().url().optional(),
});

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const json = await req.json();
    const body = contactSchema.parse(json);

    // Store the contact form submission
    await prisma.contactSubmission.create({
      data: {
        category: body.category,
        name: body.name,
        email: body.email,
        message: body.message,
        attachmentUrl: body.attachmentUrl,
        status: 'PENDING',
      },
    });

    // In a production environment, you would:
    // 1. Send an email notification to support team
    // 2. Send an auto-reply to the user
    // 3. Create a ticket in your support system
    // 4. Store attachments in cloud storage

    return NextResponse.json({
      message: "Message sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }

    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
} 