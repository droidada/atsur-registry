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
const SalesSmartContract = ({ artPieces }) => {
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px]   ">
              Sales Smart Contracts
            </h1>
            <p className="font-[300] text-[31px] leading-[35px] ">
              Digital agreements that automatically commission splits to all
              participating parties once an artwork is sold
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
              src="/images/smart/smart-hero.png"
              alt="Asset Tagging"
              width={562.51}
              height={592}
              className="relative "
            />
          </div>
        </div>
      }
    >
      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/Smart/automate.svg"}
            width={386}
            height={386}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              AUTOMATE
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Automatic payment commission splits once conditions are met and
              payment is finalized, saving time and effort for artists, agents,
              and buyers.
            </p>
          </div>
        </div>
        <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px]  tracking-[74%] font-bold">
              TAMPER-PROOF SMART CONTRACTS
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Secure agreements for all involved parties ensuring transparency
              and immutable records, reducing the risk of fraud and/or disputes.
            </p>
          </div>
          <Image
            src={"/images/smart/tamper.png"}
            width={386}
            height={372}
            alt="catalog"
          />
        </div>
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/smart/collaborate.png"}
            width={386}
            height={386}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              COLLABORATE SAFELY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Increase collaboration buy ensuring a trustworthy participation
              for all parties taking away any obscurities or issues of trust
              when  
            </p>
          </div>
        </div>
        <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              ACCOUNTABILITY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Secure agreements for all involved parties ensuring transparency
              and immutable records, reducing the risk of fraud and/or
              disputes.  
            </p>
          </div>
          <Image
            src={"/images/smart/accountability.png"}
            width={386}
            height={372}
            alt="catalog"
          />
        </div>
      </section>
      <TrustedComponents artworkData={artPieces} />
    </PricingLayout>
  );
};

export default SalesSmartContract;
