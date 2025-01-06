import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { ProfileService } from "@/lib/profile/profile-service";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const profileService = ProfileService.getInstance();
    const progress = await profileService.getProfileProgress(session.user.id);

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Profile progress error:', error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
} 