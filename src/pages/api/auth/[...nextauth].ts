import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import dotenv from "dotenv";
import axios from "axios";
//import Cookies from "cookies";

// let cookies;

// const setRefreshCookie = ({ cookies, accessToken, refreshToken }) => {
//   const date = new Date();
//   const time = date.getTime();
//   const expireTime = time + 24 * 60 * 60 * 1000 * 30; // 30 days
//   date.setTime(expireTime);

//   cookies.set("refreshToken", refreshToken, {
//     sameSite: "strict",
//     overwrite: true,
//     expires: date,
//     httpOnly: true,
//   });

//   cookies.set("accessToken", accessToken, {
//     sameSite: "strict",
//     overwrite: true,
//     expires: date,
//     httpOnly: true,
//   });
// };

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
        console.log("payload here is ", payload);
        console.log("pubapi here is ", pubAPI);

        const res = await fetch(pubAPI + "/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "Clear-Site-Data": "*",
          },
          credentials: "include",
        });

        const user = await res.json();
        console.log("response data here ", user);
        if (!user.accessToken) {
          throw new Error("Email or password incorrect.");
        }

        if (user && user.accessToken) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(`token: ${token}`);
      if (account && user) {
        console.log(`account: ${account} && user ${user}`);
        // setRefreshCookie({
        //   cookies,
        //   accessToken: account.access_token,
        //   refreshToken: account.refresh_token,
        // });
        return {
          ...token,
          user: user,
        };
      }

      if (Date.now() < token.expires) {
        return token;
      }

      return null;
    },

    async session({ session, token }) {
      console.log("session=================");
      console.log(
        `session: ${JSON.stringify(session)}  token: ${JSON.stringify(token)}`,
      );
      session.user.accessToken = token?.user?.accessToken;
      session.user.refreshToken = token?.user?.refreshToken;
      session.user.expires = token?.exp;
      session.user.error = token?.error;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  debug: true,
};

// async function refreshAccessToken(token) {
//   try {
//     const res = await fetch(pubAPI + "/auth/refresh-token", {
//       method: "POST",
//       body: JSON.stringify({
//         refreshToken: token?.refreshToken,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });
//     const response = await res.json();

//     console.log("refreshed tokens ", response);

//     if (!response.ok) {
//       signIn();
//     }

//     if (response) {
//       return {
//         ...token,
//         accessToken: response?.accessToken,
//         expires: Date.now() + response?.expires,
//         refreshToken: response?.refreshToken,
//       };
//     }
//   } catch (error) {
//     console.log(
//       new Date().toUTCString() + " Error in refreshAccessToken:",
//       error,
//     );

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

const nextauthfunc = (req, res) => {
//cookies = new Cookies(req, res);
  return NextAuth(req, res, options);
};

export default nextauthfunc;
