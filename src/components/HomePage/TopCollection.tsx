import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import backgroundImg from "../../../public/images/top-collection.png";
import Image from "next/image";
import { IArtPiece } from "@/types/models/hompageData";
import SimpleArtpieceCard from "../SimpleArtpieceCard";

interface Props {
  artpieces: IArtPiece[];
}
const TopCollection: React.FC<Props> = ({ artpieces }) => {
  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6"
      direction={"column"}
      spacing={4}
    >
      <Stack spacing={4} direction="row" justifyContent="space-between">
        <Typography className="text-[17px] leading-[16px] font-[600]">
          Top Collections in a week
        </Typography>
        <Link className="text-[17px] leading-[16px] font-[400] " href="/">
          Discover More
        </Link>
      </Stack>

      <div className="relative p-10 bg-black">
        <Image
          height={451}
          width={1197}
          src={backgroundImg}
          alt="atsur"
          className="object-cover absolute h-full top-0 left-0 w-full"
        />
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "stretch" }}
          spacing={2}
          className="relative"
        >
          {artpieces?.slice(0, 4)?.map((artpiece) => (
            <SimpleArtpieceCard
              key={artpiece?._id}
              image={artpiece?.assets?.url}
              title={artpiece?.title}
            />
          ))}
        </Stack>
      </div>
    </Stack>
  );
};

export default TopCollection;
