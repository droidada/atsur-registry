import TwSizeIndicator from "@/components/layouts/shared/TwSizeIndicator";
import config from "@/data/config.json";
import theme from "@/data/theme.json";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";

export default function RootLayout({ children }) {
  // import google font css
  return (
    <>
      <TwSizeIndicator />
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
    </>
  );
}
