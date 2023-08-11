import React from "react";
import Image from "next/image";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

const data = [
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: image1,
    title: "Featured Editorial",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: image2,
    title: "Featured Editorial",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: image3,
    title: "Featured Editorial",
  },
];
const FeaturedSection = () => {
  return (
    <div>
      <h3 className="text-left text-[32px] font-[400] mb-[22px]">Featured</h3>
      <div className="flex justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between gap-4">
          {data.map((item, idx) => (
            <div key={idx}>
              <Image src={item.image} alt="art" className="w-full h-[259px]" />
              <div>
                <h6 className="text-center text-[12px] font-[400]">
                  {item.title}
                </h6>
                <p className="text-left text-[24px] font-[400]">{item.desc}</p>
              </div>
            </div>
          ))}
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
