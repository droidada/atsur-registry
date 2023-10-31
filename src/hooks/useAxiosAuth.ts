"use client";
import { axiosAuth } from "../lib/axios";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  console.log("token here is  ", session?.user?.accessToken);
  console.log("or token here is  ", Cookies.get("token"));
  useEffect(() => {
    Cookies.set("token", session?.user?.accessToken);
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${
            session?.user?.accessToken || Cookies.get("token")
          }`;
        }
        return config;
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
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${
            session?.user?.accessToken || Cookies.get("token")
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
  }, [session, refreshToken]);

  return axiosAuth;
};

// let authInterceptorID: number;
// export const authenticateAPI = (token: string) => {
//   authInterceptorID = api.interceptors.request.use((config) => {
//     config.headers.authorization = `bearer ${token}`;
//     return config;
//   });
// };

// export const unauthenticateAPI = () => {
//   api.interceptors.request.eject(authInterceptorID);
// };

export default useAxiosAuth;
