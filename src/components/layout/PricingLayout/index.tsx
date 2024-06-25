import { Stack } from "@mui/material";
import React from "react";
import Header from "../DashboardLayout/Header";
import LandindingPageHeader from "../LandingPage/Header";
import LandingPageFooter from "../LandingPage/Footer";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
  HeroSection: React.ReactNode;
}
const PricingLayout: React.FC<Props> = ({ children, HeroSection }) => {
  const router = useRouter();
  const pathname = router.pathname;

  console.log(pathname);
  return (
    <Stack className="bg-white">
      <div className="bg-secondary">
        <LandindingPageHeader />
        <div className={`${pathname !== "/" && "page-container"}`}>
          {HeroSection}
        </div>
      </div>
      {children}

      <LandingPageFooter />
    </Stack>
  );
};

export default PricingLayout;
