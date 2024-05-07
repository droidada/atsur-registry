import UnprotectedPage from "@/HOC/Unprotected";
import PriceSection from "@/components/pricing/PriceSection";
import React from "react";

const PricingPage = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full z-[-1]  h-[40vh] bg-secondary"></div>
      <section className="flex flex-col items-center  py-3 md:py-10 gap-4">
        <h1 className="text-2xl md:text-4xl lg:text-[80px] lg:leading-[65px] text-center">
          Pricing
        </h1>
        <p className="text-sm text-center max-w-[585px]">
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus s
        </p>
      </section>
      <PriceSection />
    </>
  );
};

export default UnprotectedPage(PricingPage);
