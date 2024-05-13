import { Stack } from "@mui/material";
import React, { useState } from "react";
import SideBar from "./DashboardLayout/SideBar";
import Footer from "./LandingPage/Footer";
import Header from "./DashboardLayout/Header";
import SearchBar from "./DashboardLayout/SearchBar";

interface Props {
  children: React.ReactNode;
}
const AdminDashboardLayout: React.FC<Props> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);

  return (
    <div className="min-h-screen  flex ">
      <SideBar hideSidebar={hideSidebar} />
      <Stack className="lg:w-3/4 w-full">
        <Header setHideSidebar={setHideSidebar} />
        <main className="lg:py-[42px]  px-4  py-5 ">
          <div className="page-container">{children}</div>
        </main>
      </Stack>
    </div>
  );
};

export default AdminDashboardLayout;
