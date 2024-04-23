import React from "react";
import footerNav from "./utils";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../public/atsur-logo-white.png";
const LandingPageFooter = () => {
  return (
    <footer className="bg-black py-4 md:py-9 text-white">
      <Stack
        direction={{ xs: "column", md: "row" }}
        className="page-container "
        alignItems={{ xs: "center", md: "start" }}
        justifyContent={"space-between"}
        spacing={4}
      >
        <Link href="/">
          <Image
            width={150}
            height={150}
            className="object-contain"
            src={logo}
            alt="Atsur"
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
        <Button
          variant="contained"
          className="bg-secondary text-primary h-[46px] text-sm font-[600]"
        >
          Join Our Community
        </Button>
      </Stack>
    </footer>
  );
};

export default LandingPageFooter;
