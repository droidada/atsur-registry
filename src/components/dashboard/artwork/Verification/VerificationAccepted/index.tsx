import ArtPieceCertificate from "@/components/Certificate";
import verification from "@/pages/dashboard/artworks/[id]/verification";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  artPiece: any;
}
const VerificationAccepted: React.FC<Props> = ({ artPiece }) => {
  console.log(artPiece?.artPiece);
  return (
    <div className="flex flex-col">
      {/* <div
        style={{ aspectRatio: "1/1" }}
        className="relative md:w-[330px] w-[250px] bg-secondary rounded-full overflow-hidden"
      >
        <Image
          src={"/images/atsur-login.png"}
          alt=""
          fill
          className="object-cover"
        />
      </div> */}
      <ArtPieceCertificate
        artistName={`${artPiece?.artPiece?.custodian?.profile?.firstName} ${artPiece?.artPiece?.custodian?.profile?.lastName}`}
        title={artPiece?.artPiece?.title}
        type={artPiece?.artPiece?.artType}
        yearOfCreation={new Date(artPiece?.artPiece?.createdAt)
          .getFullYear()
          .toString()}
        medium={artPiece?.artPiece?.medium}
        image={artPiece?.artPiece?.assets[0]?.url}
        size={`${artPiece?.artPiece?.width} x ${artPiece?.artPiece?.height} CM`}
      />
      <div className="flex flex-col mt-4 gap-4">
        <p className="w-full   text-justify text-[17px] leading-[20px] font-[300]">
          Congratulations your artwork has been verified
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            // onClick={() => setActiveIndex(0)}
            variant="contained"
            className=" h-[46px] w-full text-xs leading-[13px] bg-[#00FF94] text-primary"
          >
            Download
          </Button>
          <Button
            variant="outlined"
            className=" h-[46px] w-full text-xs leading-[13px]"
          >
            View Certificate
          </Button>
          <Button
            variant="outlined"
            className=" h-[46px] w-full text-xs leading-[13px]"
          >
            Mint to blockchain
          </Button>

          <Button
            variant="outlined"
            className=" h-[46px] w-full text-xs leading-[13px]"
          >
            Order physical certificate
          </Button>
          <Button
            variant="outlined"
            className=" h-[46px] w-full text-xs leading-[13px]"
          >
            Order RFID Tag
          </Button>
          <Button
            variant="outlined"
            className=" h-[46px] w-full text-xs leading-[13px]"
          >
            Order QR Sticker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationAccepted;
