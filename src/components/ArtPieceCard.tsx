import { Avatar, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  image: string;
  title: string;
  creator?: {
    name: string;
    image?: string;
  };
  rating: number;
  url: string;
}
const ArtPieceCard: React.FC<Props> = ({
  image,
  title,
  creator,
  rating,
  url,
}) => {
  return (
    <Link href={url} className="bg-primary w-full max-w-[281px] ">
      <Image
        src={image || "/placeholder.png"}
        alt={title}
        width={281}
        height={273}
        className="object-cover h-[60%]"
      />
      <Stack
        direction={"column"}
        spacing={2}
        className="md:py-[28px]  p-4 text-secondary text-justify "
      >
        <div className="flex justify-center">
          <Rating size="small" name="read-only" value={rating} readOnly />
        </div>
        <Typography
          variant="h4"
          className="font-[300] text-xl md:text-2xl lg:text-3xl lg:leading-4"
        >
          {title}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <div className="flex items-center gap-3">
            <Avatar src={creator?.image} alt={creator?.name} />
            <div className="flex flex-col font-[400] text-[8px] leading-[10px] text-justify ">
              <span>Created by</span>
              <span className="font-[600]">{creator?.name}</span>
            </div>
          </div>
          <span className="block h-[15px] w-[54px] border-[0.3px] rounded-[13px]" />
        </Stack>
      </Stack>
    </Link>
  );
};

export default ArtPieceCard;
