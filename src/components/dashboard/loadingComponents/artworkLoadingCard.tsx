import { Skeleton } from "@mui/material";
import React from "react";

const ArtworkLoadingCard = () => {
  return (
    <div className="bg-white flex flex-col  w-full text-primary ">
      <Skeleton variant="rectangular" width={281} height={273} />

      <div className="md:py-[28px] font-[300] flex flex-col gap-2  px-4">
        <Skeleton variant="text" height={20} width={200} />

        <div>
          <p className="text-sm tracking-[1%]">
            <Skeleton variant="text" height={15} width={200} />
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Skeleton variant="text" height={10} width={10} />
              <Skeleton variant="text" height={10} width={70} />
            </div>
            <div className="flex gap-2 items-center">
              <Skeleton variant="text" height={10} width={10} />
              <Skeleton variant="text" height={10} width={70} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkLoadingCard;
