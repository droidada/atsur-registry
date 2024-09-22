import UnprotectedPage from "@/HOC/Unprotected";
import PricingLayout from "@/components/layout/PricingLayout";
import Bundles from "@/components/pricing/Bundles";
import PriceSection from "@/components/pricing/PriceSection";
import axios from "@/lib/axios";
import { allPriceService } from "@/lib/utils/pricing";
import Link from "next/link";
import React from "react";
import { BsLightbulbFill } from "react-icons/bs";

export const getServerSideProps = async ({ req, params }) => {
  try {
    const { data: bundles } = await axios.get("/bundles");
    const res = await axios.get(`/plan`);

    return { props: { plans: res.data?.data, bundles: bundles?.data } };
  } catch (error) {
    throw new Error(error);
  }
};

const PricingPage = ({ plans, bundles }) => {
  return (
    <PricingLayout
      HeroSection={
        <section
          className="flex flex-col items-center py-3 md:py-10 gap-4"
          data-aos="fade-up"
        >
          <h1 className="text-2xl md:text-4xl lg:text-[80px] lg:leading-[65px] text-center">
            Pricing
          </h1>
          <p className="text-sm text-center max-w-[585px]" data-aos="fade-in">
            Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus s
          </p>
        </section>
      }
    >
      {/* Bundles Section */}
      <Bundles bundles={bundles} data-aos="fade-up" />

      <section
        className="mt-12 flex flex-col gap-2 items-center px-4"
        data-aos="fade-up"
      >
        <h2 className="lg:text-[30px] font-[600] md:text-2xl text-xl lg:leading-[65px] tracking-[50%]">
          ALL SERVICES
        </h2>
        <div className="flex md:w-[80%] w-full mx-auto mb-10 flex-col lg:flex-row bg-secondary p-4 md:p-8 lg:divide-x-[1px] lg:divide-primary text-primary">
          {allPriceService.map((services, index) => (
            <div
              className="flex flex-col gap-2 w-full lg:w-1/2 px-4 md:px-8 py-10"
              key={`services-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {services.map((service) => (
                <div
                  key={`service-${service.title}`}
                  className="flex items-baseline gap-3"
                  data-aos="fade-in"
                >
                  <BsLightbulbFill className="flex-shrink-0" />
                  <div className="flex flex-col text-lg md:text-[20px] md:leading-[34px]">
                    <Link href={service.link} className="font-bold">
                      {service.title}
                    </Link>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PricingLayout>
  );
};

export default PricingPage;
