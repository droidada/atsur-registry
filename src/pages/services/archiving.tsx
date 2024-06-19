import PricingLayout from "@/components/layout/PricingLayout";
import { Button } from "@mui/material";
import React from "react";

const Archiving = () => {
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-6 justify-center items-center">
          <div className="flex flex-col gap-4 py-12">
            <h1 className="text-2xl md:text-4xl lg:text-[80px] leading-[65px]  ">
              Archiving
            </h1>
            <Button
              variant="contained"
              className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
            >
              Create
            </Button>
          </div>
        </div>
      }
    >
      <div className="min-h-screen"></div>
    </PricingLayout>
  );
};

export default Archiving;
