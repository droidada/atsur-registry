import { landingPageNavMenu } from "@/lib/utils/navs";
import { Avatar, IconButton, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaQuestion } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface Props {
  setHideSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ setHideSidebar }) => {
  const { data } = useSession();

  return (
    <header className="sticky z-[1000]  bg-white top-0 px-4 md:px-6 py-[14px]">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="container mx-auto"
      >
        {/* Mobile Nav */}

        <IconButton className="lg:hidden" onClick={() => {}}>
          <HiOutlineMenuAlt2 />
        </IconButton>

        <div className="hidden md:flex gap-2 items-center">
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
          <span className="w-[24px] h-[24px] rounded-full bg-primary text-secondaryh md:grid   hidden place-items-center">
            <FaQuestion size={10} />
          </span>
          <span className="w-[24px] h-[24px] hover:scale-95 cursor-pointer rounded-full bg-primary text-secondary grid place-items-center">
            <IoIosNotifications size={10} />
          </span>
          <div className="p-2 flex items-center gap-2 border-2 border-black rounded-[23px]">
            <Avatar className="w-[25px] h-[25px] " src={data?.user?.avatar} />
            <span className="text-[19px] md:block hidden leading-[16px] font-[600]">
              {data?.user?.firstName} {data?.user?.lastName[0]}.
            </span>
          </div>
        </Stack>
      </Stack>
    </header>
  );
};

export default Header;
