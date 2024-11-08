import Image from "next/image";
import React from "react";
import { getCertificateText } from "../dashboard/artwork/Verification/VerificationAccepted";

interface Props {
  verification: any;
  signatureImage?: any;
  qrImage?: any;
  tokenized?: boolean;
}

const ArtPieceCertificate: React.FC<Props> = ({
  verification,
  signatureImage,
  qrImage,
  tokenized,
}) => {
  const role = verification.custodian.role;

  return (
    <div className="bg-[#FFFCF2] w-full  flex flex-col min-w-[585px] max-w-[1005px] justify-between h-fit mb-5 border-x-[1px] ">
      <div className="w-full border-t-[1px] flex-1  border-primary font-brawler flex flex-col ">
        <div className="flex flex-row justify-between gap-4 px-8 pt-8">
          <div className="w-[70%]">
            <h1 className="font-bodrum-sans-18 text-[30px] w-fit leading-tight font-[800] pb-2 ">
              CERTIFICATE OF <br /> AUTHENTICITY
            </h1>
            <div className="flex flex-col font-bold border-t-[1px] w-fit pr-4 pt-3 border-[#CAAA62] tracking-[0.1em] text-sm uppercase font-brawler mt-4">
              <h4>
                <span className="text-golden">TITLE OF ARTWORK: </span>{" "}
                {verification?.artPiece?.title}
              </h4>
              <h4>
                <span className="text-golden">ARTIST NAME: </span>{" "}
                {verification?.custodian[role]?.artist?.artistInfo.firstName}{" "}
                {verification?.custodian[role]?.artist?.artistInfo.lastName}
              </h4>
              <h4>
                <span className="text-golden">YEAR OF CREATION: </span>{" "}
                {new Date(verification?.artPiece?.creationDate?.date)
                  .getFullYear()
                  .toString()}
              </h4>
              <h4>
                <span className="text-golden">TYPE: </span>{" "}
                {verification?.artPiece?.artType}
              </h4>
              <h4>
                <span className="text-golden">MEDIUM: </span>{" "}
                {verification?.artPiece?.medium}
              </h4>
              <h4>
                <span className="text-golden">SIZE: </span>{" "}
                {verification?.artPiece?.dimensions?.width} x{" "}
                {verification?.artPiece?.dimensions?.height} Inches
              </h4>
            </div>
            <div className="flex flex-col items-center text-center mt-10 ml-10 font-brawler">
              {getCertificateText({ artPiece: { ...verification } })}
            </div>
          </div>
          <div className="flex-none w-[270.4px] h-[350.94px] bg-gold-gradient p-[5px]">
            <div className="w-full h-full relative bg-[#D9D9D9]">
              <Image
                src={verification?.artPiece?.assets[0]?.url}
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
                    src={"/block-chain-registered.png"}
                    width={56.57}
                    height={27.37}
                    alt="block-chain-text"
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center w-[150.66px] mt-0">
            <h4 className="text-sm">Signed By</h4>
            <div className="h-[60px]  w-full relative">
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
              {verification?.artist?.firstName ||
                verification?.artPiece?.custodian?.profile?.firstName}{" "}
              {verification?.artist?.lasttName ||
                verification?.artPiece?.custodian?.profile?.lastName}
            </p>
          </div>
          {/* <div className="flex items-center justify-center mt-0"> */}
          <div className="w-[166px] h-[122px] relative">
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
      <div className="w-full h-[45px] z-0 overflow-hidden relative ">
        <Image
          src={"/border-.svg"}
          height={45}
          width={700}
          alt="border-bottom"
          className="object-contain  w-full "
        />
      </div>
    </div>
  );
};

export default ArtPieceCertificate;
