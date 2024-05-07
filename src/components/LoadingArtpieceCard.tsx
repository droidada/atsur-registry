import { Skeleton } from "@mui/material";
import React from "react";

const LoadingArtpieceCard = () => {
  return (
    <div className="h-[350px] bg-secondary flex flex-col w-full  ">
      <Skeleton variant="rectangular" height={273} className="w-full " />
      <div className="md:py-[19px] py-5  flex-col flex px-4 text-primary text-center ">
        <Skeleton
          variant="text"
          className="font-[300] text-xl h-[10] md:text-2xl lg:text-3xl lg:leading-4"
        />
        <div className="flex items-center gap-2">
          <Skeleton
            variant="circular"
            width={20}
            height={20}
            className="flex-shrink-0"
          />
          <Skeleton variant="text" className="font-[300] h-4 w-full" />
        </div>
        <Skeleton variant="rectangular" height={20} className="w-full my-3" />
      </div>
    </div>
  );
};

export default LoadingArtpieceCard;
