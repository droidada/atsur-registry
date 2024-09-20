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
const SalesSmartContract = ({ artPieces }) => {
  return (
    <LandingPageLayout>
      <section className="bg-secondary">
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div
            className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 "
            data-aos="fade-right"
          >
            <h1 className="text-5xl lg:text-[80px]">Sales Smart Contracts</h1>
            <p className="font-[300] text-[31px] leading-[35px]">
              Digital agreements that automate commission splits to all
              participating parties once an artwork is sold
            </p>
            <Link className="max-w-[146px] w-full" href="/login">
              <Button
                variant="contained"
                className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
              >
                Login
              </Button>
            </Link>
          </div>
          <div className="relative" data-aos="zoom-in">
            <div className="w-[326px] h-[326px] flex justify-center items-center rounded-full bg-white">
              <Image
                src="/assets/images/services/smart-contract/hero.svg"
                alt="smart contract"
                width={176}
                height={176}
                className="relative"
              />
            </div>
            <div className="absolute right-0 top-0 w-[26px] h-[26px] rounded-full bg-white"></div>
            <div className="absolute right-[-20%] bottom-0 w-[79px] h-[79px] rounded-full bg-white"></div>
          </div>
        </div>
      </section>

      <ComingSoonComponent />

      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div
          className="flex justify-center md:gap-24 flex-col md:flex-row items-center"
          data-aos="fade-left"
        >
          <Image
            src={"/assets/images/services/smart-contract/automate.svg"}
            width={198}
            height={198}
            alt="automate"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              AUTOMATE
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Automatic payment commission splits once conditions are met and
              payment is finalized, saving time and effort for artists, brokers,
              and buyers.
            </p>
          </div>
        </div>
        <div
          className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center"
          data-aos="fade-right"
        >
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] tracking-[74%] font-bold">
              TAMPER-PROOF SMART CONTRACTS
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Secure agreements for all involved parties ensuring transparency
              and immutable records, reducing the risk of fraud and/or disputes.
            </p>
          </div>
          <Image
            src={"/assets/images/services/smart-contract/contract.svg"}
            width={180}
            height={180}
            alt="contract"
          />
        </div>
        <div
          className="flex justify-center md:gap-24 flex-col md:flex-row items-center"
          data-aos="fade-left"
        >
          <Image
            src={"/assets/images/services/smart-contract/collaborate.svg"}
            width={198}
            height={198}
            alt="collaborate"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              COLLABORATE SAFELY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Increase collaboration by ensuring trustworthy participation for
              all parties, taking away any obscurities or issues of trust.
            </p>
          </div>
        </div>
        <div
          className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center"
          data-aos="fade-right"
        >
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              ACCOUNTABILITY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Secure agreements for all involved parties ensuring transparency
              and immutable records, reducing the risk of fraud and/or disputes.
            </p>
          </div>
          <Image
            src={"/assets/images/services/smart-contract/accountability.svg"}
            width={198}
            height={198}
            alt="accountability"
          />
        </div>
      </section>
      <TrustedComponents artworkData={artPieces} />
    </LandingPageLayout>
  );
};

export default SalesSmartContract;
