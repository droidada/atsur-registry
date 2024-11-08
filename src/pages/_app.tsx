import type { AppProps } from "next/app";
import { NextPage } from "next/types";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "@/providers/auth.context";
import { ToastProvider } from "@/providers/ToastProvider";
import { LoadingContextProvider } from "@/providers/loading.context";
import { PasswordContextProvider } from "@/providers/password.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import "react-tooltip/dist/react-tooltip.css";
import SEO from "../../next-seo.config";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "@/styles/globals.css";

import ThemeProvider from "@/styles/theme";
import { ProtectedLayout } from "@/components/protected-layout";
import { TourProvider, useTour } from "@reactour/tour";

import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LoadingScreen from "../components/layout/LoadingScreen";
import { pageTours } from "@/lib/helpers/driverObj";
import TourWrapper from "@/components/layout/DashboardLayout/TourWrapper";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type AppPropsWithAuth = NextPage & {
  requireAuth?: boolean;
  role?: string;
  redirectUnauthenticatedTo?: string;
};
interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppPropsWithAuth;
}

const queryClient = new QueryClient();
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

export default function NextWeb3App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { setIsOpen, setCurrentStep, steps, setSteps } = useTour();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      delay: 100,
      offset: 200,
    });
  }, []);

  // useEffect(() => {
  //   console.log("pageTour", pageTours[router.pathname]);
  //   if (pageTours[router.pathname]) {
  //     setSteps(pageTours[router.pathname]);
  //     setIsOpen(true); // Start the tour for the current page
  //     setCurrentStep(0); // Ensure the tour starts from the first step
  //   } else {
  //     setIsOpen(false); // Close the tour if there's no tour for the route
  //   }
  // }, [router.pathname, setIsOpen, setSteps, setCurrentStep]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <LoadingContextProvider>
          <AuthContextProvider>
            <ThemeProvider>
              <ToastProvider>
                <TourWrapper>
                  <DefaultSeo {...SEO} />
                  <LoadingScreen loading={loading} />
                  {/* <PageTransition> */}
                  {Component.requireAuth ? (
                    <ProtectedLayout>
                      {/* <AddClassBody /> */}
                      <Component {...pageProps} />
                    </ProtectedLayout>
                  ) : (
                    <Component {...pageProps} />
                  )}
                  {/* </PageTransition> */}
                  {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                  <Analytics />
                </TourWrapper>
              </ToastProvider>
            </ThemeProvider>
          </AuthContextProvider>
        </LoadingContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
