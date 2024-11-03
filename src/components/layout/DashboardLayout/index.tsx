import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Footer from "../LandingPage/Footer";
import Header from "./Header";

import { driver } from "driver.js";

import DashboardContextProvider from "@/providers/DashboardContext.context";
import { useRouter } from "next/router";
import { driverAllPageSteps } from "@/lib/helpers/driverObj";
import { FaRegCircleQuestion } from "react-icons/fa6";
// import DashboardContextProvider from "@/providers/DashboardContext.context";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);
  // const [driverObj, setDriverObj] = useState(null);
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardTourComplete") === "true";
    }
    return false;
  });
  const pathname = useRouter().pathname;

  const driverObj = driver({
    allowClose: true,
    nextBtnText: "Next",
    prevBtnText: "Previous",
    steps: [...driverAllPageSteps(pathname)],
  });

  useEffect(() => {
    // Only show the tour if user hasn't seen it and we're on the dashboard page
    if (!hasSeenTour && pathname === "/dashboard") {
      const timer = setTimeout(() => {
        driverObj.drive();
        localStorage.setItem("dashboardTourComplete", "true");
        setHasSeenTour(true);
      }, 1000); // Slight delay to ensure components are mounted

      return () => clearTimeout(timer);
    }
  }, [hasSeenTour, pathname]);

  const startTour = () => {
    console.log("This is the driverObj", driverObj);
    if (driverObj) {
      driverObj.drive();
    }
    return { startTour };
  };

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
        <button
          onClick={startTour}
          className="fixed bottom-20 right-4 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-full p-2 shadow-sm transition-colors duration-200"
          aria-label="View Artwork Features Tour"
        >
          <FaRegCircleQuestion />
        </button>
      </div>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;
