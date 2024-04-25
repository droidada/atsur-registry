import { Stack } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";
import Footer from "../LandingPage/Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <Stack>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        sx={{ minHeight: "100vh" }}
      >
        <SideBar />
        <Stack className="lg:w-3/4 w-full">
          <Header />
          <main className="py-[42px] px-4 lg:px-[70px]">{children}</main>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default DashboardLayout;
