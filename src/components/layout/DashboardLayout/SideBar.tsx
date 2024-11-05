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

  return (
    <div
      className={`bg-secondary-white flex-shrink-0 justify-between  overflow-y-auto  flex-col       ${
        isMobile
          ? "flex w-full"
          : "hidden lg:flex sticky top-0 w-fit border-r-2  h-screen"
      }`}
    >
      <div>
        <div
          id="dashboard-logo"
          className="border-b-2 sticky flex justify-center items-center top-0 bg-secondary-white z-[200]"
        >
          <Image src="/artsur-logo.png" alt="atsur" width={50} height={50} />
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

          <div id="navigation-menu ">
            {isAdmin
              ? adminDashboardSidebarMenu.map((item) => (
                  <div
                    key={`dashboard-menu-${item?.title}`}
                    className="flex flex-col mt-6  gap-6"
                  >
                    <h2 className="py-5 border-t-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
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
                    key={`dashboard-menu-${item?.title}`}
                    className="flex flex-col  gap-6"
                  >
                    <h2 className="py-5 border-t-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
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
                    key={`dashboard-menu-${item?.title}`}
                    className={`flex flex-col ${
                      item.title !== "Art" ? "mt-6" : ""
                    } gap-6`}
                  >
                    <h2 className="pt-2 mt-4 border-t-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
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
                          id={menu.id}
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
          </div>
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
      </div>

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
