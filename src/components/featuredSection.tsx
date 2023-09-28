import React from "react";
import Image from "next/image";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import Link from "next/link";

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
const FeaturedSection = ({ data }: any) => {
  return (
    <div>
      <h3 className="text-left text-[32px] font-[400] mb-[22px]">Featured</h3>
      <div className="flex justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between gap-4">

          {data && data.map((item, idx) => (
            <div key={idx}>
              <Link href={"/artwork/" + item.id}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}assets/${item.assets[0]}?width=600`}
                  width={600}
                  height={259}
                  alt="art"
                  className="w-full h-[259px]"
                />
              </Link>
              <div>
                <h6 className="text-center text-[12px] font-[400]">
                  {item.artwork_title}
                </h6>
                <p className="text-left text-[24px] font-[400]">
                  {item.series_title}
                </p>
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
