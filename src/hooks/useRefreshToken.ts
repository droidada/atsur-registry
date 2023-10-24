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
      } || cookie token ${Cookies.get("token")}`,
    );
    const res = await axios.post(`${BASE_URL}auth/refresh`, {
      refresh_token:
        session?.user?.accessToken ||
        session?.user?.refreshToken ||
        Cookies.get("token"),
    });

    if (session) {
      console.log("new refresh session here ", session);
      Cookies.set("token", res.data.accessToken);
      session.user.accessToken = res.data.accessToken;
      update({ ...res.data, accessToken: res.data.accessToken });
    } else signIn();
  };
  return refreshToken;
};
