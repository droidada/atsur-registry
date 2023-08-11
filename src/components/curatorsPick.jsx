import React from "react";
import Image from "next/image";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import Link from "next/link";

const data = [
  {
    desc: "Empirical Construction",
    image: image1,
    title: "Julie Mehretu",
    year: 2003,
    moma: "MoMa",
  },
  {
    desc: "Empirical Construction",
    image: image2,
    title: "Julie Mehretu",
    year: 2003,
    moma: "MoMa",
  },
  {
    desc: "Empirical Construction",
    image: image3,
    title: "Julie Mehretu",
    year: 2003,
    moma: "MoMa",
  },
  {
    desc: "Empirical Construction",
    image: image1,
    title: "Julie Mehretu",
    year: 2003,
    moma: "MoMa",
  },
  {
    desc: "Empirical Construction",
    image: image2,
    title: "Julie Mehretu",
    year: 2003,
    moma: "MoMa",
  },
  {
    desc: "Empirical Construction",
    image: image3,
    title: "Julie Mehretu",
    year: 2003,
    moma: "MoMa",
  },
];
const CuratorsPick = ({ title, length }) => {
  return (
    <div>
      <h3 className="text-left text-[32px] font-[400] mb-[22px]">{title}</h3>
      <div className="flex justify-between gap-6">
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-${length} justify-between gap-4`}
        >
          {data.slice(0, length).map((item, idx) => (
            <div key={idx}>
              <Link href={"/artwork"}>
                <Image
                  src={item.image}
                  alt="art"
                  className="w-full h-[259px]"
                />
              </Link>
              <div>
                <h6 className="text-left text-[20px] font-[700]">
                  {item.title}
                </h6>
                <p className="text-left text-[16px] font-[400]">{item.desc}</p>
                <p className="text-left text-[16px] font-[400]">{item.year}</p>
                <p className="text-left text-[16px] font-[700]">{item.moma}</p>
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

export default CuratorsPick;
