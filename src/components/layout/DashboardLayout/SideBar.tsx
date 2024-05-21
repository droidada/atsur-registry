import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

import { useRouter } from "next/router";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  adminDashboardSidebarMenu,
  dashboardSidebarMenu,
} from "@/lib/utils/navs";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

interface Props {
  hideSidebar?: boolean;
  isMobile?: boolean;
  isAdmin?: boolean;
}
const SideBar: React.FC<Props> = ({ hideSidebar, isMobile, isAdmin }) => {
  const pathname = useRouter().pathname;
  const router = useRouter();

  return (
    <div
      className={`bg-secondary-white   overflow-y-auto  flex-col       ${
        isMobile
          ? "flex w-full"
          : "hidden lg:flex sticky top-0 w-fit border-r-2  h-screen"
      }`}
    >
      <div className="border-b-2 sticky top-0 bg-secondary-white z-[200]">
        <Image
          src="/atsur-dashboar-logo.png"
          alt="atsur"
          width={299}
          height={76}
        />
      </div>

      <Stack direction={"column"} className="gap-14 px-8 pb-20">
        <div className="mt-10 flex justify-center">
          {isAdmin ? (
            <h3 className="text-[20px] font-[600] text-center">
              Admin Dashboard
            </h3>
          ) : (
            <Button
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
                className="flex flex-col  gap-6"
              >
                <h2 className="py-5 border-b-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
                  {item.title}
                </h2>
                {item.menus?.map((menu) =>
                  menu?.isButton ? (
                    <h4
                      onClick={() => signOut()}
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
    </div>
  );
};

export default SideBar;
