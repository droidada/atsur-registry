"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";
const BASE_URL = "https://directus-admin-service-mr73ptziua-uc.a.run.app/";

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
      await axios.post(`${BASE_URL}auth/refresh`, {
        refresh_token: refreshToken,
        mode: "json",
      });
    }

    // if (session) {
    //   console.log("new refresh session here ", session);
    //   Cookies.set("accessToken", res.data.accessToken);
    //   Cookies.set("refreshToken", res.data.refreshToken);
    //   session.user.accessToken = res.data.accessToken;
    //   update({ ...res.data, accessToken: res.data.accessToken });
    // }
  };
  return refreshToken;
};
