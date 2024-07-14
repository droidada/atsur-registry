import React from "react";
import WalletHeader from "./WalletHeader";
import WalletSideBar from "./WalletSidebar";

interface WalletLayoutProps {
  children: React.ReactNode;
}

const WalletLayout: React.FC<WalletLayoutProps> = ({ children }) => {
  return (
    <div>
      <WalletHeader />
      <div className="flex">
        <WalletSideBar />
        <main className="lg:py-[42px] flex-1  px-4  py-5 ">
          <div className="page-container ">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default WalletLayout;
