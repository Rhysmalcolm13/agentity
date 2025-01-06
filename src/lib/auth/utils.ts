import { auth } from "@/lib/auth/auth";
import { Session } from "next-auth";

export async function getCurrentUser(): Promise<Session["user"] | undefined> {
  const session = await auth();
  return session?.user;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session?.user;
} 