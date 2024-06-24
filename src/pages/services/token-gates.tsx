import PricingLayout from "@/components/layout/PricingLayout";
import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

const TokenGates = () => {
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
      TokenGates
    </PricingLayout>
  );
};

export default TokenGates;
