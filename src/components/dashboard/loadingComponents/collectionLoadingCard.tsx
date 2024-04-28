import { Skeleton } from "@mui/material";
import React from "react";

const CollectionLoadingCard = () => {
  return (
    <div className="  w-full hover:scale-95 duration-500 cursor-pointer">
      <div className="w-full p-5 border-[1.5px] h-[345.05px] gap-[17px] border-primary grid grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            width={104.79}
            height={130.48}
            variant="rectangular"
            className="object-cover h-[130.48px]"
          />
        ))}
      </div>
      <h4 className="text-[17px] text-center leading-[12px] mt-[8px]">
        <Skeleton variant="text" width={150} height={24} className="mx-auto" />
      </h4>
    </div>
  );
};

export default CollectionLoadingCard;
