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
      </div>
    </div>
  );
};

export default WalletLayout;
