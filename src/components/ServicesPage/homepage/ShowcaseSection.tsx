import Image from "next/image";
import Link from "next/link";
import React from "react";

const showcaseItems = [
  {
    title: "Empowering Artists",
    content:
      "Ensure the authenticity of your artwork with our blockchain-based verification system.",
    image: "/assets/images/services/showcase-section/empowering-artist.svg",
    link: "/services/tokenization",
  },
  {
    title: "Showcase",
    content:
      "Showcase your art to a global audience on our user-friendly platform.",
    image: "/assets/images/services/showcase-section/showcase.svg",
    link: "/services/archiving",
  },
  {
    title: "Transactions",
    content:
      "Streamline art transactions with secure payments and smart contracts.",
    image: "/assets/images/services/showcase-section/transaction.svg",
    link: "/services/asset-ownership",
  },
  {
    title: "Market Insights",
    content:
      "Access valuable market data and trends to inform your art journey.",
    image: "/assets/images/services/showcase-section/market-insight.svg",
    link: "/services/archiving",
  },
];

const ShowcaseSection = () => {
  return (
    <div
      data-aos="fade-up"
      className="bg-primary p-6 md:py-12 gap-4 flex justify-center flex-wrap items-stretch"
    >
      {showcaseItems?.map((item, index) => (
        <Link
          data-aos="fade-up"
          data-aos-delay={index * 200}
          key={item?.title}
          href={`${item?.link}`}
          className="border-[1px] max-w-[295px] w-full p-4 gap-4 border-white text-white flex-col flex"
        >
          <div className="w-full h-[140px]  gap-4 bg-white flex justify-center items-center">
            <Image src={item?.image} alt="" width={95} height={95} />
          </div>
          <h5 className="text-2xl font-semibold text-center">{item?.title}</h5>
          <p className="text-center">{item?.content}</p>
        </Link>
      ))}
    </div>
  );
};

export default ShowcaseSection;
