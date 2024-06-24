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

const AssetTagging = ({ artPieces }) => {
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px]   ">Asset Tagging</h1>
            <p className="font-[300] text-[31px] leading-[35px] ">
              Physically attach tags to your art pieces, tags to allow for the
              tracking, identification, and management of the artwork.
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
              src="/images/assets-tagging/assets-hero.png"
              alt="Asset Tagging"
              width={562.51}
              height={592}
              className="relative "
            />
          </div>
        </div>
      }
    >
      <section className="py-10 border-b-[1px] border-primary pb-12 px-4 max-w-[1000px] mx-auto">
        <h2 className="text-center max-w-[918px] w-full mx-auto  font-[300] text-[47px]">
          Enhance user experience and interaction with your piece with tamper
          proof tags
        </h2>
        <div className="flex justify-center flex-wrap items-center gap-6 mt-10">
          <div className="flex gap-4 items-stretch">
            <Image
              src={"/images/catalog/define.png"}
              width={153}
              height={161}
              alt=""
            />
            <div className="flex flex-col gap-2 max-w-[341px] w-full">
              <h3 className="font-bold border-b-[1px]  text-[24px] pb-2 border-primary">
                RFID Tags
              </h3>
              <ul className="font-[300] ml-5 list-disc text-[27px] leading-[35px]">
                <li>Regular</li>
                <li>Location tracking</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 items-stretch">
            <Image
              src={"/images/catalog/register.png"}
              width={153}
              height={161}
              alt=""
            />
            <div className="flex flex-col gap-2 max-w-[341px] w-full">
              <h3 className="font-bold border-b-[1px]  text-[24px] pb-2 border-primary">
                QR Stickers
              </h3>
              <ul className="font-[300] ml-5 list-disc text-[27px] leading-[35px]">
                <li>Regular</li>
                <li>Holographic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/assets-tagging/easy-tracking.png"}
            width={386}
            height={386}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              EASY TRACKING
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Make your ownership document tamper-proof. Provide solid proof of
              the artwork&apos;s authenticity, provenance, and ownership
              history.
            </p>
          </div>
        </div>
        <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              QUICK IDENTIFICATION
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Retrieve information about your art piece by simply scanning the
              codes, saving time and effort.
            </p>
          </div>
          <Image
            src={"/images/assets-tagging/quick-identification.png"}
            width={386}
            height={372}
            alt="catalog"
          />
        </div>
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/assets-tagging/secure-authentication.png"}
            width={386}
            height={386}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              SECURE AUTHENTIFICATION
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Tie documents and digital information with tamper proof tags to
              verify art origin, ownership, and history, to the art piece
              helping to prevent counterfeiting or theft.
            </p>
          </div>
        </div>
      </section>

      <TrustedComponents artworkData={artPieces} />
    </PricingLayout>
  );
};

export default AssetTagging;
