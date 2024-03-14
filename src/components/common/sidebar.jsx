import Link from "next/link";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import React from "react";

const SideBar = ({ showMobile }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`sidebarmenu ${
          showMobile ? "show" : ""
        } py-5 overflow-y-auto`}
      >
        <div className="">
          <div className="px-6 py-4 flex items-center justify-center border-b border-gray-100">
            <Link href="/">
              <span className="">
                <Image src="/images/logo.svg" />
              </span>
            </Link>
          </div>
          <div className="mt-6">
            <div className="flex flex-col items-start mobile_menu">
              <Link href="/">
                <span
                  className={` ${
                    router.asPath === "/" ? "active" : ""
                  }  px-8 py-3 w-full ease-in-out text-base text-[#5B5B5B]`}
                >
                  Dashboard
                  <span className="nav-pointer"></span>
                </span>
              </Link>

              <Link href="/transfer">
                <span
                  className={` ${
                    router.asPath === "/transfer" ? "active" : ""
                  }  px-8 py-3 w-full ease-in-out text-base text-[#5B5B5B]`}
                >
                  Transfer
                  <span className="nav-pointer"></span>
                </span>
              </Link>
              <Link href="/transfer">
                <span className="px-8 py-3 w-full text-base text-[#5B5B5B]">
                  Stake
                  <span className="nav-pointer"></span>
                </span>
              </Link>
              <Link href="/transfer">
                <span className="px-8 py-3 w-full text-base text-[#5B5B5B]">
                  Swap
                  <span className="nav-pointer"></span>
                </span>
              </Link>
              <Link href="/transfer">
                <span className="px-8 py-3 w-full text-base text-[#5B5B5B]">
                  NFTs
                  <span className="nav-pointer"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
