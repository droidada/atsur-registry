import { Avatar, Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/router";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  adminDashboardSidebarMenu,
  dashboardSidebarMenu,
  walletDashboardSideMenu,
} from "@/lib/utils/navs";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

interface Props {
  hideSidebar?: boolean;
  isMobile?: boolean;
  isAdmin?: boolean;
}
const WalletSideBar: React.FC<Props> = ({ hideSidebar, isMobile, isAdmin }) => {
  const pathname = useRouter().pathname;
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      className={`bg-secondary-white flex-shrink-0 px-3  overflow-y-auto  flex-col       ${
        isMobile
          ? "flex w-full"
          : "hidden lg:flex sticky top-0 w-fit border-r-2  h-screen"
      }`}
    >
      <div className="border-b-2 text-[35px] font-[600] text-center py-5  bg-secondary-white z-[200]">
        Wallet
      </div>

      <Stack direction={"column"} className="gap-14 px-8 pb-10">
        <div className="mt-10 flex gap-2 justify-center">
          <Avatar src={session.user?.avatar} />
          <div>
            <h4 className="text-[24px] font-bold">
              {session.user.firstName} {session.user.lastName}{" "}
            </h4>
          </div>
        </div>

        {walletDashboardSideMenu.map((menu) => (
          <div
            key={`dashboard-menu-${menu?.title}`}
            className="flex flex-col  gap-6"
          >
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
          </div>
        ))}
      </Stack>

      <Image
        src="/images/mask.png"
        width={299}
        height={76}
        alt="mask"
        className="w-full h-[70px] object-cover"
      />
    </div>
  );
};

export default WalletSideBar;
