import { Avatar, Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  image: string;
  link: string;
  creator: {
    avatar: string;
    name: string;
  };
  rating: number;
  className?: string;
}

const RelatedArtpieceCard: React.FC<Props> = ({
  title,
  image,
  link,
  creator,
  rating,
  className,
}) => {
  return (
    <Link
      href={link}
      className={`flex flex-col self-stretch h-[350px] max-w-[348.91px] w-full bg-primary ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={148.91}
        height={148.91}
        className="flex-1 w-full h-full object-cover"
      />
      <div className="bg-primary flex flex-col gap-2 p-[12px] text-white">
        <h3 className="font-[300] leading-[16px] text-[15px]">{title}</h3>
        <div className="flex gap-2 flex-wrap items-center ">
          <div className="flex gap-2">
            <Avatar
              src={creator?.avatar}
              alt={creator?.name}
              className="w-[16px] h-[16px]"
            />
            <span className="font-[600] leading-[16px] text-[10px]">
              Created by {creator?.name}
            </span>
          </div>
          <Rating
            className="px-2 rounded-[13px] w-[20] border-[0.3px] border-white"
            value={rating}
            readOnly
            size="small"
          />
        </div>
      </div>
    </Link>
  );
};

export default RelatedArtpieceCard;
