import { IPageArtist } from "@/types/models/hompageData";
import { Avatar, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  artists: IPageArtist[];
}
const TopArtists: React.FC<Props> = ({ artists }) => {
  console.log(artists);
  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6"
      direction={"column"}
      spacing={4}
    >
      <Typography className="text-[17px] leading-[16px] font-[400]">
        Our Top <span className="font-[600]">Artists</span>
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "stretch" }}
        spacing={2}
      >
        {artists.map((artist, index) => (
          <Link
            href={`/explore/artist/${artist?.id}`}
            key={artist?.id}
            className="relative cursor-pointer hover:scale-95 duration-700 flex flex-col gap-2 items-center"
          >
            <Avatar
              className="w-[85px] h-[85px]"
              src={artist?.avatar}
              alt={artist?.firstName}
            />
            <span className="absolute -top-2 w-[31px] h-[31px] text-[11px] leading-[16px] bg-primary text-secondary grid place-items-center right-1 rounded-full">
              {index + 1}
            </span>
            <span className="leading-[16px] text-[15px] font-[400]">
              {artist.firstName} {artist.lastName}
            </span>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default TopArtists;
