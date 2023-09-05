import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import Link from "next/link";
import { HomepageArtworksQuery } from "@/queries/LandingPageQueries";
import getData from "@/queries/getData";

// const entry = [
//   {
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//     image: image1,
//     title: "Featured Editorial",
//   },
//   {
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//     image: image2,
//     title: "Featured Editorial",
//   },
//   {
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//     image: image3,
//     title: "Featured Editorial",
//   },
// ];
const FeaturedSection = () => {
  const { data: entry, isSuccess: entrySuccess } = useQuery(
    "entry",
    async () => await getData(HomepageArtworksQuery, "entry")
  );
  console.log("we have entries here ", entrySuccess);
  console.log("we have entries here ", entry);
  // const entrySuccess = true;

  return (
    <div>
      <h3 className="text-left text-[32px] font-[400] mb-[22px]">Featured</h3>
      <div className="flex justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between gap-4">
          {entrySuccess ? (
            entry?.map((item, idx) => (
              <div key={idx}>
                <Link href={"/artwork"}>
                  <Image
                    src={item.image}
                    alt="art"
                    className="w-full h-[259px]"
                  />
                </Link>
                <div>
                  <h6 className="text-center text-[12px] font-[400]">
                    {item.artwork_title}
                  </h6>
                  <p className="text-left text-[24px] font-[400]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>No entries for this featured section</>
          )}
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
