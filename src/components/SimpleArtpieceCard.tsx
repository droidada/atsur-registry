import { Avatar, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  title: string;
  creator?: {
    name: string;
    image?: string;
  };
  url: string;
}
const SimpleArtpieceCard: React.FC<Props> = ({
  title,
  image,
  creator,
  url,
}) => {
  return (
    <div className="bg-white w-full max-w-[281px] flex-col flex ">
      <Image
        src={image}
        alt={title}
        width={281}
        height={273}
        className="object-cover flex-1"
      />
      <Stack
        direction={"column"}
        spacing={2}
        alignItems="center"
        className="md:py-[19px] py-5  px-4 text-primary text-center "
      >
        <Typography
          variant="h4"
          className="font-[300] text-xl md:text-2xl lg:text-3xl lg:leading-4"
        >
          {title}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <div className="flex items-center gap-2">
            <Avatar
              className="w-[16px] h-[16px]"
              src={creator?.image}
              alt={creator?.name}
            />
            <div className="flex gap-4 font-[400] text-[8px] leading-[10px] text-justify ">
              <span>Created by</span>
              <span className="font-[600]">{creator?.name}</span>
            </div>
          </div>
        </Stack>
        <Button className="bg-primary text-secondary w-full text-[13px] leading-[16px] font-[400]">
          Explore
        </Button>
      </Stack>
    </div>
  );
};

export default SimpleArtpieceCard;
