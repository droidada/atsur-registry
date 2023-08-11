import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../../getLibrary";
import { AuthContextProvider } from "../providers/auth.context";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export default function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthContextProvider>
        <Component {...pageProps} />
        <Analytics />
      </AuthContextProvider>
    </Web3ReactProvider>
  );
}
