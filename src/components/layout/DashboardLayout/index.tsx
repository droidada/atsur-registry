import { Stack } from "@mui/material";
import React, { useState } from "react";
import SideBar from "./SideBar";
import Footer from "../LandingPage/Footer";
import Header from "./Header";
import SearchBar from "./SearchBar";
import DashboardContextProvider from "@/providers/DashboardContext.context";
// import DashboardContextProvider from "@/providers/DashboardContext.context";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);

  return (
    <DashboardContextProvider>
      <div className="min-h-screen  flex ">
        <SideBar hideSidebar={hideSidebar} />
        <Stack className="flex-1 w-full">
          <Header setHideSidebar={setHideSidebar} />
          <main className="lg:py-[42px]  px-4  py-5 ">
            <div className="page-container">{children}</div>
          </main>
        </Stack>
      </div>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
