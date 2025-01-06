import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from 'bcryptjs';
import { AuthenticationError, AuthErrorCode } from "@/lib/types/auth"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          provider: 'github',
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google',
        }
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new AuthenticationError(
            AuthErrorCode.INVALID_CREDENTIALS,
            "Email and password are required"
          );
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || !user.password) {
          throw new AuthenticationError(
            AuthErrorCode.INVALID_CREDENTIALS,
            "Invalid email or password"
          );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new AuthenticationError(
            AuthErrorCode.INVALID_CREDENTIALS,
            "Invalid email or password"
          );
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || '' },
          select: { id: true, emailVerified: true },
        });

        // If OAuth sign in and user exists but hasn't connected this provider
        if (account && existingUser && !account.providerAccountId) {
          throw new AuthenticationError(
            AuthErrorCode.ACCOUNT_EXISTS,
            "An account with this email already exists. Please sign in with your existing account."
          );
        }

        // If account is disabled
        if (existingUser?.emailVerified === null) {
          throw new AuthenticationError(
            AuthErrorCode.ACCOUNT_DISABLED,
            "This account has not been verified. Please check your email for verification instructions."
          );
        }

        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        if (error instanceof AuthenticationError) {
          throw error;
        }
        throw new AuthenticationError(
          AuthErrorCode.OAUTH_PROVIDER_ERROR,
          "An error occurred during sign in"
        );
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.image = token.picture || null;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.picture = user.image;
      }
      // Update picture from OAuth provider if available
      if (account) {
        token.picture = token.picture || null;
      }
      return token;
    },
  },
  events: {
    async signIn({ account }) {
      // Track successful sign-ins for security monitoring
      if (account?.provider !== 'credentials' && account?.providerAccountId) {
        await prisma.user.update({
          where: {
            id: account.userId,
          },
          data: {
            lastSignIn: new Date(),
          },
        });
      }
    },
  },
}); 