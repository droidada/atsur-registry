import Image from "next/image";
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { BiQrScan } from "react-icons/bi";
import { BlobProvider, PDFViewer, pdf } from "@react-pdf/renderer";
import VerificationFileDroper from "../../../VerificationFileDroper";
import { useToast } from "@/providers/ToastProvider";

interface Props {
  artPiece: any;
  coaImg: any;
  setCoaImg: (args: any) => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
const VericationConfirmPreview: React.FC<Props> = ({
  artPiece,
  coaImg,
  setCoaImg,
  setActiveIndex,
}) => {
  const toast = useToast();

  const handleUploadClick = (files) => {
    const fileDoc = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(fileDoc.file);
    reader.onload = () => {
      setCoaImg({
        url: reader.result,
        filename: fileDoc.name,
      });
    };
  };

  const handleNext = () => {
    if (!coaImg) {
      return toast.error("Please upload your existing certificate");
    }
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <Stack spacing={2}>
      <VerificationFileDroper
        maxSize={10 * 1024 * 1024}
        maxFiles={1}
        desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
        handleUpload={handleUploadClick}
        className="w-full h-full"
        buttonClassName="bg-[#CECDCD]"
        previewHeightClassName="h-[500px]"
        dropzoneClassName="w-full relative h-[662px] bg-secondary"
        accept="image/*"
        previewImage={coaImg?.url}
        fileName={coaImg?.filename}
        isImage={true}
      />

      <p className="leading-[20px] text-[17px] font-[300]">
        Please make sure you upload a clear image of your{" "}
        <span className="font-[500]">Certificate of Authenticity</span>.
      </p>

      <Button
        onClick={handleNext}
        className="w-full max-w-[246px] h-[46px] text-xs font-[600] bg-primary-green"
      >
        Proceed
      </Button>
    </Stack>
  );
};

export default VericationConfirmPreview;
