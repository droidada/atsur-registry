import ArtPieceCertificate from "@/components/Certificate";
import { Stack } from "@mui/material";
import React from "react";
import { object, string, TypeOf, boolean, ZodVoidDef, array } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Control,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import InputField from "@/components/Form/InputField";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
const TokenizeCertificate: React.FC<Props> = ({ artPiece, setActiveIndex }) => {
  const tokenSchema = object({
    name: string(),
    startDate: string(),
    sourceWallet: string(),
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
    <div className="flex gap-4 flex-col ">
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
      />
      <Stack spacing={2}>
        <InputField
          control={control}
          name={`name`}
          className="flex-1"
          label="Name"
          inputClassName="bg-secondary-white"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Stack>
    </div>
  );
};

export default TokenizeCertificate;
