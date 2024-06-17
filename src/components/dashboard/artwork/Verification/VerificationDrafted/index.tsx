import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import MainVerification from "../MainVerification";

interface Props {
  artPiece: any;
}

const VerificationDrafted: React.FC<Props> = ({ artPiece }) => {
  const [startEditing, setStartEditing] = useState(false);
  if (startEditing) {
    return <MainVerification artPiece={artPiece} />;
  }
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
        <h2 className="text-3xl text-[#4C4C4C] capitalize md:text-6xl  lg:text-8xl font-bold">
          {artPiece.status || "Draft"}
        </h2>
        <p className="w-full max-w-[272px] text-justify text-[17px] leading-[20px] font-[300]">
          You&apos;ve have not published your artwork yet.
        </p>
        <Button
          onClick={() => setStartEditing(true)}
          variant="contained"
          className="w-full bg-primary"
        >
          Continue Editing
        </Button>
      </div>
    </div>
  );
};

export default VerificationDrafted;
