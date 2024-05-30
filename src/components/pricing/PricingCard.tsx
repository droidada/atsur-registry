import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import numeral from "numeral";

interface PricingCardProps {
  title: string;
  features: string[];
  prices: {
    amount: number;
    interval: "monthly" | "quarterly" | "annually";
    planCode: string;
  }[];
  isFree?: boolean;
  interval?: "monthly" | "quarterly" | "annually";
  isGreenButton?: boolean;
  planId: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  features,
  prices,
  isFree,
  interval,
  isGreenButton,
  planId,
}) => {
  const { status, data: userData } = useSession();
  const router = useRouter();
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [priceInfo, setPriceInfo] = React.useState<any>();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      status === "unauthenticated"
        ? router.push("/login?callbackUrl=/pricing")
        : isFree
        ? router.push("/dashboard/settings/billing")
        : axiosAuth.post("/payment/initialize-transaction-with-plan", {
            interval: interval,
            planId,
          }),
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something Went wrong";
      toast.error(errorMessage);
    },
    onSuccess: (data: any) => {
      router.push(data?.data?.transaction?.authorization_url);
    },
  });

  useEffect(() => {
    setPriceInfo(prices?.find((price) => price.interval === interval));
  }, [interval]);

  const blackLists = [
    "Cataloguing",
    "Documentation",
    "Verification",
    "Public share urls",
    "Sales",
  ];

  return (
    <div className="max-w-[448.19px] w-full border-[1px] border-primary flex flex-col">
      <div className="bg-white flex flex-col items-center gap-8 px-8 py-10">
        <p className="uppercase text-[15px] leading-[18px] tracking-[40%] text-center text-primary font-[600]">
          {isFree ? "Free Service" : title}
        </p>
        {isFree ? (
          <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[45px]">
            Free
          </h4>
        ) : (
          <div className="flex place-items-baseline">
            <h4 className="font-bold text-2xl lg:text-[40px] lg:leading-[45px]">
              ₦{numeral(priceInfo?.amount).format("0,0")}
            </h4>
            <span className="text-[11px] capitalize leading-[14px] tracking-[5%]">
              / {interval}
            </span>
          </div>
        )}

        <Button
          onClick={() => mutate()}
          className={`text-sm font-[400] h-[36px] w-[150.49px] px-3 ${
            isGreenButton
              ? "bg-[#00FF94] text-primary"
              : "bg-primary text-white"
          }`}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
      <div className="bg-primary flex-1 flex flex-col items-start gap-4 px-8 py-10">
        {features?.map((feature) => (
          <div key={feature} className="flex gap-2 items-center">
            <HiMiniCheckCircle
              size={13}
              color="#00FF94"
              className="flex-shrink-0"
            />
            <span className="text-white text-[14px] leading-[27px] tracking-[5%]">
              {feature}{" "}
              {interval === "annually" &&
                !isFree &&
                !blackLists.includes(feature) &&
                `  (monthly)`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
