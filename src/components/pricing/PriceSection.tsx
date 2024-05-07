import {
  allPriceService,
  pricingBundles,
  pricingServices,
} from "@/lib/utils/pricing";
import { Button } from "@mui/material";
import React, { useState } from "react";
import PricingCard from "./PricingCard";
import { BsLightbulbFill } from "react-icons/bs";

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
      <section className="flex gap-4 mt-12 justify-between lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
        {pricingBundles.map((service) => (
          <PricingCard
            key={service.title}
            {...service}
            isGreenButton
            interval={currentInterval}
          />
        ))}
      </section>

      <section className="mt-12 flex flex-col gap-2 items-center">
        <h2 className="lg:text-[30px] font-[600] md:text-2xl text-xl lg:leading-[65px] tracking-[50%]">
          ALL SERVICES
        </h2>
        <div className="flex flex-col lg:flex-row bg-secondary p-4 md:p-8 lg:divide-x-[1px] lg:divide-primary text-primary">
          {allPriceService.map((services, index) => (
            <div
              className="flex flex-col gap-2 w-full lg:w-1/2 px-4 md:px-8 py-10"
              key={`services-${index}`}
            >
              {services.map((service) => (
                <div
                  key={`service-${service.title}`}
                  className="flex items-baseline gap-3"
                >
                  <BsLightbulbFill className="flex-shrink-0" />
                  <div className="flex flex-col text-lg md:text-[20px] md:leading-[34px]">
                    <h5 className="font-bold">{service.title}</h5>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default PriceSection;
