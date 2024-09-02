/* eslint-disable @next/next/inline-script-id */
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <link rel="shortcut icon" href="/images/atsur-logo.svg" />
      <link rel="preconnect" href="https://fonts.bunny.net" />
      <link
        href="https://fonts.bunny.net/css?family=roboto:300,300i,400,400i,500,500i,700,700i,900,900i"
        rel="stylesheet"
      />
      <body>
        {/* <GoogleAnalytics /> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-3QE7TBP184"></Script>
        <Script>
          {`          
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-3QE7TBP184');
          `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
