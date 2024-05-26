import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  artPiece: any;
}
const VerificationPending: React.FC<Props> = ({ artPiece }) => {
  const router = useRouter();

  console.log(artPiece);

  return (
    <div className="flex lg:flex-nowrap justify-center items-center mt-6 flex-wrap md:gap-8">
      <div
        style={{ aspectRatio: "1/1" }}
        className="relative md:w-[330px] w-[250px] bg-secondary rounded-full overflow-hidden"
      >
        <Image
          src={"/images/atsur-login.png"}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="flex lg:w-1/2 flex-col gap-4">
        <h2 className="text-3xl text-[#4C4C4C] md:text-6xl  lg:text-8xl font-bold">
          Pending
        </h2>
        <p className="w-full   text-justify text-[17px] leading-[20px] font-[300]">
          Your art piece has been published and awaiting verification. This will
          take a few days. Meanwhile, if you have not done your KYC
          verification, click on the button below to do. You will be redirected
          to the KYC verification page.
          <br />
          <br />
          <span className="font-bold">Note:</span> KYC Verification might
          prevent the art piece from being verified.
        </p>
        <Button
          // onClick={() => setActiveIndex(0)}
          variant="contained"
          className="w-full bg-primary"
        >
          Verify Now
        </Button>
      </div>
    </div>
  );
};

export default VerificationPending;
