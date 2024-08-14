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

import axios from "axios";
import { getCertificateText } from "../..";
import { artRoles } from "@/types/index";
import NotEnoughCredits from "../../NotEnoughCredits";
import { SignatureDialog } from "../../NewCoaSteps/sign-certificate";
import ExistingPdfCertificate from "@/components/Certificate/existing-pdf-certificate";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  signatureImage?: any;
  setSignatureImage?: React.Dispatch<React.SetStateAction<any>>;
  qrImage?: string;
  coaImg: any;
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
  coaImg,
}) => {
  // const [signatureImage, setSignatureImage] = useState<any>();
  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const cannotSign =
    artPiece?.artPiece?.verification?.custodian?.role !== artRoles.ARTIST ||
    !artPiece?.artPiece.signature
      ? false
      : true;
  const [loading, setLoading] = useState(false);
  const [openNotEnoughDialog, setOpenNotEnoughDialog] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: {
      draftCOA: any;
      signature: any;
      qrCode: any;
      existingCOA: any;
    }) =>
      axiosAuth.post(`/art-piece/draft-coa/${artPiece?.artPiece?._id}`, {
        ...data,
      }),
    onSuccess: (data) => {
      setActiveIndex((prev) => prev + 1);
      // TODO refetch artpiecedata
    },
    onError: (error: any) => {
      if (error?.response?.data?.message === "You don't have enough credits") {
        setOpenNotEnoughDialog(true);
      } else {
        toast.error(
          error.response.data.message ||
            error.message ||
            "Something went wrong",
        );
      }
    },
  });

  const handlePublish = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
    copyStyles: true,

    print: async (printIframe: HTMLIFrameElement) => {
      try {
        setLoading(true);
        const document = printIframe.contentDocument;

        if (document) {
          const html = document.querySelector(".certificate");

          html.classList.remove("hidden");
          const rect = html.getBoundingClientRect();

          // Calculate dimensions in mm (assuming 96 DPI)
          const mmWidth = (rect.width * 25.4) / 96;
          const mmHeight = (rect.height * 25.4) / 96;

          const html2pdf = (await import("html2pdf.js")).default;
          const option = {
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 4, removeContainer: true },
            jsPDF: {
              unit: "mm",
              format: [mmWidth, mmHeight],
              orientation: "landscape",
              floatPrecision: "smart",
            },
            pagebreak: { after: [".footer"], avoid: ["image"] },
          };

          const pdf = html2pdf().from(html).set(option).toPdf();

          pdf.output("datauristring").then((dataUri) => {
            const byteString = atob(dataUri.split(",")[1]);
            const mimeString = dataUri
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const pdfBlob = new Blob([ab], { type: mimeString });

            // Use the Blob (e.g., upload to server, display, etc.)
            console.log(pdfBlob);

            const reader = new FileReader();

            reader.onload = function (e) {
              if (e.target.result) {
                // const url = URL.createObjectURL(pdfBlob);
                // const link = document.createElement("a");
                // link.href = url;

                // console.log(url);

                mutate({
                  draftCOA: e.target?.result,
                  signature: signatureImage,
                  qrCode: qrImage,
                  existingCOA: coaImg?.url,
                });
              }
            };
            reader.readAsDataURL(pdfBlob);
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Stack spacing={2}>
      {cannotSign && ( //TODO: fix up UI
        <div>
          <p>
            Sorry you cannot proceed as the artist{" "}
            {`${artPiece?.artPiece?.artist?.firstName} ${artPiece?.artPiece?.artist?.lastName}`}
            , is yet to accept your invitation to authenticate their artwork.
          </p>
          <p>
            Would you like to remind them? <button>Resend Invite</button>
          </p>
        </div>
      )}
      <div className="">
        <ExistingPdfCertificate
          coaImg={coaImg}
          artPiece={artPiece?.artPiece}
          signatureImage={signatureImage || artPiece?.artPiece?.signature}
          qrImage={qrImage || artPiece?.artPiece?.qrCode}
        />
      </div>

      <ExistingPdfCertificate
        ref={certificateRef}
        coaImg={coaImg}
        artPiece={artPiece?.artPiece}
        signatureImage={signatureImage || artPiece?.artPiece?.signature}
        qrImage={qrImage || artPiece?.artPiece?.qrCode}
        className="hidden"
      />
      <NotEnoughCredits
        open={openNotEnoughDialog}
        onClose={() => setOpenNotEnoughDialog(false)}
      />
      <Stack direction={"row"} className="my-4" spacing={2}>
        {!cannotSign && (
          <Button
            onClick={() => {
              setOpenSignatureDialog(true);
            }}
            className="w-full max-w-[246px] h-[46px] text-xs font-[600] bg-primary-green"
            startIcon={<FaSignature />}
          >
            Sign Certificate
          </Button>
        )}

        <LoadingButton
          loading={loading || isLoading}
          onClick={handlePublish}
          disabled={!signatureImage && !artPiece?.artPiece?.signature}
          className={`w-full max-w-[246px] h-[46px] text-xs font-[600] ${
            !signatureImage && !artPiece?.artPiece?.signature
              ? "bg-gray-400"
              : "bg-primary"
          } text-white`}
          startIcon={<IoMdSave />}
        >
          Save
        </LoadingButton>
      </Stack>

      {!cannotSign && (
        <SignatureDialog
          open={openSignatureDialog}
          handleClose={() => setOpenSignatureDialog(false)}
          setSignatureImage={setSignatureImage}
        />
      )}
    </Stack>
  );
};

export default SignCertificate;
