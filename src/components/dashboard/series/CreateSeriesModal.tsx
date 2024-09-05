import InputField from "@/components/Form/InputField";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { TypeOf, object, string } from "zod";
import VerificationFileDroper from "../artwork/Verification/VerificationFileDroper";
import LoadingButton from "@/components/Form/LoadingButton";

interface Props {
  open: boolean;
  handleClose: () => void;
  series?: any;
}
const CreateSeriesModal: React.FC<Props> = ({ open, handleClose, series }) => {
  const seriesSchema = object({
    title: string().nonempty("Title is required"),
    // type: string().nonempty("Type is required"),
    description: string(),
  });

  type seriesInput = TypeOf<typeof seriesSchema>;

  const [previewImg, setPreviewImg] = useState(null);
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const { data, mutate, isLoading } = useMutation({
    mutationFn: (data: any) =>
      series
        ? axiosAuth.put(`/art-series/${series?._id}`, data)
        : axiosAuth.post(`/art-series/`, data),
    onSuccess: (data) => {
      toast.success(
        series ? "Series updated successfully" : "Series created successfully",
      );

      series
        ? router.reload()
        : router.push(`/dashboard/series/${data?.data?.data?._id}`);
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  const handleUpload = (files: any) => {
    const fileDoc = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(fileDoc.file);
  };

  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    handleSubmit,
    setValue,
  } = useForm<seriesInput>({
    resolver: zodResolver(seriesSchema),
  });

  useEffect(() => {
    if (series) {
      setValue("title", series?.title);
      setValue("description", series?.description);
    }
  }, [series]);

  const onSubmit: SubmitHandler<seriesInput> = async (data: any) => {
    const formData = new FormData();
    if (!previewImg && !series?.image) {
      toast.error("Please upload an image");
      return;
    }
    previewImg && formData.append("image", previewImg);
    formData.append("title", data.title);
    formData.append("description", data.description);
    // formData.append("type", data.type);

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
      <DialogTitle>Create Series</DialogTitle>
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
        <VerificationFileDroper
          maxSize={10 * 1024 * 1024}
          desc="Drag and drop your series feature image to upload PNG, JPEG, GIF, or  WEBP (max 10MB)"
          handleUpload={handleUpload}
          className="w-full col-span-2"
          buttonClassName="bg-[#CECDCD]"
          dropzoneClassName="w-full relative h-[162px] "
          accept="image/png, image/jpeg, image/webp"
          previewImage={previewImg || series?.image}
          isImage={true}
        />
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

export default CreateSeriesModal;
