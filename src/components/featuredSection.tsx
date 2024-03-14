import React from "react";
import Image from "@/components/common/image";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import Link from "next/link";
import { Box } from "@mui/material";

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
        {/* <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap={5}> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-between gap-10">
          {data &&
            data.map((item, idx) => (
              <Box key={idx}>
                <Link href={"/artwork/" + item.id}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}assets/${item.assets[0]?.directus_files_id}?width=300`}
                    width={200}
                    height={259}
                    alt="art"
                    className="w-full h-[310px]"
                  />
                </Link>
                <div>
                  <h6 className="text-[22px] font-[400] text-center">
                    {item.artwork_title}
                  </h6>
                  <p className="text-[16px] font-[400] text-center">
                    {item.series_title}
                  </p>
                </div>
              </Box>
            ))}
        </div>
        {/* </Box> */}
      </div>
    </div>
  );
};

export default FeaturedSection;
