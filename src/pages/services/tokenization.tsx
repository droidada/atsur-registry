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
    <PricingLayout
      HeroSection={
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px] lg:leading-[65px]  ">
              Tokenization
            </h1>
            <p className="font-[300] text-[31px] leading-[35px] max-w-[428px] w-full">
              Mint NFTs (Non-Fungible Tokens) of Certificates of Authenticity
              for artworks on Ethereum and Polygon networks,
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
              src="/images/tokenize/token-hero.png"
              alt="catalog"
              width={562.51}
              height={592}
              className="relative "
            />
          </div>
        </div>
      }
    >
      <section className="py-10 ">
        <div className="flex gap-4 justify-center border-b-[1px] border-primary pb-12 items-center max-w-[1000px]  mx-auto w-full">
          <Image
            src={"/images/catalog/define.png"}
            width={153}
            height={161}
            alt=""
          />
          <p className="font-[300] text-[27px] max-w-[604px] w-full leading-[35px]">
            Create unique digital tokens that represent the ownership and
            authenticity of a specific piece of art.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/tokenize/proof.png"}
            width={386}
            height={386}
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
        <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
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
            src={"/images/tokenize/transparency.png"}
            width={386}
            height={372}
            alt="catalog"
          />
        </div>
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/tokenize/security.png"}
            width={386}
            height={386}
            alt="catalog"
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
        <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
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
            src={"/images/tokenize/immortality.png"}
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

export default Tokenization;
