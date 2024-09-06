import Image from "next/image";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "DETAILED RESEARCH",
    content: "In-depth analysis of each art piece's history and provenance.",
    image: "/assets/images/services/comprehensive-section/detail-research.svg",
    link: "",
  },
  {
    title: "Authentication",
    content: "Verification by experts to ensure authenticity",
    image: "/assets/images/services/comprehensive-section/authentication.svg",
    link: "",
  },
  {
    title: "Condition Reporting",
    content: "Detailed reports on the physical condition of artworks.",
    image:
      "/assets/images/services/comprehensive-section/condition-reporting.svg",
    link: "",
  },
];

const ComprehensiveSection = () => {
  return (
    <section
      className="bg-white py-12 flex flex-col gap-6 items-center"
      data-aos="fade-up"
    >
      <div data-aos="fade-down" data-aos-delay="200">
        <h2 className="text-4xl text-center">
          <span className="font-bold">Comprehensive Art</span>
          <span className="italic"> Due Diligence</span>
        </h2>
        <p className="text-lg text-center">
          At Atsur, we offer extensive due diligence services including:
        </p>
      </div>
      <div
        className="flex justify-center gap-6 w-full flex-wrap items-stretch"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {items?.map((item, index) => (
          <Link
            href={item?.link}
            key={item?.title}
            className="flex flex-col max-w-[278px] w-full bg-secondary p-4 gap-4 items-center"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <div
              className="w-full h-[140px] bg-white flex justify-center items-center"
              data-aos="zoom-in"
              data-aos-delay={index * 250}
            >
              <Image
                src={item?.image}
                alt={item?.title}
                width={85}
                height={85}
              />
            </div>
            <h5
              className="text-2xl font-semibold text-center"
              data-aos="fade-down"
              data-aos-delay={index * 300}
            >
              {item?.title}
            </h5>
            <p
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 350}
            >
              {item?.content}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ComprehensiveSection;
