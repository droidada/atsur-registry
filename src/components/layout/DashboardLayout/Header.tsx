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
import React, { useContext, useRef, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import SideBar from "./SideBar";
import { dashboardContext } from "@/providers/DashboardContext.context";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { MdLogout, MdOutlineMessage } from "react-icons/md";
import { useRouter } from "next/router";
import ProfileButton from "./ProfileButton";
import MessagesModal from "./MessagesModal";

interface Props {
  setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ setHideSidebar }) => {
  const { data } = useSession();
  const router = useRouter();
  const pathname = router.pathname;
  const [openMesagesModal, setOpenMesageModal] = useState(false);

  const [openMobile, setOpenMobile] = useState(false);
  const { credits, notifications } = useContext(dashboardContext);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const handleMouseEnter = (menuTitle) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredMenu(menuTitle);
  };
  const isCurrentPath = (link: string) =>
    link !== "/" && pathname.includes(link) ? true : pathname === link;
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200);
  };



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
          {landingPageNavMenu
            ?.filter((item) => item?.title !== "Home")
            .map((item) =>
              item.menus ? (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.link}
                    key={item.title}
                    className={`text-[17px] cursor-pointer leading-[16px] hover:font-bold duration-500 text-justified ${
                      isCurrentPath(item.link) ? "font-[600]" : "font-[400]"
                    }`}
                  >
                    {item.title}
                  </Link>
                  {hoveredMenu === item.title && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg z-20">
                      {item.menus.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.link}
                          className="block px-4 py-2 text-[16px] hover:bg-gray-200"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  className={`text-[17px] leading-[16px] hover:font-bold duration-500 text-justified ${
                    isCurrentPath(item.link) ? "font-[600]" : "font-[400]"
                  }`}
                  href={item.link}
                  key={item.title}
                >
                  {item.title}
                </Link>
              ),
            )}
        </div>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            aria-label="messages"
            onClick={() => setOpenMesageModal(true)}
            className="w-[24px] h-[24px] relative hover:scale-95 cursor-pointer rounded-full bg-primary text-secondary grid place-items-center"
          >
            <MdOutlineMessage size={10} />
          </IconButton>
          <Link
            href="/dashboard/notifications
            "
            aria-label="notifications"
            className="w-[24px] h-[24px] relative hover:scale-95 cursor-pointer rounded-full bg-primary text-secondary grid place-items-center"
          >
            <IoIosNotifications size={10} />
            {notifications.filter((notification) => notification.read).length >
              0 && (
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
