import ArtPieceCertificate from "@/components/Certificate";
import { Button, MenuItem, Stack } from "@mui/material";
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

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  coaImg: any;
  qrImage?: string;
  signatureImage: string;
}
const TokenizeCertificate: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
  coaImg,
  signatureImage,
  qrImage,
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
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const role = artPiece?.custodian.role;
  const [openNotEnoughDialog, setOpenNotEnoughDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      axiosAuth.post(
        `/art-piece/tokenize-coa/${artPiece?.artPiece?._id}`,
        data,
      ),
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

  const { mutate: mutateDraftCOA, isLoading: isLoadingDraftCOA } = useMutation({
    mutationFn: async (data: { draftCOA: any; qrCode: any }) =>
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
  });

  const handlePublish = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
    copyStyles: true,
    onBeforePrint: () => setLoading(true),
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
                if (role === "artist") {
                  setType("tokenize");
                  mutate({
                    draftCOA: e.target?.result,
                  });
                } else {
                  setType("sign");
                  mutateDraftCOA({
                    draftCOA: e.target?.result,
                    // signature: signatureImage,
                    qrCode: qrImage,
                  });
                }
              }
            };
            reader.readAsDataURL(pdfBlob);
          });
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
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
      <div className=" overflow-x-auto ">
        <ExistingPdfCertificate
          coaImg={coaImg?.url || artPiece?.artPiece?.existingCOA}
          artPiece={artPiece?.artPiece}
          signatureImage={signatureImage || artPiece?.artPiece?.signature}
          qrImage={qrImage || artPiece?.artPiece?.qrCode}
        />
      </div>
      <ExistingPdfCertificate
        ref={certificateRef}
        coaImg={coaImg?.url || artPiece?.artPiece?.existingCOA}
        artPiece={artPiece?.artPiece}
        signatureImage={signatureImage || artPiece?.artPiece?.signature}
        qrImage={qrImage || artPiece?.artPiece?.qrCode}
        className="hidden"
      />

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
            loading={type === "sign" && (isLoadingDraftCOA || loading)}
            onClick={handlePublish}
            variant="contained"
            className="bg-primary max-w-[146px] h-[46px] w-full"
          >
            Skip
          </LoadingButton>
          <LoadingButton
            onClick={handlePublish}
            loading={type === "tokenize" && (loading || isLoading)}
            variant="contained"
            className="bg-primary-green text-primary max-w-[146px] h-[46px] w-full"
          >
            Tokenize
          </LoadingButton>
        </div>
      </div>

      <NotEnoughCredits
        open={openNotEnoughDialog}
        onClose={() => setOpenNotEnoughDialog(false)}
      />
    </div>
  );
};

export default TokenizeCertificate;
