import type { NextAuthOptions } from "next-auth";
import { prisma } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.email = user.email;
      session.user.name = user.name;
      session.user.image = user.image;
      session.user.bio = user.bio;
      session.user.createdAt = user.createdAt;
      session.user.updatedAt = user.updatedAt;
      return session;
    },
  },
};
