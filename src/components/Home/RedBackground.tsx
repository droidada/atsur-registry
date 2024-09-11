import Image from "next/image";
import React from "react";

const items = [
  {
    title: "Empowering Artists",
    img: "/assets/images/home/redbackground-section/protest.svg",
  },
  {
    title: "Preserving Heritage",
    img: "/assets/images/home/redbackground-section/heritage.svg",
  },
  {
    title: "Securing Investments",
    img: "/assets/images/home/redbackground-section/cyber-security.svg",
  },
];

const RedBackground = () => {
  return (
    <section
      style={{
        background: "url(/autism.png)",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-12 px-6"
    >
      <div className="absolute top-0 left-0 bg-[#ac2e2ef1] w-full h-full"></div>

      <div className="relative flex flex-wrap items-stretch gap-6 justify-center">
        {items?.map((item, index) => (
          <div
            key={item?.title}
            className="flex flex-col items-center gap-4 p-4 bg-white max-w-[278px] w-full"
            data-aos="fade-up" // Apply fade-up animation
            data-aos-delay={`${index * 200}`} // Staggered delay for each item
          >
            <Image src={item?.img} alt={item?.title} width={85} height={95} />
            <h5 className="text-xl font-semibold text-center uppercase">
              {item?.title}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RedBackground;
