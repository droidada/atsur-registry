import { DefaultSession, DefaultUser } from "next-auth";

export enum Role {
  user = "user",
  admin = "admin",
}

interface IUser extends DefaultUser {
  accessToken?: string;
  refreshToken?: string;
  role?: Role;
  subscribed?: boolean;
}

// Augmenting the "next-auth" module
declare module "next-auth" {
  interface User extends IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    phone: string;
    bio: string;
    linkedIn: string;
    twitter: string;
    instagram: string;
    facebook: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
  }

  interface Session {
    user?: User;
  }
}

// Augmenting the "next-auth/jwt" module
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
