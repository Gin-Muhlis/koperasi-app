import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const data = { email, password };

        let response: any = await axios.post(
          `${process.env.PUBLIC_API_URL}/login`,
          data
        );

        if (response.status !== 200 && !response.data) {
          return null;
        } else {
          return response.data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.name = user.name;
        token.role = user.role;
        token.imageProfile = user.imageProfile;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("imageProfile" in token) {
        session.user.role = token.imageProfile;
      }
      if ("accessToken" in token) {
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
    
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
