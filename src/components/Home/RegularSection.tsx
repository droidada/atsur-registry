import Image from "next/image";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "Register your Artwork for free",
    img: "/assets/images/home/regular-section/verify.svg",
    action: "Sign Up Now",
    link: "/signup",
  },
  {
    title: "Find verified Arts that speaks to you",
    img: "/assets/images/home/regular-section/talent-search.svg",
    action: "Search Our Registry",
    link: "/explore",
  },
  {
    title: "Find New talents",
    img: "/assets/images/home/regular-section/search.svg",
    action: "Explore",
    link: "/explore",
  },
];

const RegularSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="page-container flex flex-wrap justify-center items-stretch gap-8">
        {items?.map((item, index) => (
          <div
            key={item?.title}
            className="flex flex-col w-full max-w-[308px] justify-between border-[1px] border-primary"
            data-aos="fade-up" // Fade-up animation for each item
            data-aos-delay={`${index * 200}`} // Staggered delay for each item
          >
            <div className="p-6 flex flex-col items-center gap-4">
              <Image
                src={item?.img}
                alt={item?.title}
                width={100}
                height={100}
              />
              <p className="max-w-[202px] w-full text-center">{item?.title}</p>
            </div>
            <Link
              href={item?.link}
              className="bg-primary text-center py-4 text-white"
            >
              {item?.action}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RegularSection;
