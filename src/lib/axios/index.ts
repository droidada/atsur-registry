import { getSession } from "next-auth/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import axiosAuth from "./auth";
import { refreshToken } from "./refreshToken";

export { axiosAuth, refreshToken };


  axiosAuth.interceptors.request.use(
    async (config) => {
      const session: any = await getSession();
      console.log("session here is ", session)
      const accessToken = session?.user.accessToken;

      if (!config.headers["Authorization"]) {
        console.log("don't have authorization header?")
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  )

  axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      const session: any = await getSession();

      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        await refreshToken();
        prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
        return axiosAuth(prevRequest);
      }
      return Promise.reject(error);
    }
  )


export default axiosAuth;


