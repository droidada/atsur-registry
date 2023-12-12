import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Stack,
  Tooltip,
  IconButton,
  SvgIcon,
  Badge,
  Avatar,
  Input,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import logo from "@/assets/logo.jpeg";
import Image from "next/image";
import DropdownIcon from "../icons/DropdownIcon";
import NotificationIcon from "../icons/NotificationIcon";
import SideBar from "./sideBar";
import { useAuthContext } from "@/providers/auth.context";

const Header = () => {
  const [showMobile, setShowMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const { status } = useSession();
  const { user, logOut } = useAuthContext();

  const ToggleMobileMenu = () => {
    setShowMobile(!showMobile);
  };

  const ToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <header className="bg-white shadow-header sticky top-0 z-10">
        <div className="mx-auto">
          <nav className="flex items-center justify-between flex-wrap py-3 ">
            <div className="flex items-center flex-shrink-0 px-2 text-white mr-6">
              <Link href="/">
                <span className="text-xl text-gray-800 font-semibold font-heading">
                  <Image className="w-20 h-18" src={logo} alt="logo" />
                </span>
              </Link>
            </div>
            <div className="block lg:hidden">
              <div className="flex gap-5">
                <span className=" px-3 py-2 text-[#DF9E05] bg-[#FEF9ED] transition duration-150 ease-in-out flex items-center justify-center h-9 w-9  rounded-full focus:outline-none focus:ring-0 relative ">
                  RW
                  <span className="absolute h-2 w-2 bg-[#45CD85] right-0 bottom-0 rounded-full"></span>
                </span>

                <button
                  className="flex items-center  px-3 py-2 border rounded text-[#45CD85] border-[#45CD85] "
                  onClick={ToggleMobileMenu}
                >
                  <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full hidden  px-10 flex-grow lg:flex lg:items-center lg:w-auto">
              <div w-full flex-grow>
                <Input
                  id="input-with-icon-adornment"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </div>
              <div className="text-sm lg:flex-grow mx-10">
                <Link href={"/explore"}>
                  <span
                    className={`block mt-4 lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-gray-300 px-3 py-3 mr-4 rounded-md transition-all duration-200 ease-in-out ${
                      router.asPath === "/" && "bg-gray-300"
                    }`}
                  >
                    Explore
                  </span>
                </Link>

                <Link href={"/institution"}>
                  <span
                    className={`block mt-4 lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-gray-300 px-3 py-3 mr-4 rounded-md transition-all duration-200 ease-in-out ${
                      router.asPath === "/transfer" && "bg-gray-300"
                    }`}
                  >
                    Partners
                  </span>
                </Link>
              </div>
              {user ? (
                <div className="lg:flex lg:items-center lg:w-auto">
                  <div className="flex items-center justify-center relative gap-4 px-4 border-r border-r-border-border_cl">
                    <Link href={"/dashboard"}>
                      <span className=" px-3 py-3 text-[#DF9E05] bg-[#FEF9ED] transition duration-150 ease-in-out flex items-center justify-center h-10 w-10 font-medium rounded-full focus:outline-none focus:ring-0 relative ">
                        {user?.first_name[0]}
                        {user?.last_name[0]}
                        <span className="absolute h-2 w-2 bg-[#45CD85] right-0 bottom-0 rounded-full"></span>
                      </span>
                    </Link>

                    <div className=" relative">
                      <button
                        className="flex items-center"
                        onClick={ToggleUserMenu}
                      >
                        <div className="flex items-start justify-start flex-col">
                          <span className="h4 text-sm font-semibold">
                            {user?.first_name} {user?.last_name}
                          </span>
                          <span className="text-sm">0x34mkko....45526</span>
                        </div>
                        <DropdownIcon />
                      </button>

                      <div
                        className={`absolute user-menu ${
                          showUserMenu ? "show" : ""
                        } dropdown-menu large-dropdown shadow-md rounded-md w-full border-0 fade-in transition duration-300 ease`}
                      >
                        <div className=" py-2">
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 "
                          >
                            <span className="mr-3">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.89844 7.55999C9.20844 3.95999 11.0584 2.48999 15.1084 2.48999H15.2384C19.7084 2.48999 21.4984 4.27999 21.4984 8.74999V15.27C21.4984 19.74 19.7084 21.53 15.2384 21.53H15.1084C11.0884 21.53 9.23844 20.08 8.90844 16.54"
                                  stroke="#EF4444"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M15.0011 12H3.62109"
                                  stroke="#EF4444"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                                  stroke="#EF4444"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </span>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                  >
                    <NotificationIcon />
                  </a>
                </div>
              ) : (
                <div>
                  <Link href="/login" className="flex items-center">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <div className="block lg:hidden">
        <SideBar showMobile={showMobile} />
      </div>
    </>
  );
};

export default Header;
