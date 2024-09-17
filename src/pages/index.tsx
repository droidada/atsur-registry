import HomeAbout from "@/components/Home/HomeAbout";
import HomePartners from "@/components/Home/HomePartners";
import HomeServices from "@/components/Home/HomeServices";
import HomeTestimonial from "@/components/Home/HomeTestimonial";
import RedBackground from "@/components/Home/RedBackground";
import RegularSection from "@/components/Home/RegularSection";
import SliderAbout from "@/components/Home/SliderAbout";
import TextSection from "@/components/Home/TextSection";
import LandingPageLayout from "@/components/layout/LandingPage";
import Image from "next/image";
import React, { useState } from "react";

const Homepage = () => {
  const [currentView, setCurrentView] = useState(0);

  return (
    <LandingPageLayout>
      <div className="flex flex-wrap max-w-[1100px] w-full mx-auto px-4 py-12 justify-center md:justify-between gap-20 items-center">
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100"
          className="flex flex-col gap-4"
        >
          <h1 className=" text-3xl md:text-5xl font-bold max-w-[40%] w-full">
            Revolutionizing <br /> African Art:
          </h1>
          <p className="uppercase font-[300] text-xl md:text-2xl">
            Authenticity, Accessibility, <br /> and Efficiency
          </p>
        </div>

        <div
          className="relative max-w-[345px] w-full h-[250px]"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="300"
        >
          <Image
            className="left-[-10%] absolute top-0 z-10"
            src="/atsur-design.svg"
            height={102}
            width={102}
            alt="Design"
          />
          <Image
            src="/assets/images/home/home-hero.jpg"
            alt="Background Image"
            fill
            className="w-full"
          />
        </div>
      </div>

      <TextSection />
      <RedBackground />
      <HomeServices />
      <HomeAbout />
      <SliderAbout />
      <RegularSection />
      <HomePartners />
      <HomeTestimonial />
    </LandingPageLayout>
  );
};

export default Homepage;
