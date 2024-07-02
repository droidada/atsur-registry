import ArtPieceCertificate from "@/components/Certificate";
import { Button, MenuItem, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import { object, string, TypeOf, boolean, ZodVoidDef, array } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { PDFViewer } from "@react-pdf/renderer";
import {
  useForm,
  SubmitHandler,
  Control,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import InputField from "@/components/Form/InputField";
import PdfCertificate from "@/components/Certificate/PdfCertificate";
import SelectField from "@/components/Form/SelectField";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { LoadingButton } from "@mui/lab";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  qrImage?: string;
  signatureImage: string;
}
const TokenizeCertificate: React.FC<Props> = ({
  artPiece,
  setActiveIndex,
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

          // html.classList.add("pt-4");
          // html.classList.add("pl-6");

          const { default: Html2Pdf } = await import("js-html2pdf");
          const rect = html.getBoundingClientRect();

          const option = {
            margin: 0,
            filename: `Certificate - ${artPiece?.artPiece?.title}.pdf`,
            jsPDF: {
              unit: "px",
              format: [772, 750],
              orientation: "portrait",
            },
            html2canvas: {
              height: rect.height,
              backgroundColor: null,
              removeContainer: true,
              windowHeight: 550,
              dpi: 192,
              letterRendering: true,
              scale: 2,
            },
          };

          const exporter = new Html2Pdf(html, option);

          const pdf = await exporter.getPdf(false);

          const pdfBlob = pdf.output("blob");
          const formData = new FormData();
          formData.append("draftCOA", pdfBlob);

          const reader = new FileReader();
          reader.onload = function (e) {
            // @ts-ignore

            mutate({
              draftCOA: e.target?.result,
            });
          };
          reader.readAsDataURL(pdfBlob);

          // mutate(formData);
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
    <div className="flex gap-4 lg:flex-row flex-col">
      <div className="lg:w-4/5 w-full">
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
          signatureImage={signatureImage || artPiece?.artPiece?.signature}
          qrCodeImage={qrImage || artPiece?.artPiece?.qrCode}
        />
      </div>
      <PdfCertificate
        ref={certificateRef}
        artPiece={artPiece}
        signatureImage={signatureImage}
        qrImage={qrImage}
      />

      <div className="flex flex-col  gap-4 lg:w-1/2 w-full">
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
          {errors.blockchainNetwork?.message && (
            <span className="text-red-500  text-xs">
              {errors.blockchainNetwork?.message}
            </span>
          )}
        </div>
        <InputField
          label="Wallet Address"
          id="walletAddress"
          type="number"
          placeholder="445 **** ****"
          name="walletAddress"
          className="w-full"
          labelClassName="text-[16px] leading-[17px] font-thin"
          inputClassName="bg-secondary-white"
          tabIndex={2}
          fullWidth
          aria-required="true"
          error={!!errors["walletAddress"]}
          helperText={
            errors["walletAddress"] ? errors["walletAddress"].message : ""
          }
          control={control}
        />

        <div className="flex mt-[31px] gap-4">
          <LoadingButton
            loading={isLoading}
            onClick={() => setActiveIndex((prev) => prev + 1)}
            variant="contained"
            className="bg-primary max-w-[146px] h-[46px] w-full"
          >
            Skip
          </LoadingButton>
          <Button
            variant="contained"
            className="bg-primary-green text-primary max-w-[146px] h-[46px] w-full"
          >
            Token
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenizeCertificate;
