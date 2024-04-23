import { ICategory } from "@/types/models/hompageData";
import Image from "next/image";
import React from "react";

interface Props {
  category: ICategory;
}
const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className=" max-w-[273.06px] w-full hover:scale-95 duration-500 cursor-pointer">
      <div className="w-full p-5 border-[1.5px] h-[345.05px] gap-[17px] border-primary grid grid-cols-2">
        {category.artPieces.slice(0, 4).map((artPiece) => (
          <Image
            key={artPiece?._id}
            width={104.79}
            height={130.48}
            alt={artPiece?.title}
            src={artPiece?.assets?.url}
            className="object-cover h-[130.48px]"
          />
        ))}
      </div>
      <h4 className="text-[17px] text-center leading-[12px] mt-[8px]">
        {category?._id}
      </h4>
    </div>
  );
};

export default CategoryCard;
