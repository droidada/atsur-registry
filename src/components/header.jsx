import React from "react";
import { signOut, useSession } from "next-auth/react";
import Input from "@mui/material/Input";
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
      </div>
    </div>
  );
};

export default Header;
