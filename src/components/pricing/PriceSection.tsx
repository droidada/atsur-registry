import {
  allPriceService,
  pricingBundles,
  pricingServices,
} from "@/lib/utils/pricing";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { BsLightbulbFill } from "react-icons/bs";
import Link from "next/link";

interface Props {
  plans: {
    id: number;
    prices: {
      amount: number;
      interval: "monthly" | "annually";
      planCode: string;
    }[];
    name: string;
    type: "business" | "individual" | "free";
    features: string[];
    _id: string;
  }[];
}
const PriceSection: React.FC<Props> = ({ plans }) => {
  const [currentInterval, setCurrentInterval] = useState<
    "monthly" | "annually"
  >("monthly");

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
      <div className=" flex overflow-x-auto bg-secondary    p-4 relative">
        {["monthly", "annually"].map((interval) => (
          <Button
            key={interval}
            className={`max-w-[183px] px-4 w-fit  whitespace-nowrap flex-shrink-0 h-[47px] capitalize text-[16px] leading-[14px] font-[400]  ${
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

      <div className="mt-12 w-full px-4">
        <div className="flex gap-4  justify-center w-full  lg:flex-nowrap flex-wrap  lg:items-stretch items-center">
          {plans?.map((plan) => (
            <PricingCard
              key={plan._id}
              title={plan.type}
              planId={plan._id}
              isFree={plan.type == "free"}
              features={plan.features}
              prices={plan.prices}
              interval={currentInterval}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
