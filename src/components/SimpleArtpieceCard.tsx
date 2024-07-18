import { Avatar, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  image: string;
  title: string;
  creator?: {
    name: string;
    image?: string;
  };
  url: string;
  isBlack?: boolean;
  isSmall?: boolean;
  containerClassName?: string;
}
const SimpleArtpieceCard: React.FC<Props> = ({
  title,
  image,
  creator,
  url,
  isBlack,
  isSmall,
  containerClassName,
}) => {
  const router = useRouter();
  return (
    <div
      className={`${
        isBlack ? "bg-primary" : "bg-white"
      } w-full  flex-col flex ${containerClassName}`}
    >
      <Image
        src={image || "/placeholder.png"}
        alt={title}
        width={281}
        height={273}
        className="object-cover w-full flex-1"
      />
      <Stack
        direction={"column"}
        spacing={2}
        alignItems="center"
        className={`md:py-[19px] py-5  px-4 ${
          isBlack ? "text-white" : "text-black"
        } text-center `}
      >
        <Typography
          variant="h4"
          className={`font-[300] ${
            isSmall
              ? "text-xl lg:text-[24px] "
              : "text-xl md:text-2xl lg:text-3xl"
          } `}
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
            <div className="flex gap-1 font-[400] text-[10px] leading-[10px] text-justify ">
              <span>Created by</span>
              <span className="font-[600]">{creator?.name}</span>
            </div>
          </div>
        </Stack>
        <Button
          onClick={() => router.push(url)}
          className={`${
            isBlack ? "bg-white text-black" : "bg-black text-white"
          } w-full text-[13px] leading-[16px] font-[400]`}
        >
          Explore
        </Button>
      </Stack>
    </div>
  );
};

export default SimpleArtpieceCard;
