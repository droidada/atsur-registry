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
  signatureImage?: string;
}
const ArtPieceCertificate: React.FC<Props> = ({
  title,
  artistName,
  yearOfCreation,
  type,
  medium,
  size,
  image,
  signatureImage,
}) => {
  return (
    <div className=" border-t-[1px] border-x-[1px] border-primary font-brawler  flex flex-col ">
      <div className="px-[55px]  pb-2 pt-[41px] flex justify-between gap-4 ">
        <div className=" max-w-[450px]">
          <h1 className="font-bodrum-sans-18 pr-4 text-[30px] leading-[30px] font-[800] pb-6 border-b-[1px] border-[#CAAA62]">
            CERTIFICATE OF <br /> AUTHENCITY
          </h1>
          <div className="flex mt-5 flex-col font-bold tracking-[10%] text-sm uppercase font-brawler">
            <h4 className="   ">
              <span className="text-golden">TITLE OF ARTWORK: </span> {title}
            </h4>
            <h4 className="   ">
              <span className="text-golden">ARTIST NAME: </span> {artistName}
            </h4>
            <h4 className="   ">
              <span className="text-golden">YEAR OF CREATION: </span>{" "}
              {yearOfCreation}
            </h4>
            <h4 className="   ">
              <span className="text-golden">TYPE: </span> {type}
            </h4>
            <h4 className="   ">
              <span className="text-golden">MEDIUM: </span> {medium}
            </h4>
            <h4 className="   ">
              <span className="text-golden">SIZE: </span> {size}
            </h4>
          </div>
        </div>
        <div className="min-w-[229.72px] w-[30%] h-[323.94px] bg-gold-gradient p-[5px]">
          <div className="w-full h-full relative bg-[#D9D9D9]">
            <div className="w-full h-full  relative">
              <Image
                src={image}
                fill
                alt=""
                className="w-full h-full -bottom-10 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end pl-[55px] pr-[94px]  pb-4">
        <div className="w-[114px] h-[50px] ">{/* TODO add qrcode */}</div>
        <div className="flex flex-col  items-center">
          <h4 className="text-sm">Signed By</h4>
          <div className="h-[50px] w-full relative">
            {signatureImage && (
              <Image
                src={signatureImage}
                fill
                alt=""
                className="w-full h-full  object-cover"
              />
            )}
          </div>
          <p className="text-center pt-2 px-4 text-sm border-t-[1px] font-[700] uppercase border-golden ">
            {artistName}
          </p>
        </div>
        <div className="flex items-center justify-center ">
          <Image src="/atsur-badge.png" width={106} height={122} alt="atsur" />
        </div>
      </div>
      <div className="w-full h-[36.61px] relative">
        <Image src={"/border-bottom.png"} fill alt="border-bottom" />
      </div>
    </div>
  );
};

export default ArtPieceCertificate;
