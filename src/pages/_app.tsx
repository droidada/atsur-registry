import type { AppProps } from "next/app";
import { NextPage } from "next/types";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "@/providers/auth.context";
import { ToastProvider } from "@/providers/ToastProvider";
import { LoadingContextProvider } from "@/providers/loading.context";
import { PasswordContextProvider } from "@/providers/password.context";

import "@/styles/globals.css";
import ThemeProvider from "@/styles/theme";
import { ProtectedLayout } from "@/components/protected-layout";
import Preloader from "@/open9/elements/Preloader";
import AddClassBody from "@/open9/elements/AddClassBody";
import "/public/assets/css/style.css";
import "/public/assets/css/responsive.css";
import "wowjs/css/libs/animate.css";

type AppPropsWithAuth = NextPage & {
  requireAuth?: boolean;
  role?: string;
  redirectUnauthenticatedTo?: string;
};
interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppPropsWithAuth;
}

export default function NextWeb3App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <PasswordContextProvider>
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
                <Analytics />
              </ToastProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </LoadingContextProvider>
      </SessionProvider>
    </PasswordContextProvider>
  );
}
