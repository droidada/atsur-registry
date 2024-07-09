import ArtPieceCertificate from "@/components/Certificate";
import PdfCertificate from "@/components/Certificate/PdfCertificate";
import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { FaSignature } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import SignatureCanvas from "react-signature-canvas";
import { useReactToPrint } from "react-to-print";
import { Onedoc } from "@onedoc/client";
import { compile } from "@onedoc/react-print";
import axios from "axios";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  signatureImage?: any;
  setSignatureImage?: React.Dispatch<React.SetStateAction<any>>;
  qrImage?: string;
}

// const ff = new FileforgeClient({
//   apiKey: process.env.NEXT_PUBLIC_FILEFORGE_API_KEY,
// });

const SignCertificate: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
  signatureImage,
  setSignatureImage,
  qrImage,
}) => {
  // const [signatureImage, setSignatureImage] = useState<any>();
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) =>
      axiosAuth.post(`/art-piece/draft-coa/${artPiece?.artPiece?._id}`, data),
    onSuccess: (data) => {
      setActiveIndex((prev) => prev + 1);
      // TODO refetch artpiecedata
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  const handlePublish = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
    copyStyles: true,

    print: async (printIframe: HTMLIFrameElement) => {
      try {
        const document = printIframe.contentDocument;

        if (document) {
          const html = document.querySelector(".certificate");

          html.classList.remove("hidden");

          // const { default: Html2Pdf } = await import("js-html2pdf");
          const rect = html.getBoundingClientRect();

          // const option = {
          //   margin: 0,
          //   filename: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
          //   jsPDF: {
          //     unit: "px",
          //     format: "A6",
          //     orientation: "portrait",
          //   },
          //   html2canvas: {
          //     removeContainer: true,
          //     dpi: 192,
          //     letterRendering: true,
          //     scale: 2,
          //   },
          // };
          //@ts-ignore
          const html2pdf = (await import("html2pdf.js")).default;

          const pdf = html2pdf(html, {
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a5", orientation: "landscape" },
            pagebreak: { mode: ["css", "legacy"] },
          });

          // const exporter = new Html2Pdf(html, option);

          // const pdf = await exporter.getPdf(false);

          // const pdfBlob = pdf.output("blob");

          // const formData = new FormData();
          // // console.log(pd)
          // formData.append("draftCOA", pdfBlob);
          // formData.append("signature", signatureImage);

          // const reader = new FileReader();
          // reader.onload = function (e) {
          //   if (e.target.result) {
          //     const url = URL.createObjectURL(pdfBlob);
          //     const link = document.createElement("a");
          //     link.href = url;

          //     console.log(url);
          //     //@ts-ignore
          //     // mutate({
          //     //   draftCOA: e.target?.result,
          //     //   signature: signatureImage,
          //     //   qrCode: qrImage,
          //     // });
          //   }
          // };
          // reader.readAsDataURL(pdfBlob);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // onAfterPrint: () => {
    //   setOpenPublishDialog(false);
    // },
  });

  return (
    <Stack spacing={2}>
      <ArtPieceCertificate
        qrCodeImage={qrImage}
        signatureImage={signatureImage}
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

      <PdfCertificate
        ref={certificateRef}
        artPiece={artPiece}
        signatureImage={signatureImage}
        qrImage={qrImage}
      />

      <Stack direction={"row"} spacing={2}>
        <Button
          onClick={() => {
            setOpenSignatureDialog(true);
          }}
          className="w-full max-w-[246px] h-[46px] text-xs font-[600] bg-primary-green"
          startIcon={<FaSignature />}
        >
          Sign Certificate
        </Button>

        <LoadingButton
          loading={isLoading}
          onClick={handlePublish}
          disabled={!signatureImage}
          className={`w-full max-w-[246px] h-[46px] text-xs font-[600] ${
            !signatureImage ? "bg-gray-400" : "bg-primary"
          } text-white`}
          startIcon={<IoMdSave />}
        >
          Save
        </LoadingButton>
      </Stack>

      <SignatureDialog
        open={openSignatureDialog}
        handleClose={() => setOpenSignatureDialog(false)}
        setSignatureImage={setSignatureImage}
      />
    </Stack>
  );
};

export default SignCertificate;

interface SignatureDialogProps {
  open: boolean;
  handleClose: () => void;
  setSignatureImage: React.Dispatch<React.SetStateAction<any>>;
}
const SignatureDialog: React.FC<SignatureDialogProps> = ({
  open,
  handleClose,
  setSignatureImage,
}) => {
  const canvasRef = useRef<any>(null);

  const clearSignature = () => {
    canvasRef.current.clear();
  };

  const saveSignature = () => {
    const signatureImage = canvasRef.current.toDataURL();
    setSignatureImage(signatureImage);
    handleClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Draw Your Signature</DialogTitle>
      <DialogContent dividers>
        <SignatureCanvas
          penColor="black"
          ref={canvasRef}
          canvasProps={{ className: "w-full h-[60px] bg-white" }}
        />
      </DialogContent>
      <DialogActions className="flex justify-between">
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            className="bg-primary"
            onClick={clearSignature}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            className="bg-primary-green text-primary"
            onClick={saveSignature}
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
