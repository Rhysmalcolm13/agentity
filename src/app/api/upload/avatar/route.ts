import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { UploadService } from "@/lib/upload/upload-service";
import { ProfileService } from "@/lib/profile/profile-service";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    // Validate the file
    const uploadService = UploadService.getInstance();
    uploadService.validateFile(file);

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');
    await writeFile(join(uploadDir, 'placeholder'), ''); // This will create the directory if it doesn't exist

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${session.user.id}-${timestamp}-${random}.${extension}`;
    const filepath = join(uploadDir, filename);

    // Convert File to Buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Generate public URL
    const url = `/uploads/avatars/${filename}`;

    // Update user's profile with new avatar
    const profileService = ProfileService.getInstance();
    await profileService.updateProfile(session.user.id, { image: url });

    return NextResponse.json({
      url,
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to upload avatar" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 