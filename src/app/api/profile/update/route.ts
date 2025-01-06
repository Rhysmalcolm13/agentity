import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/auth";
import { ProfileService } from "@/lib/profile/profile-service";

const updateProfileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  // Add additional profile fields here
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const json = await req.json();
    const data = updateProfileSchema.parse(json);

    const profileService = ProfileService.getInstance();
    await profileService.updateProfile(session.user.id, data);

    return NextResponse.json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
} 