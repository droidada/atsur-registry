import { Button, Link, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import { PiFolderSimpleFill } from "react-icons/pi";
import { BsDoorOpenFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TbActivity } from "react-icons/tb";
import { BsShieldFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { LiaChartLineSolid } from "react-icons/lia";
import { PiMedalFill } from "react-icons/pi";
import { useRouter } from "next/router";

const sidebarMenu = [
  {
    title: "ARTWORK",
    menus: [
      { title: "Art", icon: LiaChartLineSolid, link: "/dashboard/artworks" },

      {
        title: "Collections",
        icon: PiFolderSimpleFill,
        link: "/dashboard/collections",
      },
      {
        title: "Organizations",
        icon: BsDoorOpenFill,
        link: "/dashboard/organizations",
      },
      { title: "Wishlist", icon: PiMedalFill, link: "/dashboard/Wishlist" },
      {
        title: "Deals",
        icon: RiVerifiedBadgeFill,
        link: "/dashboard/Deals",
      },
    ],
  },
  {
    title: "Account",
    menus: [
      {
        title: "Activities",
        icon: TbActivity,
        link: "/dashboard/activities",
      },
      {
        title: "Security",
        icon: BsShieldFill,
        link: "/dashboard/security",
      },
      {
        title: "Settings",
        icon: IoMdSettings,
        link: "/dashboard/settings",
      },
      { title: "Logout", icon: BiLogIn, isButton: true },
    ],
  },
];
const SideBar = () => {
  const pathname = useRouter().pathname;
  return (
    <Stack
      direction="column"
      className="bg-secondary-white border-r-2 w-1/4 h-screen left-0 top-0"
    >
      <div className="border-b-2 ">
        <Image
          src="/atsur-dashboar-logo.png"
          alt="atsur"
          width={299}
          height={76}
        />
      </div>

      <Stack direction={"column"} className="gap-14 px-8">
        {sidebarMenu.map((item) => (
          <div
            key={`dashboard-menu-${item?.title}`}
            className="flex flex-col  gap-6"
          >
            <h2 className="py-5 border-b-[1px] w-full font-[600] tracking-[50%] text-[17px] leading-[16px] text-justify">
              {item.title}
            </h2>
            {item.menus?.map((menu) =>
              menu?.isButton ? (
                <Button
                  className="text-[17px] leading-[16px] flex gap-3 items-center "
                  variant="text"
                  key={`button-${menu.title}`}
                >
                  <menu.icon />
                  <span>{menu?.title}</span>
                </Button>
              ) : (
                <Link
                  key={`submenu-${menu.title}`}
                  href={menu?.link}
                  className={`text-[17px] leading-[16px]  flex gap-3 items-center ${
                    pathname.includes(menu.title?.toLowerCase())
                      ? "font-[300]"
                      : "font-[600]"
                  }`}
                >
                  <menu.icon />
                  <span>{menu?.title}</span>
                </Link>
              ),
            )}
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

export default SideBar;
