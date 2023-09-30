import { DefaultSession, DefaultUser } from "next-auth";

// nextauth.d.ts
export enum Role {
  user = "user",
  admin = "admin",
}
interface IUser extends DefaultUser {
  accessToken?: string;
  refreshToken?: string;
  /**
   * Role of user
   */
  role?: Role;
  /**
   * Field to check whether a user has a subscription
   */
  subscribed?: boolean;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
