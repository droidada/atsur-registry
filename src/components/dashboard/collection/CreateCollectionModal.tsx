import InputField from "@/components/Form/InputField";
import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import VerificationFileDroper from "../artwork/Verification/VerificationFileDroper";
import SelectField from "@/components/Form/SelectField";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  handleClose: () => void;
}
const CreateCollectionModal: React.FC<Props> = ({ open, handleClose }) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const collectionSchema = object({
    title: string().nonempty("Title is required"),
    type: string().nonempty("Type is required"),
    description: string(),
  });
  const [previewImg, setPreviewImg] = useState(null);
  const router = useRouter();

  const { data, mutate, isLoading } = useMutation({
    mutationFn: (data: any) => axiosAuth.post(`/collection/add`, data),
    onSuccess: () => {
      // toast.success("Collection created successfully");
      router.push(router.asPath);
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  type collectionInput = TypeOf<typeof collectionSchema>;

  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<collectionInput>({
    resolver: zodResolver(collectionSchema),
  });

  const handleUpload = (files: any) => {
    const fileDoc = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(fileDoc.file);
  };

  const onSubmit: SubmitHandler<collectionInput> = async (data: any) => {
    const formData = new FormData();
    formData.append("image", previewImg);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);

    mutate(formData);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      PaperProps={{
        noValidate: true,
        component: "form",
        onSubmit: handleSubmit(onSubmit),
        className: "bg-white py-8 max-w-[550px] w-full px-6",
      }}
    >
      <DialogTitle>Create Collection</DialogTitle>
      <DialogContent dividers>
        <InputField
          className=""
          control={control}
          name={`title`}
          label="Title"
          inputClassName="bg-secondary-white"
          type="text"
          error={!!errors?.title}
          helperText={errors?.title?.message}
        />
        <VerificationFileDroper
          maxSize={10 * 1024 * 1024}
          desc="Drag and drop your collection feature image to upload PNG, JPEG, GIF, or  WEBP (max 10MB)"
          handleUpload={handleUpload}
          className="w-full col-span-2"
          buttonClassName="bg-[#CECDCD]"
          dropzoneClassName="w-full relative h-[162px] "
          accept="image/png, image/jpeg, image/webp"
          previewImage={previewImg}
          isImage={true}
        />
        <InputField
          className="mt-2"
          control={control}
          name={`description`}
          label="Description"
          inputClassName="bg-secondary-white"
          type="text"
          multiline
          rows={3}
          error={!!errors?.description}
          helperText={errors?.description?.message}
        />

        <SelectField
          control={control}
          name="type"
          label="Type"
          // @ts-ignore
          sx={{
            "& fieldset": { border: "none", backgroundColor: "#D9D9D9" },
            borderColor: "black",
          }}
          fullWidth
          error={!!errors?.type}
          helperText={errors?.type?.message}
        >
          <MenuItem selected value={""} disabled>
            Select a type
          </MenuItem>
          {["artwork", "artifact", "mixed", "curated", "artist"]?.map(
            (type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ),
          )}
        </SelectField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          className="bg-primary text-white"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCollectionModal;
