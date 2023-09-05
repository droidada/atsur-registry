import { axiosAuth } from "./auth";
import { signIn, getSession } from "next-auth/react";

const refreshToken = async () => {
    const session: any = await getSession();

    const res = await axiosAuth.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
    else signIn();
  };

export { refreshToken };