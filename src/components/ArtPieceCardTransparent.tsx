import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from "moment";

interface Props {
  image: string;
  title: string;
  creator?: {
    name: string;
    image?: string;
  };
  medium: string;
  url: string;
  createdAt: string;
}
const ArtPieceCardTransparent: React.FC<Props> = ({
  image,
  title,
  creator,
  medium,
  url,
  createdAt,
}) => {
  return (
    <Link
      href={url}
      className="bg-white flex flex-col max-w-[281px]  w-full text-primary "
    >
      <Image
        src={image || "/placeholder.png"}
        alt={title}
        width={281}
        height={273}
        className="object-cover w-full h-[60%]"
      />
      <div className="md:py-[28px] font-[300] flex flex-col gap-3  px-4">
        <h3 className="text-2xl lg:text-[33px]  pb-4 border-b-[1px] ">
          {title}
        </h3>
        <div>
          <p className="text-sm tracking-[1%]">
            Created by <span className="font-[600]">{creator?.name}</span>
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <BsFillBookmarkDashFill size={9} />
              <span className="text-xs leading-[8px]">{medium}</span>
            </div>
            <div className="flex gap-2 items-center">
              <IoCalendarClearOutline size={9} />
              <span className="text-xs leading-[8px]">
                {moment(createdAt).format("Do MMM, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtPieceCardTransparent;
