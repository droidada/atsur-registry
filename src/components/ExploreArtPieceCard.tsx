import { Avatar, Rating, Skeleton } from "@mui/material";
import Image from "next/image";
import React from "react";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  creator: {
    name: string;
    image: string;
  };
  rating?: number;
  link: string;
}
const ExploreArtPieceCard: React.FC<Props> = ({
  image,
  creator,
  rating,
  title,
  link,
}) => {
  return (
    <Link
      href={link || "#"}
      className="flex flex-col  self-stretch max-w-[300.16px] w-full"
    >
      <div className="w-full bg-secondary relative h-[251px]">
        <Image
          fill
          src={image || "/placeholder.png"}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="bg-primary p-4 flex flex-col gap-4 flex-1  justify-center gap-7 ">
        <h4 className="lg:text-[30px] text-white  font-[300] text-2xl">
          {title}
        </h4>
        <div className="flex gap-4 items-start">
          <div className="flex gap-2 flex-shrink-0 items-start">
            <Avatar
              src={creator.image}
              alt={creator.name}
              className="w-[22px] h-[22px]"
            ></Avatar>
            <div className="flex flex-col text-[10px] leading-[10px] text-white">
              <span className="font-[300px]">Created By</span>
              <span className="font-semibold">{creator?.name}</span>
            </div>

            <div className="h-[15px] flex items-center justify-center p-[4px] border-[1px] border-white rounded-[47px]">
              <CustomRating
                icon={<StarIcon fontSize="inherit" />}
                name="read-only"
                size="small"
                value={rating}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreArtPieceCard;

export const ExploreArtPieceCardLoading = () => {
  return (
    <div className="flex  flex-col bg-secondary-white max-w-[300.16px]  w-full">
      <Skeleton variant="rectangular" height={273} className="w-full " />
      <div className=" p-4  flex flex-col justify-between ">
        <Skeleton height={30} variant="text" className="w-full" />
        <div className="flex items-start">
          <div className="flex gap-2 flex-shrink-0 items-start">
            <Skeleton variant="circular" height={22} width={22} />
            <div>
              <Skeleton height={15} variant="text" width={140} />
              <Skeleton height={15} variant="text" width={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    fontSize: "12px", // Adjust this size as per your requirement
  },
  "& .MuiRating-iconHover": {
    fontSize: "12px",
  },
  "& .MuiRating-iconEmpty": {
    fontSize: "12px",
  },
});
