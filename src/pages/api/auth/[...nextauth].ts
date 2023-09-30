import NextAuth from "next-auth";
import { GetSessionParams } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";

dotenv.config();

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      // requestTokenUrl: `${process.env.DIRECTUS_API_ENDPOINT}/auth/login`,
      // retrieveTokenUrl: `${process.env.DIRECTUS_API_ENDPOINT}/auth/refresh`,
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(
          `https://directus-admin-service-mr73ptziua-uc.a.run.app/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          },
        );

        const user = await res.json();

        if (!res.ok) {
          throw new Error("Wrong username or password");
        }

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: "SUPER_SECRET_JWT_SECRET",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
};

const Auth = (req, res) => NextAuth(req, res, authOptions);
export default Auth;
