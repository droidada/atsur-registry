import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
interface Props {
  selectedInformationAdd: "artist" | "broker" | "collector" | "institution";
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
}
const ArtVerificationPreview: React.FC<Props> = ({
  selectedInformationAdd,
  setActiveIndex,
  defaultValues,
  artpieceId,
}) => {
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
          Draft
        </h2>
        <p className="w-full max-w-[272px] text-justify text-[17px] leading-[20px] font-[300]">
          Your artwork has not been processed for verification yet. You are
          still in the editing process. You can go back and edit your artwork.
          When you&apos;re done, click on the publish button to request
          verification.
        </p>
        <Button
          onClick={() => setActiveIndex(0)}
          variant="contained"
          className="w-full bg-primary"
        >
          Go back and edit
        </Button>
      </div>
    </div>
  );
};

export default ArtVerificationPreview;
