import React from "react";
import LandingPageHeader from "./Header";
import LandingPageFooter from "./Footer";

interface Props {
  children: React.ReactNode;
}

const LandingPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <LandingPageHeader />
      <main className="page-container min-h-screen pt-8 pb-12">{children}</main>
      <LandingPageFooter />
    </>
  );
};

export default LandingPageLayout;
