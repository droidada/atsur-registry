import ArtPieceCertificate from "@/components/Certificate";
import { Button, MenuItem, Stack } from "@mui/material";
import React, { useState } from "react";
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
          signatureImage={signatureImage}
          qrCodeImage={qrImage}
        />
      </div>

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
            <option value="polygon">Polygon</option>
            <option value="celo">Celo</option>
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
          <Button
            onClick={() => {
              setActiveIndex((prev) => prev + 1);
            }}
            variant="contained"
            className="bg-primary max-w-[146px] h-[46px] w-full"
          >
            Skip
          </Button>
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
