import ArtPieceCertificate from "@/components/Certificate";
import PdfCertificate from "@/components/Certificate/PdfCertificate";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
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
  const [openPublishDialog, setOpenPublishDialog] = useState(false);
  const [openDownloadDialog, setOpenDownloadDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

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
          onClick={() => {
            setOpenPublishDialog(true);
          }}
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
      <PublishDialog
        artPiece={artPiece}
        open={openPublishDialog}
        handleClose={() => setOpenPublishDialog(false)}
      />
    </Stack>
  );
};

export default FinalPreview;

type PublishProps = {
  artPiece: any;
  open: boolean;
  handleClose: () => void;
};
const PublishDialog: React.FC<PublishProps> = ({
  artPiece,
  open,
  handleClose,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Publish Certificate</DialogTitle>
      <DialogContent className="flex flex-col items-center" dividers>
        <PdfCertificate
          artistName={`${artPiece?.artPiece?.custodian?.profile?.firstName} ${artPiece?.artPiece?.custodian?.profile?.lastName}`}
          title={artPiece?.artPiece?.title}
          type={artPiece?.artPiece?.artType}
          yearOfCreation={new Date(artPiece?.artPiece?.createdAt)
            .getFullYear()
            .toString()}
          medium={artPiece?.artPiece?.medium}
          image={artPiece?.artPiece?.assets[0]?.url}
          size={`${artPiece?.artPiece?.width} x ${artPiece?.artPiece?.height} CM`}
          // signatureImage={signatureImage}
          // qrCodeImage={qrImage}
        />
      </DialogContent>
    </Dialog>
  );
};
