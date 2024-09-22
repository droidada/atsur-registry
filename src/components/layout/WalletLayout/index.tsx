import React, { useState } from "react";
import WalletHeader from "./WalletHeader";
import WalletSideBar from "./WalletSidebar";
import SideBar from "../DashboardLayout/SideBar";
import { Stack } from "@mui/material";
import Header from "../DashboardLayout/Header";

interface WalletLayoutProps {
  children: React.ReactNode;
}

const WalletLayout: React.FC<WalletLayoutProps> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);
  return (
    <div className="min-h-screen  flex ">
      <SideBar isWallet hideSidebar={hideSidebar} />
      <Stack className="lg:w-3/4 w-full">
        <Header setHideSidebar={setHideSidebar} />
        <main className="lg:py-[42px]  px-4  py-5 ">
          <div className="page-container">{children}</div>
        </main>
      </Stack>
    </div>
  );
};

export default WalletLayout;
