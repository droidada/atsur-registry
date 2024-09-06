import Image from "next/image";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "Digital Cataloging",
    content:
      "Document art and artifacts, with an option to document them as Non-Fungible Tokens (NFTs).",
    image:
      "/assets/images/services/digital-setup-section/digital-cataloging.svg",
    link: "",
  },
  {
    title: "Licensing Agreements",
    content: "Ensure artists retain digital ownership rights.",
    image:
      "/assets/images/services/digital-setup-section/licensing-agreement.svg",
    link: "/services/sales-smart-contract",
  },
  {
    title: "Monetization Opportunities",
    content: "Enable artists generate funds through NFT sales.",
    image:
      "/assets/images/services/digital-setup-section/monetization-opportunities.svg",
    link: "/services/tokenization",
  },
];
const DigitalSetup = () => {
  return (
    <section
      data-aos="fade-up"
      className="flex flex-wrap justify-center py-12 px-4 items-stretch gap-4 bg-white"
    >
      {items?.map((item, index) => (
        <Link
          data-aos="fade-up"
          data-aos-delay={index * 200}
          href={item?.link}
          key={item?.title}
          className="max-w-[360px] border-[1px] flex flex-col gap-4 border-primary w-full"
        >
          <div className="bg-secondary h-[169px] flex items-center justify-center">
            <Image src={item?.image} alt={item?.title} width={95} height={95} />
          </div>
          <div className="p-4 gap-4 flex flex-col">
            <h5 className="text-2xl text-center font-semibold">
              {item?.title}
            </h5>
            <p className="text-center">{item?.content}</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default DigitalSetup;
