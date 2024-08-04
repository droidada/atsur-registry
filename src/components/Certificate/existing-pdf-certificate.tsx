import Image from "next/image";
import React, { forwardRef } from "react";

interface Props {
  artPiece: any;
  coaImg?: any;
  signatureImage?: any;
  qrImage?: any;
  tokenized?: boolean;
}

const ExistingPdfCertificate = forwardRef(
  ({ artPiece, coaImg, signatureImage, qrImage, tokenized}: Props, ref: any) => {
  console.log(artPiece);
  return (
    <>
      <div
        ref={ref}
        style={{
          backgroundImage: `url(${coaImg?.url || artPiece?.existingCOA})`,
        }}
        className="min-w-[685px] max-w-[1005px] certificate"
      >
        <div
          className=" w-full flex flex-col justify-between h-fit mb-5 border-x-[1px]"
          style={{
            minWidth: "685px",
            minHeight: "500px",
            maxWidth: "1005px",
            maxHeight: "600px",
          }}
        ></div>
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
              {artPiece?.artist?.firstName} {artPiece?.artist?.lastName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
},);

ExistingPdfCertificate.displayName = "ExistingPdfCertificate";
export default ExistingPdfCertificate;
