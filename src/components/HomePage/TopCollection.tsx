import {
  CircularProgress,
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import backgroundImg from "../../../public/images/top-collection.png";
import Image from "next/image";
import { IArtPiece } from "@/types/models/hompageData";
import SimpleArtpieceCard from "../SimpleArtpieceCard";
import { useQuery } from "@tanstack/react-query";
import { axiosAuth as axios } from "@/lib/axios";

interface Props {}
const TopCollection: React.FC<Props> = ({}) => {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get("/public/top-collections"),
    queryKey: ["top-collections"],
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6"
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
        data?.data?.topCollections?.length > 0 && (
          <>
            <div data-aos="fade-right">
              <Stack
                className="page-container"
                spacing={4}
                direction="row"
                justifyContent="space-between"
              >
                <Typography className="text-[17px] leading-[16px] font-[600]">
                  Top Collections in this week
                </Typography>
                <Link
                  className="text-[17px] leading-[16px] font-[400] "
                  href="/explore/more"
                >
                  Discover More
                </Link>
              </Stack>
            </div>
            <div className="relative p-10 bg-black">
              <Image
                height={451}
                width={1197}
                src={backgroundImg}
                alt="top collections"
                className="object-cover absolute h-full top-0 left-0 w-full"
                data-aos="fade-in"
              />
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "center", md: "stretch" }}
                justifyContent={"center"}
                spacing={2}
                className="relative page-container"
                data-aos="fade-up"
              >
                {data?.data?.topCollections?.map((collection) => (
                  <div
                    key={collection?._id}
                    className="max-w-[450px] w-full"
                    data-aos="zoom-in"
                  >
                    <div className="w-full bg-white">
                      <Image
                        src={collection?.image}
                        alt={collection?.title}
                        width={400}
                        height={400}
                        className="object-cover w-full"
                      />
                      <div className="p-4 flex flex-col gap-4 flex-1 justify-center">
                        <h6 className="text-[24px] font-[300] text-center">
                          {collection?.title}
                        </h6>
                        {collection?.artworks?.length > 0 && (
                          <div className="flex justify-center items-center gap-2">
                            <span className="text-sm font-[300]">Artworks</span>
                            <AvatarGroup max={3}>
                              {collection?.artworks?.map((item, index) => (
                                <Avatar
                                  key={`${collection?.title}-${index}`}
                                  className="w-5 h-5"
                                  src={item?.assets[0]?.url}
                                />
                              ))}
                            </AvatarGroup>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Stack>
            </div>
          </>
        )
      )}
    </Stack>
  );
};

export default TopCollection;
