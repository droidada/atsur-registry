import { pricingBundles, pricingServices } from "@/lib/utils/pricing";
import { Button } from "@mui/material";
import React, { useState } from "react";
import PricingCard from "./PricingCard";

const PriceSection = () => {
  const [currentInterval, setCurrentInterval] = useState<"monthly" | "yearly">(
    "monthly",
  );
  return (
    <section className="mt-10 md:mt-5 py-10 sm:py-16 md:py-12 flex gap-4 flex-col items-center">
      <div className="max-w-[371px] gap-3 w-full overflow-x-auto bg-secondary  p-4 relative">
        {["monthly", "yearly"].map((interval) => (
          <Button
            key={interval}
            className={`max-w-[183px] px-2 w-[50%] whitespace-nowrap flex-shrink-0 h-[47px] capitalize text-[16px] leading-[14px] font-[400]  ${
              interval == currentInterval
                ? "bg-black text-white"
                : "bg-transparent text-black"
            }`}
            variant={currentInterval === interval ? "contained" : "text"}
            // @ts-ignore
            onClick={() => setCurrentInterval(interval)}
          >
            Pay {interval}
          </Button>
        ))}
      </div>
      <div className="flex gap-4 mt-12 justify-between lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
        {pricingServices.map((service) => (
          <PricingCard
            key={service.title}
            {...service}
            interval={currentInterval}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-12 justify-between lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
        {pricingBundles.map((service) => (
          <PricingCard
            key={service.title}
            {...service}
            isGreenButton
            interval={currentInterval}
          />
        ))}
      </div>
    </section>
  );
};

export default PriceSection;
