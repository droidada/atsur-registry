import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import { NextPage } from "next/types";
// import { NextPage } from "next";
import { useEffect } from "react";
// import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/react";
// import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import getLibrary from "../../getLibrary";
import { AuthContextProvider, ProtectRoute } from "../providers/auth.context";
import "@/styles/globals.css";

// // const queryClient = new QueryClient();
// type CustomPage = NextPage & {
//   requiresAuth?: boolean;
//   redirectUnauthenticatedTo?: string;
// };
// interface CustomAppProps extends Omit<AppProps, "Component"> {
//   Component: CustomPage;
// }

export default function NextWeb3App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <QueryClientProvider client={queryClient}> */}
      <SessionProvider session={session}>
        {/* {Component.requiresAuth && (
          <Head>
            <script
              // If no token is found, redirect inmediately
              dangerouslySetInnerHTML={{
                __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
                {location.replace(
                  "/login?next=" +
                    encodeURIComponent(location.pathname + location.search)
                )}
                else {document.documentElement.classList.add("render")}`,
              }}
            />
          </Head>
        )} */}
        <AuthContextProvider>
          <ProtectRoute>
            <Component {...pageProps} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            {/* <Analytics /> */}
          </ProtectRoute>
        </AuthContextProvider>
      </SessionProvider>
      {/* </QueryClientProvider> */}
    </Web3ReactProvider>
  );
}
