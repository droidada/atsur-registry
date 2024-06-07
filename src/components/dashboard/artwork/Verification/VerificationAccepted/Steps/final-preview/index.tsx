import ArtPieceCertificate from "@/components/Certificate";
import PdfCertificate from "@/components/Certificate/PdfCertificate";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { BlobProvider, PDFViewer, pdf } from "@react-pdf/renderer";
import React, { useEffect, useRef, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { LiaDownloadSolid, LiaUploadSolid } from "react-icons/lia";
import { TbFileUpload } from "react-icons/tb";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingButton from "@/components/Form/LoadingButton";

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
  const ref = useRef<HTMLDivElement>(null);

  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const {
    data,
    refetch,
    isLoading: isLoadingQuery,
  } = useQuery({
    queryKey: ["art-piece", artPiece?.artPiece?._id],
    queryFn: () => axiosAuth.get(`/art-piece/${artPiece?.artPiece?._id}`),
  });

  const [viewPdf, setViewPdf] = useState(false);

  const handleDownload = () => {
    const certifiaceUrl =
      data?.data?.artPiece?.signedCOA || artPiece?.artPiece?.signedCOA;
    if (!certifiaceUrl) {
      toast.error("Certificate has not been published yet");
      return;
    }
    const link = document.createElement("a");
    link.href = certifiaceUrl;

    console.log(certifiaceUrl);

    link.download = certifiaceUrl.split("/").pop();
    link.click();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axiosAuth.post(`/art-piece/sign-coa/${artPiece?.artPiece?._id}`),
    onSuccess: () => {
      refetch();

      toast.success("Certificate has been published successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  return (
    <Stack>
      {/* <div className=" flex flex-col items-center  certificate" ref={ref}> */}
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
      {/* </div> */}
      <Stack
        spacing={2}
        className="mt-4"
        direction={{ xs: "column", sm: "row" }}
      >
        <LoadingButton
          loading={isLoading}
          onClick={() => {
            mutate();
          }}
          variant="contained"
          className="bg-primary-green max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<LiaUploadSolid />}
        >
          Publish
        </LoadingButton>
        <Button
          onClick={handleDownload}
          disabled={
            !artPiece?.artPiece?.signedCOA && !data?.data?.artPiece?.signedCOA
          }
          variant="outlined"
          className=" max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<LiaDownloadSolid />}
        >
          Download
        </Button>
        <Button
          onClick={() => {
            setViewPdf(true);
          }}
          variant="outlined"
          className=" max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<IoEyeOutline />}
        >
          View Certificate
        </Button>
      </Stack>
      <ViewCerficateDialog
        open={viewPdf}
        setOpen={setViewPdf}
        certificateUrl={
          data?.data?.artPiece?.signedCOA || artPiece?.artPiece?.signedCOA
        }
      />
    </Stack>
  );
};

export default FinalPreview;

interface ViewCerficateDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  certificateUrl: string;
}
const ViewCerficateDialog: React.FC<ViewCerficateDialogProps> = ({
  open,
  setOpen,
  certificateUrl,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
      <DialogTitle>Certificate</DialogTitle>
      <DialogContent dividers>
        <iframe src={certificateUrl} width="100%" height="500%"></iframe>
        {/* <iframe src={certificateUrl} frameborder="0"></iframe>
        {/* <canvas ref={canvasRef} width="100%" /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
