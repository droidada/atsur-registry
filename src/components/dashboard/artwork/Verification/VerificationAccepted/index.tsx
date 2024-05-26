import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  artPiece: any;
}
const VerificationAccepted: React.FC<Props> = ({ artPiece }) => {
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
          Verified
        </h2>
        <p className="w-full   text-justify text-[17px] leading-[20px] font-[300]">
          Congratulations your artwork has been verified
        </p>
        <Stack direction="row" spacing={2}>
          <Button
            // onClick={() => setActiveIndex(0)}
            variant="contained"
            className="w-fit bg-[#00FF94] text-primary"
          >
            Download
          </Button>
          <Button variant="outlined" className="w-fit">
            Sign
          </Button>
          <Button variant="outlined" className="w-fit">
            Mint
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default VerificationAccepted;
