import { IArtPiece } from "@/types/models/hompageData";
import { CircularProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArtPieceCard from "../ArtPieceCard";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface Props {}

const Featured: React.FC<Props> = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get("/public/featured-art-pieces"),
    queryKey: ["featured-art-pieces"],
    refetchOnWindowFocus: false,
  });

  console.log(data?.data);

  return (
    <Stack
      component={"section"}
      className={` ${
        data?.data?.featuredArtpieces?.length > 0 && "md:mt-20 mt-8 mb-6 "
      } page-container`}
      direction={"column"}
      spacing={4}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[250px]">
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        data?.data?.featuredArtpieces?.length > 0 && (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Typography className="text-[17px] leading-[16px] font-[600]">
                Featured Items
              </Typography>
              <Link
                className="text-[17px] leading-[16px] font-[400] "
                href="/explore/more"
              >
                Discover More
              </Link>
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "stretch" }}
              justifyContent={"center"}
              spacing={2}
            >
              {data?.data?.featuredArtpieces?.map((item) => (
                <ArtPieceCard
                  className="max-w-[450px]"
                  url={`/explore/art-piece/${item._id}`}
                  key={item?._id}
                  title={item?.title}
                  rating={item?.rating}
                  image={item?.assets[0]?.url}
                  creator={{
                    name: `${item?.custodian?.profile?.firstName} ${item?.custodian?.profile?.lastName}`,
                    image: item?.custodian?.profile?.avatar,
                  }}
                />
              ))}
            </Stack>
          </>
        )
      )}
    </Stack>
  );
};

export default Featured;
