import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../../getLibrary";
import { AuthContextProvider } from "../providers/auth.context";
import RootLayout from "@/components/layouts/RootLayout";
import { Analytics } from '@vercel/analytics/react';
import "@/styles/main.scss";

export default function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthContextProvider>
        <RootLayout>
          <Component {...pageProps} />
          <Analytics />
        </RootLayout>
      </AuthContextProvider>
    </Web3ReactProvider>
  );
}
