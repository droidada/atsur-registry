import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const pubAPI = process.env.API_ENDPOINT;

export const options: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(pubAPI + "/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Clear-Site-Data": "*",
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log("response data here---------- ", data);
        if (data?.success == false) {
          throw new Error(data?.message);
        }

        return data.user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 Hours
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        // update the user profile
        return {
          ...token,
          ...session,
        };
      }

      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.jwt = token?.accessToken;
        session.roles = token?.roles;
        session.user = {
          _id: token?._id,
          lastName: token?.lastName,
          firstName: token?.firstName,
          email: token?.email,
          avatar: token?.avatar,
          backgroundImage: token?.backgroundImage,
          bio: token?.bio,
          username: token?.username,
          phone: token?.phone,
        };
      }

      return session;
    },
    // async redirect({ url, baseUrl })
    // {
    //   console.log("url here is ", url);
    //   console.log("baseUrl here is ", baseUrl);
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: true,
};

const nextauthfunc = (req, res) => NextAuth(req, res, options);

export default nextauthfunc;
