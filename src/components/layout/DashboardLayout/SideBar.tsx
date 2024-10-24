import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  adminDashboardSidebarMenu,
  dashboardSidebarMenu,
  walletDashboardSideMenu,
} from "@/lib/utils/navs";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

import { driver } from "driver.js";

interface Props {
  hideSidebar?: boolean;
  isMobile?: boolean;
  isAdmin?: boolean;
  isWallet?: boolean;
}

const SideBar: React.FC<Props> = ({
  hideSidebar,
  isMobile,
  isAdmin,
  isWallet,
}) => {
  const pathname = useRouter().pathname;
  const router = useRouter();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardTourComplete") === "true";
    }
    return false;
  });

  const driverObj = driver({
    showProgress: true,
    allowClose: true,
    nextBtnText: "Next",
    prevBtnText: "Previous",
    steps: [
      {
        element: "#dashboard-logo",
        popover: {
          title: "Welcome to Your Dashboard",
          description:
            "This is your central hub for managing all your activities.",
          side: "right",
          align: "start",
        },
      },
      {
        element: "#createButton",
        popover: {
          title: "Create New Artwork",
          description: "Click here to start creating your new artwork piece.",
          side: "right",
          align: "center",
        },
      },
      {
        element: "#navigation-menu",
        popover: {
          title: "Navigation Menu",
          description: "Access different sections of your dashboard from here.",
          side: "right",
          align: "start",
        },
      },

      {
        element: "#user-logout",
        popover: {
          title: "Logout",
          description: "Click here when you're ready to end your session.",
          side: "right",
          align: "end",
        },
      },
    ],
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
    driverObj.drive();
  };

  return (
    <div
      className={`bg-secondary-white flex-shrink-0  overflow-y-auto  flex-col       ${
        isMobile
          ? "flex w-full"
          : "hidden lg:flex sticky top-0 w-fit border-r-2  h-screen"
      }`}
    >
      <div className="border-b-2 sticky top-0 bg-secondary-white z-[200]">
        <Image
          id="dashboard-logo"
          src="/atsur-dashboar-logo.png"
          alt="atsur"
          width={299}
          height={76}
        />
      </div>

      <Stack direction={"column"} className="gap-14 px-8 pb-10">
        <div className="mt-10 flex justify-center">
          {isAdmin ? (
            <h3 className="text-[20px] font-[600] text-center">
              Admin Dashboard
            </h3>
          ) : isWallet ? (
            <h3 className="text-[20px] font-[600] text-center">Wallet</h3>
          ) : (
            <Button
              id="createButton"
              onClick={() => router.push("/dashboard/artworks/create")}
              className="flex gap-3 w-[152px] h-[39.5px] text-[15px] leading-[16px] hover:scale-95 duration-700 items-center p-0 divide-white bg-primary text-white"
            >
              <span className="flex-1"> Create</span>
              <span className="h-full w-1/3 border-l-[1px] grid place-items-center ">
                <FaRegPlusSquare size={20} />
              </span>
            </Button>
          )}
        </div>

        {isAdmin
          ? adminDashboardSidebarMenu.map((item) => (
              <div
                id="navigation-menu"
                key={`dashboard-menu-${item?.title}`}
                className="flex flex-col  gap-6"
              >
                <h2 className="py-5 border-b-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
                  {item.title}
                </h2>
                {item.menus?.map((menu) =>
                  //@ts-ignore
                  menu?.isButton ? (
                    <h4
                      onClick={() => signOut()}
                      className="text-[17px] cursor-pointer leading-[16px] flex gap-3 items-center "
                      key={`button-${menu.title}`}
                    >
                      {typeof menu.icon === "string" ? (
                        <Image
                          src={menu?.icon}
                          alt={menu?.title}
                          width={18}
                          height={18}
                        />
                      ) : (
                        <menu.icon size={18} />
                      )}
                      <span>{menu?.title}</span>
                    </h4>
                  ) : (
                    <Link
                      key={`submenu-${menu.title}`}
                      href={menu?.link}
                      className={`text-[17px] leading-[16px] no-underline  flex gap-3 items-center ${
                        pathname.includes(menu.title?.toLowerCase())
                          ? "font-[600]"
                          : "font-[300]"
                      }`}
                    >
                      {typeof menu.icon === "string" ? (
                        <Image
                          src={menu?.icon}
                          alt={menu?.title}
                          width={18}
                          height={18}
                        />
                      ) : (
                        <menu.icon size={18} />
                      )}
                      {menu?.title}
                    </Link>
                  ),
                )}
              </div>
            ))
          : isWallet
          ? walletDashboardSideMenu.map((item) => (
              <div
                id="navigation-menu"
                key={`dashboard-menu-${item?.title}`}
                className="flex flex-col  gap-6"
              >
                <h2 className="py-5 border-b-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
                  {item.title}
                </h2>
                {/* @ts-ignore */}
                {item?.menus?.map((menu) =>
                  menu?.isButton ? (
                    <h4
                      onClick={() => setOpenLogoutModal(true)}
                      className="text-[17px] cursor-pointer leading-[16px] flex gap-3 items-center "
                      key={`button-${menu.title}`}
                    >
                      <Image
                        src={menu?.icon}
                        alt={menu?.title}
                        width={18}
                        height={18}
                      />
                      <span>{menu?.title}</span>
                    </h4>
                  ) : (
                    <Link
                      key={`submenu-${menu.title}`}
                      href={menu?.link}
                      className={`text-[17px] leading-[16px] no-underline  flex gap-3 items-center ${
                        pathname.includes(menu.title?.toLowerCase())
                          ? "font-[600]"
                          : "font-[300]"
                      }`}
                    >
                      <Image
                        src={menu?.icon}
                        alt={menu?.title}
                        width={18}
                        height={18}
                      />
                      {menu?.title}
                    </Link>
                  ),
                )}
              </div>
            ))
          : dashboardSidebarMenu.map((item) => (
              <div
                id="navigation-menu"
                key={`dashboard-menu-${item?.title}`}
                className="flex flex-col  gap-6"
              >
                <h2 className="py-5 border-b-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
                  {item.title}
                </h2>
                {item.menus?.map((menu) =>
                  menu?.isButton ? (
                    <h4
                      id="user-logout"
                      onClick={() => setOpenLogoutModal(true)}
                      className="text-[17px] cursor-pointer leading-[16px] flex gap-3 items-center "
                      key={`button-${menu.title}`}
                    >
                      {typeof menu.icon === "string" ? (
                        <Image
                          src={menu?.icon}
                          alt={menu?.title}
                          width={18}
                          height={18}
                        />
                      ) : (
                        <menu.icon size={18} />
                      )}
                      <span>{menu?.title}</span>
                    </h4>
                  ) : (
                    <Link
                      key={`submenu-${menu.title}`}
                      href={menu?.link}
                      className={`text-[17px] leading-[16px] no-underline  flex gap-3 items-center ${
                        pathname.includes(menu.title?.toLowerCase())
                          ? "font-[600]"
                          : "font-[300]"
                      }`}
                    >
                      {typeof menu.icon === "string" ? (
                        <Image
                          src={menu?.icon}
                          alt={menu?.title}
                          width={18}
                          height={18}
                        />
                      ) : (
                        <menu.icon size={18} />
                      )}
                      {menu?.title}
                    </Link>
                  ),
                )}
              </div>
            ))}
        {isAdmin && (
          <Link
            href={"/dashboard"}
            className="text-[17px] leading-[16px] no-underline  flex gap-3 items-center"
          >
            <MdDashboard size={20} />
            <span>User Dashboard</span>
          </Link>
        )}
      </Stack>

      <Image
        src="/images/mask.png"
        width={299}
        height={76}
        alt="mask"
        className="w-full h-[70px] object-cover"
      />

      <LogoutModal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
      />
    </div>
  );
};

export default SideBar;

interface LogoutModal {
  open: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModal> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent dividers>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>

        <Button onClick={() => signOut()} variant="contained" color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
