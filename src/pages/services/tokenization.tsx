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

    return { props: { artPieces: res?.data?.artPieces } };
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};
const Tokenization = ({ artPieces }) => {
  return (
    <LandingPageLayout>
      <div className="bg-secondary">
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div
            className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4"
            data-aos="fade-right"
          >
            <h1 className="text-5xl lg:text-[80px] lg:leading-[65px]">
              Tokenization
            </h1>
            <p className="font-[300] text-[31px] leading-[35px] max-w-[428px] w-full">
              Mint NFTs (Non-Fungible Tokens) for your artworks on different
              blockchain networks
            </p>
            <Link className="max-w-[146px] w-full" href="/signup">
              <Button
                variant="contained"
                className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="relative" data-aos="zoom-in">
            <div className="w-[326px] h-[326px] flex justify-center items-center rounded-full bg-white">
              <Image
                src="/assets/images/services/tokenization/hero.svg"
                alt="catalog"
                width={230}
                height={230}
                className="relative"
              />
            </div>
            <div className="absolute right-0 top-0 w-[26px] h-[26px] rounded-full bg-white"></div>
            <div className="absolute right-[-20%] bottom-0 w-[79px] h-[79px] rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      <section className="py-10" data-aos="fade-up">
        <div className="flex gap-4 justify-center border-b-[1px] border-primary pb-12 items-center max-w-[1000px]  mx-auto w-full">
          <div className="bg-secondary grid place-items-center w-[153px] h-[161px]">
            <Image
              src={"/assets/images/services/tokenization/define.svg"}
              width={153}
              height={161}
              alt=""
            />
          </div>
          <p className="font-[300] text-[27px] max-w-[604px] w-full leading-[35px]">
            Create unique digital tokens that represent the ownership and
            authenticity of a specific piece of art.
          </p>
        </div>
      </section>

      <ComingSoonComponent />

      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div
          className="flex justify-center md:gap-24 flex-col md:flex-row items-center"
          data-aos="fade-up"
        >
          <Image
            src={"/assets/images/services/tokenization/proof-reading.svg"}
            width={198}
            height={198}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              PROOF OF AUTHENTICITY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Make your ownership document tamper-proof. Provide solid proof of
              the artwork&apos;s authenticity, provenance, and ownership
              history.
            </p>
          </div>
        </div>

        <div
          className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              TRANSPARENCY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Use blockchain technology to facilitate transparent and publicly
              accessible records of authenticity and art provenance.
            </p>
          </div>
          <Image
            src={"/assets/images/services/tokenization/transparency.svg"}
            width={250}
            height={250}
            alt="transparency"
          />
        </div>

        <div
          className="flex justify-center md:gap-24 flex-col md:flex-row items-center"
          data-aos="fade-up"
        >
          <Image
            src={"/assets/images/services/tokenization/secure-shield.svg"}
            width={198}
            height={198}
            alt="security"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              SECURITY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Secure your art documentation on networks like Ethereum and
              Polygon which offer robust security features, including
              encryption, decentralization, and consensus mechanisms. 
            </p>
          </div>
        </div>

        <div
          className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              IMMORTALITY
            </h2>
            <p className="text-[29px] leading-[37px] font-[300]">
              Immortalize the record of ownership for your artwork utilizing
              blockchain networks that will preserve records or a lifetime.  
            </p>
          </div>
          <Image
            src={"/assets/images/services/tokenization/immortal.svg"}
            width={198}
            height={198}
            alt="catalog"
          />
        </div>
      </section>

      <TrustedComponents artworkData={artPieces} />
    </LandingPageLayout>
  );
};

export default Tokenization;
