"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    console.log(
      `access token: ${session?.user?.accessToken} || refresh token: ${
        session?.user?.refreshToken
      } || cookie refresh token ${Cookies.get("refreshToken")}`,
    );
    const refreshToken =
      session?.user?.refreshToken || Cookies.get("refreshToken");
    if (refreshToken) {
      await axios.post(`${BASE_URL}auth/refresh-token`, {
        refreshToken: refreshToken,
        mode: "json",
      });
    }

    if (session) {
      console.log("new refresh session here ", session);
      Cookies.set("accessToken", session?.user?.accessToken);
      Cookies.set("refreshToken", session?.user?.refreshToken);
    }
  };
  return refreshToken;
};
