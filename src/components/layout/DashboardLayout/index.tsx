import { Stack } from "@mui/material";
import React, { useState } from "react";
import SideBar from "./SideBar";
import Footer from "../LandingPage/Footer";
import Header from "./Header";
import SearchBar from "./SearchBar";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);

  return (
    <div className="min-h-screen  flex ">
      <SideBar hideSidebar={hideSidebar} />
      <Stack className=" w-full">
        <Header setHideSidebar={setHideSidebar} />
        <main className="lg:py-[42px]  px-4 lg:px-6 py-5 ">
          <div className="page-container">{children}</div>
        </main>
      </Stack>
    </div>
  );
};

export default DashboardLayout;
