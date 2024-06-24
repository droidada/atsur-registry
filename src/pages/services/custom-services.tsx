import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import PricingLayout from "@/components/layout/PricingLayout";
import axios from "@/lib/axios";
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

const CustomServices = ({ artPieces }) => {
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px]   ">Custom Services</h1>
            <p className="font-[300] text-[31px] leading-[35px] ">
              Custom built archiving solutions platform including open APIs
              powered and managed by Atsur
            </p>
            <Button
              variant="contained"
              className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
            >
              Create
            </Button>
          </div>
          <div className="relative overflow-x-hidden md:overflow-visible">
            <Image
              src="/images/custom-service/hero.png"
              alt="Asset Tagging"
              width={562.51}
              height={592}
              className="relative "
            />
          </div>
        </div>
      }
    >
      <TrustedComponents artworkData={artPieces} />
    </PricingLayout>
  );
};

export default CustomServices;
