"use client";
import { axiosAuth } from "../lib/axios";
import Cookies from "cookies";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {

  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      async (config) => {
        const session:any = await getSession();
        console.log("useAxiosAuth: we have session here in ", session);

        if(session) {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${
              session?.jwt
            }`;
          }
          return config;
        }
      },
      (error) => {
        console.log("request interceptor error here ", error);
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("response interceptor error here ", error);
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
         // await refreshToken();
          const session:any = await getSession();
          prevRequest.headers["Authorization"] = `Bearer ${
            session?.jwt
          }`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [refreshToken]);

  return axiosAuth;
};

let authInterceptorID: number;
export const authenticateAPI = (token: string) => {
  authInterceptorID = axiosAuth.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });
};

export const unauthenticateAPI = () => {
  axiosAuth.interceptors.request.eject(authInterceptorID);
};

export default useAxiosAuth;
