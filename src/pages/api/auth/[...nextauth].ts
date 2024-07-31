import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { signIn } from "next-auth/react";
import dotenv from "dotenv";
import axios from "axios";
import UserList from "@/pages/admin/users";

dotenv.config();

const pubAPI = process.env.API_ENDPOINT;

export const options: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
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
      if (account?.provider === "google") {
        try {
          console.log("inside google provider");
          const res = await axios.post(
            `${pubAPI}/google`,
            { idToken: account?.id_token },
            { headers: { authorization: `Bearer ${account?.access_token}` } },
          );
          console.log(
            " google auth save response data here---------- ",
            res.data,
          );

          token._id = res.data?.user?._id;
          token.lastName = res.data?.user?.lastName;
          token.firstName = res.data?.user?.firstName;
          token.email = res.data?.user?.email;
          token.avatar = res.data?.user?.avatar;
          token.backgroundImage = res.data?.user?.backgroundImage;
          token.bio = res.data?.user?.bio;
          token.username = res.data?.user?.username;
          token.phone = res.data?.user?.phone;
          token.accessToken = res.data?.user?.accessToken;
          token.roles = res.data?.user?.roles;
        } catch (error) {
          console.log("google request error here ---- ");
        }
      }

      if (account?.provider === "linkedin") {
        try {
          console.log("inside linkedin provider");
          const res = await axios.post(
            `${pubAPI}/google`,
            { idToken: account?.id_token },
            { headers: { authorization: `Bearer ${account?.access_token}` } },
          );
          console.log(
            " linkedin auth save response data here---------- ",
            res.data,
          );

          token._id = res.data?.user?._id;
          token.lastName = res.data?.user?.lastName;
          token.firstName = res.data?.user?.firstName;
          token.email = res.data?.user?.email;
          token.avatar = res.data?.user?.avatar;
          token.backgroundImage = res.data?.user?.backgroundImage;
          token.bio = res.data?.user?.bio;
          token.username = res.data?.user?.username;
          token.phone = res.data?.user?.phone;
          token.accessToken = res.data?.user?.accessToken;
          token.roles = res.data?.user?.roles;
        } catch (error) {
          console.log("google request error here ---- ");
        }
      }

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
      // console.log(" inside session callback..... token ", token)
      // console.log(" inside session callback..... session ", session)
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
