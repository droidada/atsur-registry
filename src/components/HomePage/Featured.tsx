import { IArtPiece } from "@/types/models/hompageData";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArtPieceCard from "../ArtPieceCard";

interface Props {
  featured: IArtPiece[];
}

const Featured: React.FC<Props> = ({ featured }) => {
  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6"
      direction={"column"}
      spacing={4}
    >
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
        spacing={2}
      >
        {featured?.slice(0, 4)?.map((item) => (
          <ArtPieceCard
            url={`/explore/art-piece/${item._id}`}
            key={item?._id}
            title={item?.title}
            rating={4}
            image={item?.assets?.url}
            // creator={{
            //   name: `${item?.custodian?.profile?.firstName} ${item?.custodian?.profile?.lastName}`,
            //   image: item?.custodian?.profile?.avatar,
            // }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Featured;
