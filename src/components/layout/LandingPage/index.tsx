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
  console.log(pathname);
  return (
    <>
      <LandingPageHeader />
      <main
        className={`${
          pathname !== "/explore" && "page-container"
        } min-h-screen pt-8 pb-12`}
      >
        {children}
      </main>
      <LandingPageFooter />
    </>
  );
};

export default LandingPageLayout;
