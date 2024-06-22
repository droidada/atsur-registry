import { Button } from "@mui/material";
import React from "react";
import ArtPieceCard from "../ArtPieceCard";

interface Props {
  artworkData: any;
}
const TrustedComponents: React.FC<Props> = ({ artworkData }) => {
  console.log(artworkData[0]);
  return (
    <section className="py-12 max-w-[1000px] flex flex-col gap-4 mx-auto">
      <h2 className="text-[47px] font-[300] text-center">
        Trusted by Leading Artists
      </h2>
      <div className="flex justify-center items-stretch gap-4 ">
        {artworkData?.map((item) => (
          <ArtPieceCard
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
      <div className="flex flex-col mt-3 items-center">
        <h2 className="text-[26px] font-[500] text-center uppercase tracking-[17%]">
          Protect your creations today
        </h2>
        <p className="text-[61px] leading-[73px] font-[300] text-center">
          Control who views your work and their access levels
        </p>
        <Button
          variant="contained"
          className="max-w-[400px] w-full mt-4 h-[45px] bg-primary text-white "
        >
          Create
        </Button>
      </div>
    </section>
  );
};

export default TrustedComponents;
