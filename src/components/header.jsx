import React from "react";
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
import logo from "../../assets/logo.jpeg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { status } = useSession();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 p-10">
      <div className="text-lg">
        <Link href={"/"}>
          <Image className="w-20 h-18" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex-1">
        <Input
          id="input-with-icon-adornment"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ width: "100%" }}
        />
      </div>
      <div className="flex flex-wrap justify-between gap-12">
        <Link href={"/explore"}>Explore</Link>
        <Link href={"/institution"}>Resources Editorial</Link>
        {status === "authenticated" ? (
          <div onClick={() => signOut({ callbackUrl: "/" })}>Log Out</div>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}

        <Stack alignItems="center" direction="row" spacing={2}>
          {/* <Tooltip title="Contacts">
          <IconButton>
            <SvgIcon fontSize="small">
              <UsersIcon />
            </SvgIcon>
          </IconButton>
        </Tooltip> */}
          {/* <Tooltip title="Notifications">
          <IconButton>
            <Badge
              badgeContent={4}
              color="success"
              variant="dot"
            >
              <SvgIcon fontSize="small">
                <BellIcon />
              </SvgIcon>
            </Badge>
          </IconButton>
        </Tooltip> */}
          <Avatar
            // onClick={accountPopover.handleOpen}
            // ref={accountPopover.anchorRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
            src="/assets/avatars/avatar-anika-visser.png"
          />
        </Stack>
      </div>
    </div>
  );
};

export default Header;
