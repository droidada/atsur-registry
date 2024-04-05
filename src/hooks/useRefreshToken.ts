"use client";

import axios from "axios";
import { signIn, useSession, getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const useRefreshToken = () => {
  const { update } = useSession();

  const refreshToken = async () => {

  //  await update();
    const session:any  = await getSession();

    const refreshToken = session?.user?.refreshToken;
    if (refreshToken) {
      await axios.post(`${BASE_URL}auth/refresh-token`, {
        refreshToken: refreshToken,
        mode: "json",
      });
    }

    if (session) {
      console.log("new refresh session here ", session);
    }
  };
  return refreshToken;
};
