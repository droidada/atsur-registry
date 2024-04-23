import { Button, Stack } from "@mui/material";
import React from "react";
import logo from "../../../../../public/artsur-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BiMenuAltRight } from "react-icons/bi";

const navMenu = [
  {
    title: "Home",
    link: "/",
  },

  {
    title: "About",
    link: "/about",
  },
  {
    title: "Explore",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const LandindingPageHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;
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
            {navMenu.map((item) => (
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
              variant="contained"
              className="h-[29px] hover:scale-95 duration-500 bg-black text-white text-[15px] leading-[16px]"
            >
              Dashboard
            </Button>
          ) : (
            <Button
              variant="contained"
              className="h-[29px] hover:scale-95 duration-500 bg-black text-white text-[15px] leading-[16px]"
            >
              Login
            </Button>
          )}
          <Button
            variant="text"
            className="rotate-[180] hover:bg-gray-400 duration-500 text-black text-[15px] leading-[16px]"
          >
            <BiMenuAltRight size={24} />
          </Button>
        </Stack>
      </Stack>
    </header>
  );
};

export default LandindingPageHeader;
