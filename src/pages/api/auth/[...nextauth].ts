import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const pubAPI = process.env.DIRECTUS_API_ENDPOINT;

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

        const res = await fetch(pubAPI + "auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const user = await res.json();

        console.log("response data here ", user);
        if (!user.data.access_token) {
          throw new Error("Email or password incorrect.");
        }

        if (user.data && user.data.access_token) {
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
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          expires: Date.now() + user.data.expires,
          refreshToken: user.data.refresh_token,
          error: user.data.error,
        };
      }

      if (Date.now() < token.expires) {
        return token;
      }

      // return null;
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token?.accessToken;
      session.user.refreshToken = token?.refreshToken;
      session.user.expires = token?.expires;
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
    const res = await fetch(pubAPI + "auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refresh_token: token?.refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token?.accessToken}`,
      },
      // credentials: "include",
    });
    const response = await res.json();

    const refreshedTokens = await response.data;
    console.log("refreshed tokens ", refreshedTokens);

    if (!response.ok) {
      signIn();
    }

    if (response.ok && refreshedTokens) {
      return {
        ...token,
        accessToken: refreshedTokens?.access_token,
        expires: Date.now() + refreshedTokens?.expires,
        refreshToken: refreshedTokens?.refresh_token,
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
