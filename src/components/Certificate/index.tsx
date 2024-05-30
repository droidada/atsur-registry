import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  artistName: string;
  yearOfCreation: string;
  type: string;
  medium: string;
  size: string;
  image: string;
}
const ArtPieceCertificate: React.FC<Props> = ({
  title,
  artistName,
  yearOfCreation,
  type,
  medium,
  size,
  image,
}) => {
  return (
    <div className="min-w-[615px] font-brawler min-h-[549px] flex flex-col justify-between">
      <div className="px-[55px] pt-[41px] flex justify-between gap-4 flex-1">
        <div className=" w-[450px]">
          <h1 className="font-bordum-sans  pr-4 text-[30px] leading-[30px] font-[800] pb-6 border-b-[1px] border-[#CAAA62]">
            CERTIFICATE OF <br /> AUTHENCITY
          </h1>
          <div className="flex mt-5 flex-col uppercase font-brawler">
            <h4 className="tracking-[10%] leadin-[17px]  font-bold">
              <span className="text-golden">TITLE OF ARTWORK: </span> {title}
            </h4>
            <h4 className="tracking-[10%] leadin-[17px]  font-bold">
              <span className="text-golden">ARTIST NAME: </span> {artistName}
            </h4>
            <h4 className="tracking-[10%] leadin-[17px]  font-bold">
              <span className="text-golden">YEAR OF CREATION: </span>{" "}
              {yearOfCreation}
            </h4>
            <h4 className="tracking-[10%] leadin-[17px]  font-bold">
              <span className="text-golden">TYPE: </span> {type}
            </h4>
            <h4 className="tracking-[10%] leadin-[17px]  font-bold">
              <span className="text-golden">MEDIUM: </span> {medium}
            </h4>
            <h4 className="tracking-[10%] leadin-[17px]  font-bold">
              <span className="text-golden">SIZE: </span> {size}
            </h4>
          </div>
        </div>
        <div className="w-[178px] max-w-[30%] h-[251px] bg-gold-gradient p-[5px]">
          <div className="w-full h-full relative bg-[#D9D9D9]">
            <Image
              src={image}
              fill
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between  px-[55px]  pb-4">
        <div className="flex flex-col gap-4 items-center">
          <h4 className="text-sm">Signed By</h4>
          <div className=""></div>
          <p className="text-center pt-2 px-4 border-t-[1px] font-[700] uppercase border-golden ">
            {artistName}
          </p>
        </div>
        <Image src="/atsur-badge.png" width={106} height={122} alt="atsur" />
      </div>
      <div className="w-full h-[36.61px] relative">
        <Image src={"/border-bottom.png"} fill alt="border-bottom" />
      </div>
    </div>
  );
};

export default ArtPieceCertificate;
