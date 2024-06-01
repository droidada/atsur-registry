import ArtPieceCertificate from "@/components/Certificate";
import { Button, Stack } from "@mui/material";
import React from "react";
import { BiQrScan } from "react-icons/bi";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
const VericationConfirmPreview: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
}) => {
  return (
    <Stack spacing={2}>
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
      <p className="leading-[20px] text-[17px] font-[300]">
        Congratulations. Your artwork has been{" "}
        <span className="font-[500]">Verified</span>.
      </p>

      <Button
        onClick={() => {
          setActiveIndex((prev) => prev + 1);
        }}
        className="w-full max-w-[246px] h-[46px] text-xs font-[600] bg-primary-green"
        startIcon={<BiQrScan />}
      >
        Generate QR Code
      </Button>
    </Stack>
  );
};

export default VericationConfirmPreview;
