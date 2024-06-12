import { landingPageNavMenu } from "@/lib/utils/navs";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
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
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";

interface Props {
  setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ setHideSidebar }) => {
  const { data } = useSession();
  const [openMobile, setOpenMobile] = useState(false);

  const { credits, notifications } = useContext(dashboardContext);

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
          {/* <span className="w-[24px] h-[24px] rounded-full bg-primary"></span>
          <div className="w-[24px] h-[24px] relative rounded-full bg-primary text-secondary md:grid   hidden place-items-center">
            <BsFillCreditCard2BackFill size={10} />
            <span
              style={{ aspectRatio: "1/1" }}
              className="absolute rounded-full w-fit  p-[2px] grid place-items-center bg-primary-green text-primary -top-1 -right-1 text-[10px] "
            >
              {credits?.length}
            </span>
          </div> */}
          <Link
            href="/dashboard/notifications
            "
            aria-label="notifications"
            className="w-[24px] h-[24px] relative hover:scale-95 cursor-pointer rounded-full bg-primary text-secondary grid place-items-center"
          >
            <IoIosNotifications size={10} />
            {notifications?.length > 0 && (
              <div className="bg-[#FFC700] grid place-items-center absolute -left-1 text-primary w-[10px] h-[10px] -top-1   text-[10px] rounded-full">
                {/* {notifications?.length} */}
              </div>
            )}
          </Link>
          <ProfileButton user={data?.user} />
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

interface ProfileButtonProps {
  user: any;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ user }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        onClick={handleClick}
        className="rounded-[23px] flex px-2 gap-2"
      >
        {/* @ts-ignore */}
        <Avatar className="w-[25px] h-[25px] " src={user?.avatar} />
        <span className="text-[19px] md:block hidden leading-[16px] capitalize font-[600]">
          {/* @ts-ignore */}
          {user?.firstName} {user?.lastName[0]}.
        </span>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-appbar",
        }}
      >
        <MenuItem
          className="flex gap-2 items-center"
          onClick={() => {
            router.push("/dashboard/settings");
            handleClose();
          }}
        >
          <FaUser /> <span>Profile</span>
        </MenuItem>

        <MenuItem className="flex gap-2 items-center" onClick={() => signOut()}>
          <MdLogout /> <span>Logout</span>
        </MenuItem>
      </Menu>
    </div>
  );
};
