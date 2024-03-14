import React from "react";
import Image from "@/components/common/image";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import Link from "next/link";

const data = [
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: image1,
    title: "Simi Bello",
    art: "Artist Profile",
    year: "July 7, 2023",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: image2,
    title: "Simi Bello",
    art: "Artist Market",
    year: "July 7, 2023",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: image3,
    title: "Simi Bello",
    art: "Artist Market",
    year: "July 7, 2023",
  },
];
const Editorial = () => {
  return (
    <div>
      <h3 className="text-left text-[32px] font-[400] mb-[22px]">Editorial</h3>
      <div className="flex justify-between gap-8">
        <div className="grid grid-cols-1 justify-between gap-4">
          {data.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href={"/artwork"}>
                <Image
                  src={item.image}
                  alt="art"
                  className="w-full h-[259px]"
                />
              </Link>
              <div>
                <p className="text-left text-[32px] font-[400]">{item.desc}</p>
                <p className="text-left text-[24px] font-[400]">{item.title}</p>
                <div className="flex justify-between mt-[70px]">
                  <p className="text-[16px] font-[400]">{item.art}</p>
                  <p className="text-[16px] font-[400]">{item.year}</p>
                </div>
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

export default Editorial;
