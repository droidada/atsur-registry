"use client";

import axios from "../lib/axios";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("auth/refresh", {
      refresh: session?.user?.refreshToken,
      mode: "json",
    });

    if (session) {
      console.log("new refresh session here ", session);
      session.user.accessToken = res.data.accessToken;
      update({ ...res.data, accessToken: res.data.accessToken });
    } else signIn();
  };
  return refreshToken;
};
