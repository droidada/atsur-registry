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
  qrCodeImage?: string;
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
  qrCodeImage,
}) => {
  return (
    <div className="w-full border-t-[1px] bg-[#FFFCF2] border-x-[1px] border-primary font-brawler flex flex-col ">
      <div className="flex flex-col md:flex-row justify-between gap-4 px-4 pt-4 md:px-8 md:pt-8">
        <div className="w-full md:w-[70%]">
          <h1 className="font-bodrum-sans-18 text-[24px] md:text-[30px] w-fit leading-tight font-[800] pb-4 md:pb-2 ">
            CERTIFICATE OF <br /> AUTHENTICITY
          </h1>
          <div className="flex flex-col font-bold border-t-[1px] pt-2 border-[#CAAA62] tracking-[0.1em] text-sm uppercase font-brawler mt-4">
            <h4>
              <span className="text-golden">TITLE OF ARTWORK: </span> {title}
            </h4>
            <h4>
              <span className="text-golden">ARTIST NAME: </span> {artistName}
            </h4>
            <h4>
              <span className="text-golden">YEAR OF CREATION: </span>{" "}
              {yearOfCreation}
            </h4>
            <h4>
              <span className="text-golden">TYPE: </span> {type}
            </h4>
            <h4>
              <span className="text-golden">MEDIUM: </span> {medium}
            </h4>
            <h4>
              <span className="text-golden">SIZE: </span> {size}
            </h4>
          </div>
        </div>
        <div className="flex-none w-full max-w-[223.4px] h-[323.94px] bg-gold-gradient p-[5px]">
          <div className="w-full h-full relative bg-[#D9D9D9]">
            <Image src={image} fill alt="" className="object-cover" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-end p-4 md:p-8 pt-4">
        <div className="w-[114px] h-[100px] relative">
          {qrCodeImage && (
            <Image src={qrCodeImage} fill alt="" className="object-contain" />
          )}
        </div>
        <div className="flex flex-col items-center mt-4 md:mt-0">
          <h4 className="text-sm">Signed By</h4>
          <div className="h-[50px] w-full relative">
            {signatureImage && (
              <Image
                src={signatureImage}
                fill
                alt=""
                className="object-cover"
              />
            )}
          </div>
          <p className="text-center pt-2 px-4 text-sm border-t-[1px] font-[700] uppercase border-golden">
            {artistName}
          </p>
        </div>
        <div className="flex items-center justify-center mt-4 md:mt-0">
          <Image src="/atsur-badge.png" width={106} height={122} alt="atsur" />
        </div>
      </div>
      <div className="w-full h-[36.61px] relative mt-4">
        <Image src={"/border-bottom.png"} fill alt="border-bottom" />
      </div>
    </div>
  );
};

export default ArtPieceCertificate;
