import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../../../../public/artsur-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoSearchCircleOutline } from "react-icons/io5";
import { MdFacebook } from "react-icons/md";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { landingPageNavMenu } from "@/lib/utils/navs";

const LandindingPageHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const [open, setOpen] = useState(false);
  const isCurrentPath = (link: string) =>
    link !== "/" && pathname.includes(link) ? true : pathname === link;

  const { status } = useSession();
  return (
    <header className="page-container">
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction="row" alignItems={"center"} spacing={4}>
          <Link href={"/"}>
            <Image src={logo} width={66} height={58.98} alt="Atsur" />
          </Link>
          <div className="hidden md:flex items-center gap-8 ">
            {landingPageNavMenu.map((item) => (
              <Link
                className={`text-[17px] leading-[16px] hover:font-bold duration-500 text-justified ${
                  isCurrentPath(item.link) ? "font-[600]" : "font-[400]"
                }`}
                href={item.link}
                key={item.title}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </Stack>
        <Stack spacing={1} alignItems={"center"} direction={"row"}>
          {status == "authenticated" ? (
            <Button
              onClick={() => router.push("/dashboard")}
              variant="contained"
              className="h-[29px] hover:scale-95 duration-500 bg-black text-white text-[15px] leading-[16px]"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              variant="contained"
              className="h-[29px] hover:scale-95 duration-500 bg-black text-white text-[15px] leading-[16px]"
            >
              Login
            </Button>
          )}
          <Button
            onClick={() => setOpen(true)}
            variant="text"
            className="rotate-[180] hover:bg-gray-400 duration-500 text-black text-[15px] leading-[16px]"
          >
            <BiMenuAltRight size={24} />
          </Button>
        </Stack>
      </Stack>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <MobileMenuContent />
      </SwipeableDrawer>
    </header>
  );
};

export default LandindingPageHeader;

const MobileMenuContent = () => {
  const socialIcons = [
    {
      title: "facebook",
      icon: MdFacebook,
      link: "/",
    },
    {
      title: "x",
      icon: AiOutlineTwitter,
      link: "/",
    },
    {
      title: "instagram",
      icon: AiOutlineInstagram,
      link: "/",
    },
  ];

  return (
    <Box sx={{ p: 2 }} role="presentation">
      <form className="flex bg-secondary h-[46px]">
        <input
          type="text"
          className="flex-1 h-full bg-transparent border-none focus:outline-none px-4"
          placeholder="Search..."
        />
        <IconButton type="submit" aria-label="search">
          <IoSearchCircleOutline />
        </IconButton>
      </form>

      {/* <div className=" lg:block hidden mt-4">
        <h2>Categories</h2>
      </div> */}

      <div className=" lg:hidden block mt-4 bg-secondary p-2">
        <List>
          {landingPageNavMenu.map((item) => (
            <ListItem
              className="my-2"
              key={`mobile-menu-${item.title}`}
              disablePadding
            >
              <Link className="text-sm hover:underline" href={item.link}>
                {item.title}
              </Link>
            </ListItem>
          ))}
        </List>
      </div>

      {/* <div className="  mt-4 bg-secondary p-2">
        <h3 className="text-lg font-semibold">Company</h3>
        <List>
          {[
            { link: "/", title: "Help Center" },
            { link: "/", title: "Platform Status" },
          ].map((item) => (
            <ListItem
              className="my-2"
              key={`mobile-menu-${item.title}`}
              disablePadding
            >
              <Link className="text-sm hover:underline" href={item.link}>
                {item.title}
              </Link>
            </ListItem>
          ))}
        </List>
      </div> */}

      <div className="  mt-4 bg-secondary p-2">
        <h3 className="text-lg font-semibold">Join the community</h3>
        <Stack direction={"row"} className="mt-4" spacing={1}>
          {socialIcons.map((item) => (
            <Link
              key={`mobile-menu-social-${item.title}`}
              className="text-sm h-5 w-5 rounded-full grid place-items-center bg-primary text-secondary hover:outline"
              href={item.link}
            >
              <item.icon />
            </Link>
          ))}
        </Stack>
      </div>
    </Box>
  );
};