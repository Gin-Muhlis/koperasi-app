import NextAuth from "next-auth";
import { Auth } from "./interface";

declare module "next-auth" {
  interface Session {
    user: Auth;
  }
}
