import React from "react";
import footerNav from "./utils";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/atsur-logo-white.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaTwitch } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const socialLinks = [
  {
    name: "Twitter",
    link: "https://www.twitter.com/atsur_art",
    icon: <FaTwitter />,
  },
  {
    name: "Facebook",
    link: "https://www.instagram.com/atsur.art",
    icon: <FaInstagram />,
  },
  {
    name: "Youtube",
    link: "https://www.linkedin.com/company/atsur",
    icon: <FaLinkedinIn />,
  },
];

const LandingPageFooter = () => {
  return (
    <footer className="bg-black relative py-4 md:py-9 text-white">
      <Stack
        direction={{ xs: "column", md: "row" }}
        className="page-container "
        alignItems={{ xs: "start" }}
        justifyContent={"space-between"}
        spacing={4}
      >
        <Link href="/">
          <Image
            id="logo_footer"
            src="/images/atsur-logo-white.svg"
            data-retina="/images/atsur-logo-white.svg"
            width={120}
            height={20}
            alt={"atsur"}
          />
        </Link>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="start"
          spacing={2}
        >
          {footerNav.map((group, index) => (
            <Stack key={`foote_group-${index}`} spacing={3} direction="column">
              <Typography variant="h6" gutterBottom>
                {group?.title || <span className="text-black">____</span>}
              </Typography>
              <Stack spacing={1} direction="column">
                {group.menus.map((menu) => (
                  <Link
                    className="text-sm hover:underline"
                    key={menu?.title}
                    href={menu.link}
                  >
                    {menu.title}
                  </Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
        <div className="flex flex-col justify-center items-center gap-4">
          <h4 className=" text-primary px-2 grid place-items-center bg-secondary h-[46px] text-lg font-[600]">
            Join the Community
          </h4>
          <ul className="flex gap-2 items-center justify-center ">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="p-2 rounded-full grid place-items-center bg-[#161616] text-white hover:bg-secondary hover:text-secondary-white transition-all duration-200 ease-in-out"
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Stack>
    </footer>
  );
};

export default LandingPageFooter;
