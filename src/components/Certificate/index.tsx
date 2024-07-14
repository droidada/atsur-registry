import Image from "next/image";
import React from "react";

interface Props {
  artPiece: any;
  signatureImage?: any;
  qrImage?: any;
  tokenized?: boolean;
}

const ArtPieceCertificate: React.FC<Props> = ({
  artPiece,
  signatureImage,
  qrImage,
  tokenized,
}) => {
  console.log(artPiece);
  return (
    <div className="bg-[#FFFCF2] w-full  flex flex-col min-w-[585px] justify-between h-fit mb-5 border-x-[1px] ">
      <div className="w-full border-t-[1px] flex-1  border-primary font-brawler flex flex-col ">
        <div className="flex flex-row justify-between gap-4 px-8 pt-8">
          <div className="w-[70%]">
            <h1 className="font-bodrum-sans-18 text-[30px] w-fit leading-tight font-[800] pb-2 ">
              CERTIFICATE OF <br /> AUTHENTICITY
            </h1>
            <div className="flex flex-col font-bold border-t-[1px] w-fit pr-4 pt-2 border-[#CAAA62] tracking-[0.1em] text-sm uppercase font-brawler mt-4">
              <h4>
                <span className="text-golden">TITLE OF ARTWORK: </span>{" "}
                {artPiece?.title}
              </h4>
              <h4>
                <span className="text-golden">ARTIST NAME: </span>{" "}
                {artPiece?.custodian?.profile?.firstName}{" "}
                {artPiece?.custodian?.profile?.lastName}
              </h4>
              <h4>
                <span className="text-golden">YEAR OF CREATION: </span>{" "}
                {new Date(artPiece?.createdAt).getFullYear().toString()}
              </h4>
              <h4>
                <span className="text-golden">TYPE: </span> {artPiece?.artType}
              </h4>
              <h4>
                <span className="text-golden">MEDIUM: </span> {artPiece?.medium}
              </h4>
              <h4>
                <span className="text-golden">SIZE: </span> {artPiece?.width} x{" "}
                {artPiece?.height} Inches
              </h4>
            </div>
          </div>
          <div className="flex-none w-[223.4px] h-[323.94px] bg-gold-gradient p-[5px]">
            <div className="w-full h-full relative bg-[#D9D9D9]">
              <Image
                src={artPiece?.assets[0]?.url}
                fill
                alt=""
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-end px-8 pt-2 ">
          <div className="flex flex-col ">
            <div className="w-[154px] h-[150px] relative">
              {qrImage && (
                <Image src={qrImage} fill alt="" className="object-cover" />
              )}
            </div>
            <div className="flex gap-[4px] w-full">
              {tokenized && (
                <>
                  <Image
                    className="flex-1"
                    src={"/block-chain-text.svg"}
                    width={56.57}
                    height={27.37}
                    alt="block-chain-text"
                  />
                  <Image
                    className="object-cover flex-shrink-0 w-[40.72px]"
                    src={"/block-chain.svg"}
                    alt="block-chain-logo"
                    width={23.72}
                    height={27.37}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-[150.66px] mt-0">
            <h4 className="text-sm">Signed By</h4>
            <div className="h-[50px]  w-full relative">
              {signatureImage && (
                <Image
                  fill
                  src={signatureImage}
                  alt=""
                  className="object-cover  w-full h-full  "
                />
              )}
            </div>
            <p className="text-center pt-2 px-4 text-sm border-t-[1px] font-[700] uppercase border-golden">
              {artPiece?.custodian?.profile?.firstName}{" "}
              {artPiece?.custodian?.profile?.lastName}
            </p>
          </div>
          {/* <div className="flex items-center justify-center mt-0"> */}
          <div className="w-[106px] h-[122px] relative">
            <img
              src="/atsur-badge.png"
              alt="atsur"
              className="object-contain w-[106px] h-[122px]"
            />
          </div>
          {/* </div> */}
        </div>
        {/* {!tokenized && <div className="h-5 w-full relative "></div>} */}
      </div>
      <div className="w-full h-[36.75px]   relative ">
        <Image
          src={"/border-.svg"}
          height={36.75}
          width={700}
          alt="border-bottom"
          className="object-contain  w-full "
        />
      </div>
    </div>
  );
};

export default ArtPieceCertificate;
