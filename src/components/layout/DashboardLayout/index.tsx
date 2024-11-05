import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Footer from "../LandingPage/Footer";
import Header from "./Header";

import DashboardContextProvider from "@/providers/DashboardContext.context";
import { useRouter } from "next/router";

import { FaRegCircleQuestion } from "react-icons/fa6";
// import DashboardContextProvider from "@/providers/DashboardContext.context";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);

  const pathname = useRouter().pathname;

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
        {/* <button
          onClick={startTour}
          className="fixed bottom-20 right-4 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-full p-2 shadow-sm transition-colors duration-200"
          aria-label="View Artwork Features Tour"
        >
          <FaRegCircleQuestion />
        </button> */}
      </div>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
