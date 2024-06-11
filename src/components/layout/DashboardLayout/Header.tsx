import { landingPageNavMenu } from "@/lib/utils/navs";
import {
  Avatar,
  Box,
  Dialog,
  IconButton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import SideBar from "./SideBar";
import { dashboardContext } from "@/providers/DashboardContext.context";
import { BsFillCreditCard2BackFill } from "react-icons/bs";

interface Props {
  setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ setHideSidebar }) => {
  const { data } = useSession();
  const [openMobile, setOpenMobile] = useState(false);

  const { credits } = useContext(dashboardContext);

  console.log(credits);

  return (
    <div className="sticky z-[1000] border-b-[1px]  bg-white top-0 px-4  flex flex-col justify-center h-[86px]">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="page-container"
      >
        {/* Mobile Nav */}

        <IconButton
          onClick={() => setOpenMobile(true)}
          aria-label="menu"
          size="large"
          className="block lg:hidden"
        >
          <HiOutlineMenuAlt2 />
        </IconButton>

        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          {landingPageNavMenu?.map((nav) => (
            <Link
              key={`main-page-nav-${nav.title}`}
              href={nav.link}
              className="text-[17px] leading-[16px] hover:underline"
            >
              {nav.title}
            </Link>
          ))}
        </div>

        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-[24px] h-[24px] rounded-full bg-primary"></span>
          <div className="w-[24px] h-[24px] relative rounded-full bg-primary text-secondary md:grid   hidden place-items-center">
            <BsFillCreditCard2BackFill size={10} />
            <span
              style={{ aspectRatio: "1/1" }}
              className="absolute rounded-full w-fit  p-[2px] grid place-items-center bg-primary-green text-primary -top-1 -right-1 text-[10px] "
            >
              {credits?.length}
            </span>
          </div>
          <span className="w-[24px] h-[24px] hover:scale-95 cursor-pointer rounded-full bg-primary text-secondary grid place-items-center">
            <IoIosNotifications size={10} />
          </span>
          <div className="p-2 flex items-center gap-2 border-2 border-black rounded-[23px]">
            {/* @ts-ignore */}
            <Avatar className="w-[25px] h-[25px] " src={data?.user?.avatar} />
            <span className="text-[19px] md:block hidden leading-[16px] font-[600]">
              {/* @ts-ignore */}
              {data?.user?.firstName} {data?.user?.lastName[0]}.
            </span>
          </div>
        </Stack>
      </Stack>

      <SwipeableDrawer
        anchor="left"
        open={openMobile}
        onOpen={() => setOpenMobile(true)}
        onClose={() => setOpenMobile(false)}
      >
        <Box role="presentation">
          <SideBar isMobile={true} />
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Header;
