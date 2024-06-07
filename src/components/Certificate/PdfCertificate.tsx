import React, { forwardRef } from "react";
import ArtPieceCertificate from ".";
import Image from "next/image";

interface Props {
  artPiece: any;
  signatureImage: any;
  qrImage: any;
}

const PdfCertificate = forwardRef(
  ({ artPiece, signatureImage, qrImage }: Props, ref) => {
    return (
      // @ts-ignore
      <div ref={ref} className="w-[752px] hidden certificate">
        <div className="w-full border-t-[1px] bg-[#FFFCF2] border-x-[1px] border-primary font-brawler flex flex-col ">
          <div className="flex flex-row justify-between gap-4 px-8 pt-8">
            <div className="w-[70%]">
              <h1 className="font-bodrum-sans-18 text-[30px] w-fit leading-tight font-[800] pb-2 ">
                CERTIFICATE OF <br /> AUTHENTICITY
              </h1>
              <div className="flex flex-col font-bold border-t-[1px] w-fit pr-4 pt-2 border-[#CAAA62] tracking-[0.1em] text-sm uppercase font-brawler mt-4">
                <h4>
                  <span className="text-golden">TITLE OF ARTWORK: </span>{" "}
                  {artPiece?.artPiece?.title}
                </h4>
                <h4>
                  <span className="text-golden">ARTIST NAME: </span>{" "}
                  {artPiece?.artPiece?.custodian?.profile?.firstName}{" "}
                  {artPiece?.artPiece?.custodian?.profile?.lastName}
                </h4>
                <h4>
                  <span className="text-golden">YEAR OF CREATION: </span>{" "}
                  {new Date(artPiece?.artPiece?.createdAt)
                    .getFullYear()
                    .toString()}
                </h4>
                <h4>
                  <span className="text-golden">TYPE: </span>{" "}
                  {artPiece?.artPiece?.artType}
                </h4>
                <h4>
                  <span className="text-golden">MEDIUM: </span>{" "}
                  {artPiece?.artPiece?.medium}
                </h4>
                <h4>
                  <span className="text-golden">SIZE: </span>{" "}
                  {artPiece?.artPiece?.width} x {artPiece?.artPiece?.height} CM
                </h4>
              </div>
            </div>
            <div className="flex-none w-[223.4px] h-[323.94px] bg-gold-gradient p-[5px]">
              <div className="w-full h-full relative bg-[#D9D9D9]">
                <Image
                  src={artPiece?.artPiece?.assets[0]?.url}
                  fill
                  alt=""
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-end px-8 pt-2 ">
            <div className="w-[114px] h-[100px] relative">
              {qrImage && (
                <Image src={qrImage} fill alt="" className="object-contain" />
              )}
            </div>
            <div className="flex flex-col items-center w-[150.66px] mt-0">
              <h4 className="text-sm">Signed By</h4>
              <div className="h-[50px] w-full relative">
                {signatureImage && (
                  <Image
                    src={signatureImage}
                    fill
                    alt=""
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <p className="text-center pt-2 px-4 text-sm border-t-[1px] font-[700] uppercase border-golden">
                {artPiece?.artPiece?.custodian?.profile?.firstName}{" "}
                {artPiece?.artPiece?.custodian?.profile?.lastName}
              </p>
            </div>
            <div className="flex items-center justify-center mt-0">
              <Image
                src="/atsur-badge.png"
                width={106}
                height={122}
                alt="atsur"
              />
            </div>
          </div>
          <div className="w-full h-[36.61px] relative mt-4">
            <Image
              src={"/border-bottom.png"}
              fill
              alt="border-bottom"
              className="object-cover"
            />
          </div>
        </div>
        {/* <ArtPieceCertificate
          artistName={`${artPiece?.artPiece?.custodian?.profile?.firstName} ${artPiece?.artPiece?.custodian?.profile?.lastName}`}
          title={artPiece?.artPiece?.title}
          type={artPiece?.artPiece?.artType}
          yearOfCreation={new Date(artPiece?.artPiece?.createdAt)
            .getFullYear()
            .toString()}
          medium={artPiece?.artPiece?.medium}
          image={artPiece?.artPiece?.assets[0]?.url}
          size={`${artPiece?.artPiece?.width} x ${artPiece?.artPiece?.height} CM`}
          signatureImage={signatureImage}
          qrCodeImage={qrImage}
        /> */}
      </div>
    );
  },
);
PdfCertificate.displayName = "PdfCertificate";
export default PdfCertificate;
