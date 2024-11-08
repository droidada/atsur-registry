import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { Head, Html, Main, NextScript } from "next/document";

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
        <GoogleAnalytics />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
