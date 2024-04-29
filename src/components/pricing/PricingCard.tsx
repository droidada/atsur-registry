import { Button } from "@mui/material";
import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { HiMiniCheckCircle } from "react-icons/hi2";

interface PricingCardProps {
  title: string;
  features: string[];
  price: number;
  isFree?: boolean;
  interval?: "monthly" | "yearly";
  isGreenButton?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  features,
  price,
  isFree,
  interval,
  isGreenButton,
}) => {
  return (
    <div className="max-w-[348.19px] w-full border-[1px] border-primary flex flex-col">
      <div className="bg-white flex flex-col items-center gap-8 px-8 py-10">
        <p className="uppercase text-[15px] leading-[18px] tracking-[40%] text-center text-primary font-[600]">
          {title}
        </p>
        {isFree ? (
          <h4 className="font-bold text-2xl lg:text-[60px] lg:leading-[65px]">
            Free
          </h4>
        ) : (
          <div className="flex place-items-baseline">
            <h4 className="font-bold text-2xl lg:text-[60px] lg:leading-[65px]">
              ${interval === "monthly" ? price : price * 12}
            </h4>
            <span className="text-[11px] capitalize leading-[14px] tracking-[5%]">
              / {interval}
            </span>
          </div>
        )}

        <Button
          className={`text-sm font-[400] p-3 ${
            isGreenButton
              ? "bg-[#00FF94] text-primary"
              : "bg-primary text-white"
          }`}
        >
          Get Started
        </Button>
      </div>
      <div className="bg-primary flex-1 flex flex-col items-start gap-4 px-8 py-10">
        {features.map((feature) => (
          <div key={feature} className="flex gap-2 items-center">
            <HiMiniCheckCircle
              size={13}
              color="#00FF94"
              className="flex-shrink-0"
            />
            <span className="text-white text-[14px] leading-[27px] tracking-[5%]">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
