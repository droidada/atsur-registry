import React, { forwardRef } from "react";
import ArtPieceCertificate from ".";
import Image from "next/image";
import { Tailwind } from "@fileforge/react-print";
import { getCertificateText } from "../dashboard/artwork/Verification/VerificationAccepted";

interface Props {
  verification: any;
  signatureImage: any;
  qrImage: any;
  tokenized?: boolean;
  className?: string;
}

const PdfCertificate = forwardRef(
  ({ verification, signatureImage, qrImage, tokenized }: Props, ref: any) => {
    const role = verification.custodian.role;

    return (
      <div ref={ref} className="w-[750px]  h-fit hidden  certificate">
        <div className="bg-[#FFFCF2]  w-full  flex flex-col  justify-between h-full border-x-[1px] ">
          <div className="w-full border-t-[1px] flex-1  border-primary font-brawler flex flex-col ">
            <div className="flex flex-row justify-between gap-4 px-8 pt-8">
              <div className="w-[70%]">
                <h1 className="font-bodrum-sans-18 text-[30px] w-fit leading-tight font-[800] pb-2 ">
                  CERTIFICATE OF <br /> AUTHENTICITY
                </h1>
                <div className="flex flex-col font-bold border-t-[1px] w-fit pr-4 pt-2 border-[#CAAA62] tracking-[0.1em] text-sm uppercase font-brawler mt-4">
                  <h4>
                    <span className="text-golden">TITLE OF ARTWORK: </span>{" "}
                    {verification?.artPiece?.title}
                  </h4>
                  <h4>
                    <span className="text-golden">ARTIST NAME: </span>{" "}
                    {verification[role]?.artist?.artistInfo.firstName}{" "}
                    {verification[role]?.artist?.artistInfo.lastName}
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
              <div className="flex-none w-[223.4px] h-[323.94px] bg-gold-gradient p-[5px]">
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
            <div className="flex flex-row justify-between items-center px-8 pt-2 mt-0 ">
              <div className="flex  flex-col ">
                <div className="w-[154px] h-[150px] relative">
                  {qrImage && (
                    <Image
                      src={qrImage}
                      fill
                      alt=""
                      className="object-cover flex-shrink-0"
                    />
                  )}
                </div>
                <div className="gap-[4px] w-[154px]">
                  {tokenized && (
                    <>
                      <img
                        className=" object-contain w-full"
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
                <div className="h-[50px]  w-full relative">
                  {signatureImage && (
                    <Image
                      fill
                      src={signatureImage}
                      alt=""
                      className="object-contain absolute left-0 bottom-0  w-full h-full  "
                    />
                  )}
                </div>
                <p className="text-center pt-2 px-4 flex gap-2 text-sm border-t-[1px] font-[700] uppercase border-golden">
                  <span>
                    {" "}
                    {verification?.artist?.firstName ||
                      verification?.artPiece?.custodian?.profile?.firstName}
                  </span>
                  <span>
                    {" "}
                    {verification?.artist?.lastName ||
                      verification?.artPiece?.custodian?.profile?.lastName}
                  </span>
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
            </div>
          </div>
          <div className="w-full    relative ">
            <Image
              src={"/border-.svg"}
              height={36.75}
              width={700}
              alt="border-bottom"
              className="object-contain  w-full footer"
            />
          </div>
        </div>
      </div>
    );
  },
);
PdfCertificate.displayName = "PdfCertificate";
export default PdfCertificate;
