import { Button } from "@mui/material";
import React from "react";
import ArtPieceCard from "../ArtPieceCard";
import Link from "next/link";

interface Props {
  artworkData: any;
}
const TrustedComponents: React.FC<Props> = ({ artworkData }) => {
  console.log(artworkData[0]);
  return (
    <section className="py-12 max-w-[1000px] flex flex-col gap-7 mx-auto">
      <h2 className="text-[47px] font-[300] text-center" data-aos="fade-up">
        Trusted by Leading Artists
      </h2>

      <div
        className="flex justify-center items-stretch gap-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {artworkData?.map((item) => (
          <ArtPieceCard
            className="max-w-[281px] w-full"
            url={`/explore/art-piece/${item._id}`}
            key={item?._id}
            title={item?.title}
            rating={4}
            image={item?.assets && item.assets[0]?.url}
            creator={{
              name: `${item?.custodian?.profile?.firstName} ${item?.custodian?.profile?.lastName}`,
              image: item?.custodian?.profile?.avatar,
            }}
          />
        ))}
      </div>

      <div
        className="flex flex-col mt-3 items-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h2 className="text-[26px] font-[500] text-center uppercase tracking-[17%]">
          Protect your creations today
        </h2>
        <p className="text-[61px] leading-[73px] font-[300] text-center">
          Control who views your work and their access levels
        </p>
        <Link className="max-w-[400px] w-full" href="/signup">
          <Button
            variant="contained"
            className="max-w-[400px] w-full mt-4 h-[45px] bg-primary text-white"
            data-aos="zoom-in"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TrustedComponents;
