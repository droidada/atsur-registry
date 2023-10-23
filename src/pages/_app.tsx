import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
// import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import getLibrary from "../../getLibrary";
import { AuthContextProvider, ProtectRoute } from "../providers/auth.context";
import "@/styles/globals.css";

// const queryClient = new QueryClient();

export default function NextWeb3App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <QueryClientProvider client={queryClient}> */}
      <SessionProvider session={session}>
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
