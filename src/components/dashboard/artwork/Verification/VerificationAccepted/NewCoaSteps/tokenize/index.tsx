import ArtPieceCertificate from "@/components/Certificate";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { object, string, TypeOf, boolean, ZodVoidDef, array } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/components/Form/InputField";
import PdfCertificate from "@/components/Certificate/PdfCertificate";
import SelectField from "@/components/Form/SelectField";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import LoadingButton from "@/components/Form/LoadingButton";
import Link from "next/link";
import { getCertificateText } from "../..";
import NotEnoughCredits from "../../NotEnoughCredits";
import ExistingPdfCertificate from "@/components/Certificate/existing-pdf-certificate";
import CheckoutModal from "@/components/dashboard/CheckoutModal";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  qrImage?: string;
  signatureImage: string;
  coaType: "new" | "existing";
  coaImg: any;
}
const TokenizeCertificate: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
  signatureImage,
  qrImage,
  coaType,
  coaImg,
}) => {
  const tokenSchema = object({
    blockchainNetwork: string().refine(
      (val) => ["ethereum", "polygon", "celo"].includes(val),
      {
        message: "blockchainNetwork must be one of Ethereum, Polygon, or Celo",
      },
    ),
    walletAddress: string(),
  });

  console.log(artPiece?.artPiece?.artist);

  type TokenInput = TypeOf<typeof tokenSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm<TokenInput>({
    resolver: zodResolver(tokenSchema),
  });
  const certificateRef = useRef<HTMLDivElement>(null);
  const certificateSkipRef = useRef<HTMLDivElement>(null);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const role = artPiece?.custodian.role;
  const [openNotEnoughDialog, setOpenNotEnoughDialog] = useState(false);
  const [isloadingSkip, setIsLoadingSkip] = useState(false);
  const [isLoadingTokenize, setIsLoadingTokenize] = useState(false);
  const [openReadyToSign, setOpenReadyToSign] = useState(false);
  const [openSkipToSign, setOpenSkipToSign] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      axiosAuth.post(`/art-piece/tokenize/${artPiece?.artPiece?._id}`, data),
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
    onSettled: () => setIsLoadingTokenize(false),
  });

  const { mutate: mutateDraftCOA, isLoading: isLoadingDraftCOA } = useMutation({
    mutationFn: async (data: {
      draftCOA: any;
      qrCode: any;
      signature: any;
      existingCOA: any;
    }) =>
      axiosAuth.post(`/art-piece/draft-coa/${artPiece?.artPiece?._id}`, {
        ...data,
      }),
    onSuccess: (data) => {
      setActiveIndex((prev) => prev + 1);
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
    onSettled: () => setIsLoadingSkip(false),
  });

  const handleTokenize = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
    copyStyles: true,
    onBeforePrint: () => setIsLoadingTokenize(true),
    print: async (printIframe: HTMLIFrameElement) => {
      try {
        const document = printIframe.contentDocument;

        if (document) {
          const html = document.querySelector(".certificate");

          html.classList.remove("hidden");
          const rect = html.getBoundingClientRect();

          // Calculate dimensions in mm (assuming 96 DPI)
          const mmWidth = (rect.width * 25.4) / 96;
          const mmHeight = (rect.height * 25.4) / 96;

          // return;

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

            const reader = new FileReader();

            reader.onload = function (e) {
              if (e.target.result) {
                mutate({
                  draftCOA: e.target?.result,
                  qrCode: qrImage,
                  existingCOA: coaImg?.url,
                });
              }
            };
            reader.readAsDataURL(pdfBlob);
          });
        }
      } catch (error) {
        // console.log(error);
      }
    },
    // onAfterPrint: () => setLoading(true),
  });

  const handleSkip = useReactToPrint({
    content: () => certificateSkipRef.current,
    documentTitle: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
    copyStyles: true,
    onBeforePrint: () => setIsLoadingSkip(true),
    print: async (printIframe: HTMLIFrameElement) => {
      try {
        const document = printIframe.contentDocument;

        if (document) {
          const html = document.querySelector(".certificate");

          html.classList.remove("hidden");
          const rect = html.getBoundingClientRect();

          // Calculate dimensions in mm (assuming 96 DPI)
          const mmWidth = (rect.width * 25.4) / 96;
          const mmHeight = (rect.height * 25.4) / 96;

          // return;

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

            const reader = new FileReader();

            reader.onload = function (e) {
              if (e.target.result) {
                mutateDraftCOA({
                  draftCOA: e.target?.result,
                  signature: signatureImage,
                  qrCode: qrImage,
                  existingCOA: coaImg?.url,
                });
              }
            };
          });
        }
      } catch (error) {
        // console.log(error);
      }
    },
    // onAfterPrint: () => setLoading(true),
  });

  const handleCopyToClipboard = () => {
    try {
      navigator.clipboard.writeText(
        artPiece?.artPiece?.custodian?.profile?.wallet?.address,
      );
      // toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex gap-6 flex-col  ">
      {coaType === "new" ? (
        <div className="">
          <ArtPieceCertificate
            verification={artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage}
          />
          <PdfCertificate
            ref={certificateRef}
            verification={artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage}
            tokenized={true}
          />
          <PdfCertificate
            ref={certificateSkipRef}
            verification={artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage}
            tokenized={false}
          />
        </div>
      ) : (
        <div className="">
          <ExistingPdfCertificate
            coaImg={coaImg?.url}
            artPiece={artPiece?.artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage || artPiece?.artPiece?.qrCode}
          />
          <ExistingPdfCertificate
            ref={certificateRef}
            coaImg={coaImg?.url}
            artPiece={artPiece?.artPiece}
            signatureImage={signatureImage || artPiece?.artPiece?.signature}
            qrImage={qrImage || artPiece?.artPiece?.qrCode}
            className="hidden w-[]"
            tokenized={true}
          />
        </div>
      )}

      <div className="flex flex-col  gap-5  ">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="blockchainNetwork"
            className="text-[16px] leading-[17px] font-[300]"
          >
            Supported Blockchain Networks
          </label>
          <select
            className="bg-secondary-white border-none outline-none focus:outline-none focus:border-none ring-0"
            name="blockchainNetwork"
            id="blockchainNetwork"
            {...register("blockchainNetwork")}
          >
            <option value="" defaultChecked disabled selected>
              Select
            </option>
            <option value="ethereum">Ethereum</option>
            {/* <option value="polygon">Polygon</option>
            <option value="celo">Celo</option> */}
          </select>
          <Link href="#" className="block text-[#18BAFF] text-[8px]">
            Learn More about your selected blockchain
          </Link>
          {errors.blockchainNetwork?.message && (
            <span className="text-red-500  text-xs">
              {errors.blockchainNetwork?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="walletAddress"
            className="text-[16px] leading-[17px] font-normal"
          >
            Wallet Address
          </label>
          <div className=" h-[42px] flex items-center justify-between px-3">
            <span>
              {artPiece?.artPiece?.custodian?.profile?.wallet?.address
                .slice(0, 4)
                ?.padEnd(
                  artPiece?.artPiece?.custodian?.profile?.wallet?.address
                    ?.length - 4,
                  "*",
                )}
            </span>
            <Button
              onClick={handleCopyToClipboard}
              className="bg-secondary-white rounded-[58px] font-[300] text-xs"
            >
              Copy
            </Button>
          </div>
        </div>
        <InputField
          label="Price (fixed)"
          hasInfo
          info="Price is fixed"
          id="price"
          type="price"
          placeholder="22,2200"
          name="price"
          className="w-full"
          labelClassName="text-[16px] leading-[17px] font-normal "
          inputClassName="bg-transparent"
          tabIndex={2}
          fullWidth
          aria-required="true"
          error={!!errors["price"]}
          helperText={errors["price"] ? errors["price"].message : ""}
          control={control}
        />

        <div className="flex mt-[31px] gap-4">
          <LoadingButton
            loading={isloadingSkip}
            onClick={() => {
              if (role !== "artist") {
                setOpenSkipToSign(true);
              } else {
                setActiveIndex((prev) => prev + 1);
              }
            }}
            variant="contained"
            className="bg-primary max-w-[146px] h-[46px] w-full"
          >
            Skip
          </LoadingButton>
          <LoadingButton
            onClick={() => setOpenReadyToSign(true)}
            loading={isLoadingTokenize}
            variant="contained"
            className="bg-primary-green text-primary max-w-[146px] h-[46px] w-full"
          >
            Tokenize
          </LoadingButton>
        </div>
      </div>

      <CheckoutModal
        open={openNotEnoughDialog}
        onClose={() => setOpenNotEnoughDialog(false)}
      />

      <Dialog open={openReadyToSign} onClose={() => setOpenReadyToSign(false)}>
        <DialogContent>
          1 tokenization credit will be deducted for this process.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReadyToSign(false)} variant="outlined">
            Not Now
          </Button>
          <LoadingButton
            loading={isLoadingTokenize}
            onClick={handleTokenize}
            className="bg-primary text-white"
          >
            Continue
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={openSkipToSign} onClose={() => setOpenSkipToSign(false)}>
        <DialogContent>
          1 digital certificate of authenticity credit will be deducted for this
          process.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSkipToSign(false)} variant="outlined">
            Not Now
          </Button>
          <LoadingButton
            loading={isLoadingDraftCOA}
            onClick={handleSkip}
            className="bg-primary text-white"
          >
            Continue
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TokenizeCertificate;
