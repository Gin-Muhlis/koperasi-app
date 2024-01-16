import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

type User = {
  email: string;
  username: string;
  role: string;
  token: string;
};

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "technoG77",
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
          return response.data
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.data?.email;
        token.username = user.data?.username;
        token.role = user.role;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("token" in token) {
        session.user.token = token.token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
