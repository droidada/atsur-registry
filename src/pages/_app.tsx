import type { AppProps } from "next/app";
import { NextPage } from "next/types";

import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "@/providers/auth.context";
import { ToastProvider } from "@/providers/ToastProvider";
import { LoadingContextProvider } from "@/providers/loading.context";

import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import ThemeProvider from "@/styles/theme";
import { ProtectedLayout } from "@/components/protected-layout";
import Preloader from "@/open9/elements/Preloader";
import AddClassBody from "@/open9/elements/AddClassBody";
import "/public/assets/css/style.css";
import "/public/assets/css/responsive.css";
import "wowjs/css/libs/animate.css";

type AppPropsWithAuth = NextPage & {
  requiresAuth?: boolean;
  redirectUnauthenticatedTo?: string;
};
interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppPropsWithAuth;
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, Celo, Alfajores],
  [publicProvider()],
);

// const connectors = celoGroups({
//   chains,
//   projectId,
//   appName: (typeof document === "object" && document.title) || process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_NAME || "Your App Name",
// });

const appInfo = {
  appName: "Atsur Registry",
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  webSocketPublicClient,
  publicClient: publicClient,
});

export default function NextWeb3App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo} coolMode={true}>
        <SessionProvider session={session}>
          <LoadingContextProvider>
            <AuthContextProvider>
              <ThemeProvider>
                <ToastProvider>
                  {Component.requireAuth ? (
                    <ProtectedLayout>
                      {/* <AddClassBody /> */}
                      <Component {...pageProps} />
                    </ProtectedLayout>
                  ) : (
                    <Component {...pageProps} />
                  )}
                  {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                  {/* <Analytics /> */}
                </ToastProvider>
              </ThemeProvider>
            </AuthContextProvider>
          </LoadingContextProvider>
        </SessionProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
