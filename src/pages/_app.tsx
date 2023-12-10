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
import { AuthContextProvider } from "../providers/auth.context";
import "@/styles/globals.css";
import ThemeProvider from "@/styles/theme";
import { ProtectedLayout } from "@/components/protected-layout";

// // const queryClient = new QueryClient();
type AppPropsWithAuth = NextPage & {
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};
interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppPropsWithAuth;
}

export default function NextWeb3App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <QueryClientProvider client={queryClient}> */}
      <SessionProvider session={session}>
        <AuthContextProvider>
          {Component.requireAuth ? (
            <ProtectedLayout>
              <ThemeProvider>
                <Component {...pageProps} />
              </ThemeProvider>
            </ProtectedLayout>
          ) : (
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          )}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          {/* <Analytics /> */}
        </AuthContextProvider>
      </SessionProvider>
      {/* </QueryClientProvider> */}
    </Web3ReactProvider>
  );
}
