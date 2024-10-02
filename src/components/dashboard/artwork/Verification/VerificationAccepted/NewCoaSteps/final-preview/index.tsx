import ArtPieceCertificate from "@/components/Certificate";
import PdfCertificate from "@/components/Certificate/PdfCertificate";
import { SlTag } from "react-icons/sl";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
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
import { useRouter } from "next/router";
import { getCertificateText } from "../..";
import ExistingPdfCertificate from "@/components/Certificate/existing-pdf-certificate";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  qrImage?: string;
  signatureImage: string;
  tokenize?: boolean;
  coaType: "new" | "existing";
  coaImg: any;
}
const FinalPreview: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
  qrImage,
  signatureImage,
  tokenize,
  coaImg,
  coaType,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const {
    data,
    refetch,
    isLoading: isLoadingQuery,
  } = useQuery({
    queryKey: ["art-piece", artPiece?.artPiece?._id],
    queryFn: () => axiosAuth.get(`/art-piece/${artPiece?.artPiece?._id}`),
    refetchOnWindowFocus: false,
  });

  const [viewPdf, setViewPdf] = useState(false);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);

  const handleDownload = () => {
    const certifiaceUrl =
      data?.data?.artPiece?.signedCOA || artPiece?.artPiece?.signedCOA;
    if (!certifiaceUrl) {
      toast.error("Certificate has not been published yet");
      return;
    }
    const link = document.createElement("a");
    link.href = certifiaceUrl;

    link.download = certifiaceUrl.split("/").pop();
    link.click();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axiosAuth.post(`/art-piece/sign-coa/${artPiece?.artPiece?._id}`),
    onSuccess: () => {
      refetch();
      setOpenPublishDialog(false);
      // toast.success("Certificate has been published successfully");
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
      <div className="max-w-[900px] w-full">
        {coaType == "new" ? (
          <ArtPieceCertificate
            verification={artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage || artPiece?.artPiece?.qrCode}
            tokenized={
              artPiece?.artPiece?.lazyMintedVoucher ||
              data?.data?.artPiece?.lazyMintedVoucher
            }
          />
        ) : (
          <ExistingPdfCertificate
            coaImg={coaImg?.url || artPiece?.artPiece?.existingCOA}
            artPiece={artPiece?.artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage || artPiece?.artPiece?.qrCode}
            tokenized={
              artPiece?.artPiece?.lazyMintedVoucher ||
              data?.data?.artPiece?.lazyMintedVoucher
            }
          />
        )}
      </div>
      {/* </div> */}
      <Stack
        spacing={2}
        className="mt-8"
        direction={{ xs: "column", sm: "row" }}
      >
        <LoadingButton
          loading={isLoading}
          onClick={() => setOpenPublishDialog(true)}
          disabled={
            artPiece?.artPiece?.signedCOA || data?.data?.artPiece?.signedCOA
          }
          variant="contained"
          className="bg-primary-green disabled:bg-slate-200 disabled:text-slate-400 max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
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
          className=" max-w-[191.83px] h-[46px] w-full  disabled:bg-slate-200 disabled:text-slate-400 text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<LiaDownloadSolid />}
        >
          Download
        </Button>
        <Button
          onClick={() => {
            setViewPdf(true);
          }}
          disabled={
            !artPiece?.artPiece?.signedCOA && !data?.data?.artPiece?.signedCOA
          }
          variant="outlined"
          className=" max-w-[191.83px] h-[46px] w-full  disabled:bg-slate-200 disabled:text-slate-400 text-primary text-[12px] leading-[13px] font-[600]"
          startIcon={<IoEyeOutline />}
        >
          View Certificate
        </Button>
        {(artPiece?.artPiece?.signedCOA || data?.data?.artPiece?.signedCOA) && (
          <Button
            onClick={() => {
              router.push(
                `/dashboard/artworks/${artPiece?.artPiece?._id}/order-tag`,
              );
            }}
            variant="outlined"
            className=" max-w-[191.83px] h-[46px] w-full text-primary text-[12px] leading-[13px] font-[600]"
            startIcon={<SlTag />}
          >
            Order RFID Tag
          </Button>
        )}
      </Stack>
      <PublishDialog
        open={openPublishDialog}
        setOpen={setOpenPublishDialog}
        handlePublish={() => {
          mutate();
        }}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default FinalPreview;

interface PublishDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePublish: () => void;
  isLoading: boolean;
}
const PublishDialog: React.FC<PublishDialogProps> = ({
  open,
  setOpen,
  isLoading,
  handlePublish,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => !isLoading && setOpen(false)}
      maxWidth="xs"
    >
      <DialogContent>
        <Typography className="text-primary text-2xl  text-center">
          You can no longer make edits once published
        </Typography>
      </DialogContent>
      <DialogActions className="flex justify-center py-5 items-center">
        <LoadingButton
          loading={isLoading}
          className="w-[167.19px] h-[41.7px] "
          onClick={handlePublish}
          variant="contained"
        >
          Confirm
        </LoadingButton>
        <Button
          className="w-[167.19px] h-[41.7px]"
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
