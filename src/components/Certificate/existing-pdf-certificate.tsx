import moment from "moment";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

interface Props {
  artPiece: any;
  coaImg?: any;
  signatureImage?: any;
  qrImage?: any;
  tokenized?: boolean;
  className?: string;
}

const ExistingPdfCertificate = forwardRef(
  (
    { artPiece, coaImg, signatureImage, qrImage, tokenized, className }: Props,
    ref: any,
  ) => {
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    return (
      <>
        <div
          ref={ref}
          // style={{
          //   backgroundImage: `url(${coaImg?.url || artPiece?.existingCOA})`,
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover",
          // }}
          className={`min-w-[685px] max-w-[1005px] relative certificate ${className}`}
        >
          <Image
            alt=""
            src={coaImg?.url}
            fill
            className="w-full z-0 h-full object-cover"
          />
          <div className="relative z-10">
            <div
              className=" w-full flex flex-col justify-between h-fit mb-5 border-x-[1px]"
              style={{
                minWidth: "685px",
                minHeight: "200px",
                maxWidth: "1005px",
                maxHeight: "250px",
              }}
            ></div>
            <div className="flex flex-col justify-end   items-end px-8 py-2 ">
              <div className="w-fit h-fit bg-white/60 p-4 relative">
                <div className="flex flex-col w-full items-center p-2 border-[1px] ">
                  <div className="flex flex-col ">
                    <div className="w-[124px] mb-2 h-[124px] relative">
                      {qrImage && (
                        <Image
                          src={qrImage}
                          fill
                          alt=""
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[150.66px] mt-0">
                    {/* <h4 className="text-sm">Signed By</h4> */}
                    <div className="h-[60px] border-golden border-b-[1px]  w-full relative">
                      {signatureImage && (
                        <Image
                          fill
                          src={signatureImage}
                          alt=""
                          className="object-cover  w-full h-full  "
                        />
                      )}
                    </div>
                    <p className="text-center text-nowrap pt-2  w-full text-sm  text-primary font-[700] uppercase ">
                      {artPiece?.artist?.firstName} {artPiece?.artist?.lastName}
                    </p>
                  </div>
                  <div className="flex gap-[4px] w-[154px]">
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
                  <p className="text-center mt-2 p-[2px]   text-xs italic relative ">
                    Verified by Atsur Technologies (
                    {moment().format("DD/MM/YYYY")})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

ExistingPdfCertificate.displayName = "ExistingPdfCertificate";
export default ExistingPdfCertificate;
