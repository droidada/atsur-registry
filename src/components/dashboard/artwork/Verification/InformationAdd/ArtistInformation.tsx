import React from "react";
import FormContainer from "./formContainer";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import { Stack } from "@mui/material";
import InputField from "@/components/Form/InputField";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
}
const ArtistInformation: React.FC<Props> = ({
  setActiveIndex,
  defaultValues,
  artpieceId,
}) => {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    story: string().nonempty("Story is required"),
    videoCaption: string().optional(),
    attachment1Caption: string().optional(),
    attachment2Caption: string().optional(),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    control,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const { mutate, isLoading } = useMutation({});
  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Artist Information"
      onSubmit={() => {}}
    >
      <Stack spacing={2}>
        <InputField
          label="Story"
          id="story"
          placeholder=""
          name="story"
          tabIndex={2}
          labelClassName="font-[300]"
          inputClassName="bg-secondary"
          isRequired
          multiline
          rows={4}
          aria-required={true}
          fullWidth
          error={!!errors["story"]}
          helperText={errors["story"] ? errors["story"].message : ""}
          control={control}
        />
        <h2 className="text-[17px] leading-[17px] font-semibold ">
          Attachments
        </h2>
      </Stack>
    </FormContainer>
  );
};

export default ArtistInformation;
