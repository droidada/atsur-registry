import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import PricingLayout from "@/components/layout/PricingLayout";
import { axiosAuth as axios } from "@/lib/axios";
import { Button } from "@mui/material";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/explore?limit=4&page=1`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log("res here ", res?.data?.artPieces);

    return { props: { artPieces: res?.data?.artPieces } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const AssetOwnership = ({ artPieces }) => {
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px]   ">
              Asset Ownership Protocol
            </h1>

            <Button
              variant="contained"
              className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
            >
              Create
            </Button>
          </div>
          <div className="relative overflow-x-hidden md:overflow-visible">
            <Image
              src="/images/assets-ownership/hero.png"
              alt="Asset Tagging"
              width={562.51}
              height={592}
              className="relative "
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 py-12 px-4 max-w-[1000px] w-full mx-auto">
        <p className="text-center text-[32px]">
          The Atsur Asset Ownership Protocol is a custom blockchain protocol
          authorized to modify records of sales on a given token. The primary
          goal of this protocol is to facilitate resale royalties when an art
          piece has been sold or resold, ensuring continuous facilitation of
          resale royalties similar to NFTs.
        </p>
      </div>

      <TrustedComponents artworkData={artPieces} />
    </PricingLayout>
  );
};

export default AssetOwnership;
