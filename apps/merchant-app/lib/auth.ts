import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("hi signin");

      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true
        },
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account?.provider === "google" ? "Google" : "Github" // Use a prisma enum type if available
        },
        update: {
          name: user.name,
          auth_type: account?.provider === "google" ? "Google" : "Github" // Use a prisma enum type if available
        }
      });

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};
