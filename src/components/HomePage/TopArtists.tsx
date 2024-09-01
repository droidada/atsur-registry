import axios from "@/lib/axios";
import { IPageArtist } from "@/types/models/hompageData";
import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

interface Props {}
const TopArtists: React.FC<Props> = ({}) => {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get("/public/top-artists"),
    queryKey: ["top-artists"],
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6 page-container"
      direction={"column"}
      spacing={4}
      data-aos="fade-up"
    >
      {isLoading ? (
        <div
          className="flex justify-center items-center h-[250px]"
          data-aos="zoom-in"
        >
          <CircularProgress color="primary" size={20} />
        </div>
      ) : (
        data?.data?.topArtist?.length > 0 && (
          <>
            <Typography
              className="text-[17px] leading-[16px] font-[400]"
              data-aos="fade-right"
            >
              Our Top <span className="font-[600]">Artists</span>
            </Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "stretch" }}
              spacing={4}
              data-aos="fade-up"
            >
              {data?.data?.topArtist?.map((artist, index) => (
                <Link
                  href={`/explore/artist/${artist?.id}`}
                  key={artist?.id}
                  className="relative cursor-pointer hover:scale-95 duration-700 flex flex-col gap-2 items-center"
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100}`}
                >
                  <Avatar
                    className="w-[85px] h-[85px]"
                    src={artist?.avatar}
                    alt={artist?.firstName}
                  />
                  <span className="absolute border-2 -top-2 w-[31px] h-[31px] text-[11px] leading-[16px] bg-primary text-secondary grid place-items-center right-1 rounded-full">
                    {index + 1}
                  </span>
                  <span className="leading-[16px] text-[15px] text-center font-[400]">
                    {artist.firstName} {artist.lastName}
                  </span>
                </Link>
              ))}
            </Stack>
          </>
        )
      )}
    </Stack>
  );
};

export default TopArtists;
