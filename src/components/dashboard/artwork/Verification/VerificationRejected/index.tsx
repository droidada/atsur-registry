import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  artPiece: any;
}
const VerificationRejected: React.FC<Props> = ({ artPiece }) => {
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
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl text-[#4C4C4C] md:text-6xl  lg:text-8xl font-bold">
          {artPiece.status || "Rejected"}
        </h2>
        <p className="w-full max-w-[272px] text-justify text-[17px] leading-[20px] font-[300]">
          Your art piece{" "}
          {artPiece.status === "in_dispute"
            ? " is in dispute"
            : "has been rejected"}
          <br />
          <br />
          <span className="font-bold">Rejection Reason:</span>
          <br />
          {artPiece?.rejectionReason}
        </p>
        <Button
          // onClick={() => setActiveIndex(0)}
          variant="contained"
          className="w-full bg-primary"
        >
          Edit and Reapply
        </Button>
      </div>
    </div>
  );
};

export default VerificationRejected;
