import { ICategory } from "@/types/models/hompageData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  category: any;
  url: string;
  dataAosDelay?: number;
  dataAos?: string;
}
const CategoryCard: React.FC<Props> = ({
  category,
  url,
  dataAos,
  dataAosDelay,
}) => {
  return (
    <Link
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      href={url}
      className=" max-w-[273.06px] w-full hover:scale-95 duration-500 cursor-pointer"
    >
      <div className="w-full p-5 border-[1.5px] h-[345.05px] gap-[17px] border-primary grid grid-cols-2">
        {category?.artworks?.map((artPiece) => (
          <Image
            key={artPiece?.id}
            width={104.79}
            height={130.48}
            alt={artPiece?.title}
            src={artPiece?.assets[0]?.url || "/placeholder.png"}
            className="object-cover  h-[130.48px]"
          />
        ))}
      </div>
      <h4 className="text-[17px] capitalize text-center leading-[12px] mt-[8px]">
        {category?.title}
      </h4>
    </Link>
  );
};

export default CategoryCard;
