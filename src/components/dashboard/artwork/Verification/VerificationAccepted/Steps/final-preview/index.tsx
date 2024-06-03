import ArtPieceCertificate from "@/components/Certificate";
import { Button, Stack } from "@mui/material";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LiaDownloadSolid, LiaUploadSolid } from "react-icons/lia";
import { TbFileUpload } from "react-icons/tb";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  qrImage?: string;
  signatureImage: string;
  tokenize?: boolean;
}
const FinalPreview: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
  qrImage,
  signatureImage,
  tokenize,
}) => {
  return (
    <Stack>
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
        signatureImage={signatureImage}
        qrCodeImage={qrImage}
      />
      <Stack
        spacing={2}
        className="mt-4"
        direction={{ xs: "column", sm: "row" }}
      >
        <Button
          variant="contained"
          className="bg-primary-green max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<LiaUploadSolid />}
        >
          Publish
        </Button>
        <Button
          variant="outlined"
          className=" max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<LiaDownloadSolid />}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          className=" max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<IoEyeOutline />}
        >
          View Certificate
        </Button>
      </Stack>
    </Stack>
  );
};

export default FinalPreview;
