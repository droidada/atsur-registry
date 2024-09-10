import BlockchainSection from "@/components/ServicesPage/homepage/BlockchainSection";
import ComprehensiveSection from "@/components/ServicesPage/homepage/ComprehensiveSection";
import DigitalCataloging from "@/components/ServicesPage/homepage/DigitalCataloging";
import DigitalSetup from "@/components/ServicesPage/homepage/DigitalSetup";
import DueDiligenceSection from "@/components/ServicesPage/homepage/DueDiligenceSection";
import ShowcaseSection from "@/components/ServicesPage/homepage/ShowcaseSection";
import TransactionSection from "@/components/ServicesPage/homepage/TransactionSection";
import LandingPageLayout from "@/components/layout/LandingPage";
import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <LandingPageLayout>
      <div
        className="flex flex-wrap page-container py-12 justify-center gap-7 items-center"
        data-aos="fade-up"
      >
        <div
          className="flex-1 max-w-[60%] w-full"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <Image src={""} width={400} height={300} alt="" />
        </div>
        <h1
          className="text-4xl font-[300] max-w-[40%] w-full"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <span className="font-bold">EMPOWERING</span>
          <br />
          <span className="font-bold">THE</span>{" "}
          <span className="italic">AFRICAN ART</span> <br />
          <span className="italic">MARKET</span>
        </h1>
      </div>
      <ShowcaseSection />
      <ComprehensiveSection />
      <BlockchainSection />
      <TransactionSection />
      <DigitalCataloging />
      <DigitalSetup />
      <DueDiligenceSection />
    </LandingPageLayout>
  );
};

export default Services;
