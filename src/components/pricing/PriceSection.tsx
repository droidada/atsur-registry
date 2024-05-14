import {
  allPriceService,
  pricingBundles,
  pricingServices,
} from "@/lib/utils/pricing";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { BsLightbulbFill } from "react-icons/bs";

interface Props {
  plans: {
    id: number;
    prices: {
      amount: number;
      interval: "monthly" | "quarterly" | "annually";
      planCode: string;
    }[];
    name: string;
    type: "business" | "individual" | "free";
    features: string[];
  }[];
}
const PriceSection: React.FC<Props> = ({ plans }) => {
  const [currentInterval, setCurrentInterval] = useState<
    "monthly" | "quarterly" | "annually"
  >("monthly");

  console.log("This is the plans -----:", plans);
  const [filteredPlans, setFilteredPlans] = useState<{
    businessPlans: any[];
    individualPlans: any[];
    freePlan: any[];
  }>({
    businessPlans: [],
    individualPlans: [],
    freePlan: [],
  });

  useEffect(() => {
    if (plans.length > 0) {
      setFilteredPlans({
        businessPlans: plans?.filter((plan) => plan.type == "business"),
        individualPlans: plans?.filter((plan) => plan.type == "individual"),
        freePlan: plans?.filter((plan) => plan.type == "free"),
      });
    }
  }, [plans]);

  return (
    <section className="mt-10 md:mt-5 py-10 sm:py-16 md:py-12 flex gap-4 flex-col items-center">
      <div className=" flex overflow-x-auto bg-secondary max-w-[600px] w-full  p-4 relative">
        {["monthly", "quarterly", "annually"].map((interval) => (
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

      <div className="mt-12">
        <h1 className="text-3xl md:text-5xl font-[600] text-center">
          Free Plan
        </h1>
        <div className="flex gap-4  justify-between lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
          {filteredPlans.freePlan?.map((plan) => (
            <PricingCard
              key={plan._id}
              title={plan.type}
              planId={plan._id}
              isFree
              features={plan.features}
              prices={plan.prices}
              interval={currentInterval}
            />
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 items-center">
        <h1 className="text-3xl md:text-5xl font-[600]  text-center">
          Individual Plans
        </h1>
        <section className="flex gap-4  justify-between lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
          {filteredPlans?.individualPlans?.map((plan) => (
            <PricingCard
              key={plan._id}
              planId={plan._id}
              title={plan.type}
              features={plan.features}
              prices={plan.prices}
              interval={currentInterval}
            />
          ))}
        </section>
      </div>
      <div className="mt-12 flex flex-col gap-2 items-center">
        <h1 className="text-3xl md:text-5xl font-[600]  text-center">
          Business Plans
        </h1>
        <section className="flex gap-4  justify-between lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
          {filteredPlans?.businessPlans?.map((plan) => (
            <PricingCard
              key={plan._id}
              planId={plan._id}
              title={plan.type}
              features={plan.features}
              prices={plan.prices}
              interval={currentInterval}
            />
          ))}
        </section>
      </div>

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
