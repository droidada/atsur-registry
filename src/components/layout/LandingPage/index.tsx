import React from "react";
import LandingPageHeader from "./Header";
import LandingPageFooter from "./Footer";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const LandingPageLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="relative">
      <LandingPageHeader />
      <main
        className={`${
          !["/explore", "/contact"].includes(pathname) &&
          "page-container pt-8 pb-12"
        } min-h-screen `}
      >
        {children}
      </main>
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageLayout;
