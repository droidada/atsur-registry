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
        console.log("pubapi here is ", pubAPI);
        // const res = await axios.post(`${pubAPI}auth/login`, {
        //   ...payload,
        //   mode: "json",
        // });

        const res = await fetch(pubAPI + "/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
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
        return {
          ...token,
          user: user,
        };
      }

      if (Date.now() < token.expires) {
        return token;
      }

      // return null;
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log("session=================");
      console.log(
        `session: ${JSON.stringify(session)}  token: ${JSON.stringify(token)}`,
      );
      session.user.accessToken = token?.user.accessToken;
      session.user.refreshToken = token?.user.user.refreshToken;
      session.user.expires = token?.user.user.expires;
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

async function refreshAccessToken(token) {
  try {
    const res = await fetch(pubAPI + "/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: token?.refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await res.json();

    console.log("refreshed tokens ", response);

    if (!response.ok) {
      signIn();
    }

    if (response) {
      return {
        ...token,
        accessToken: response?.accessToken,
        expires: Date.now() + response?.expires,
        refreshToken: response?.refreshToken,
      };
    }
  } catch (error) {
    console.log(
      new Date().toUTCString() + " Error in refreshAccessToken:",
      error,
    );

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const nextauthfunc = (req, res) => NextAuth(req, res, options);

export default nextauthfunc;
