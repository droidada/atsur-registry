import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";
import { AuthContextProvider } from '../providers/auth.context';

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
