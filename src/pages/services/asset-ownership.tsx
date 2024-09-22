import ComingSoonComponent from "@/components/ServicesPage/ComingSoonComponent";
import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import LandingPageLayout from "@/components/layout/LandingPage";
import PricingLayout from "@/components/layout/PricingLayout";
import axios from "@/lib/axios";
import { Button } from "@mui/material";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import Link from "next/link";
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
    <LandingPageLayout>
      <section className="bg-secondary">
        <div className="flex gap-4 flex-col md:flex-row justify-center py-12 items-center">
          <div
            className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4"
            data-aos="fade-right"
          >
            <h1 className="text-5xl lg:text-[80px]">
              Asset Ownership Protocol
            </h1>
            <Link className="max-w-[197px] w-full" href="/login">
              <Button
                variant="contained"
                className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
                data-aos="fade-up"
              >
                Login
              </Button>
            </Link>
          </div>
          <div className="relative" data-aos="zoom-in">
            <div className="w-[326px] h-[326px] flex justify-center items-center rounded-full bg-white">
              <Image
                src="/assets/images/services/asset-ownership/asset-ownership.svg"
                alt="catalog"
                width={219}
                height={219}
                className="relative"
              />
            </div>
            <div className="absolute right-0 top-0 w-[26px] h-[26px] rounded-full bg-white"></div>
            <div className="absolute right-[-20%] bottom-0 w-[79px] h-[79px] rounded-full bg-white"></div>
          </div>
        </div>
      </section>

      <ComingSoonComponent />

      <div
        className="flex flex-col items-center gap-4 py-12 px-4 max-w-[1000px] w-full mx-auto"
        data-aos="fade-up"
      >
        <p className="text-center text-[32px]">
          The Atsur Asset Ownership Protocol is a custom blockchain protocol
          authorized to modify records of sales on a given token. The primary
          goal of this protocol is to facilitate resale royalties when an art
          piece has been sold or resold, ensuring continuous facilitation of
          resale royalties similar to NFTs.
        </p>
      </div>

      <div data-aos="fade-up">
        <TrustedComponents artworkData={artPieces} />
      </div>
    </LandingPageLayout>
  );
};

export default AssetOwnership;
