import React, { useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";
import FormDialogContainer from "../FormDialogContainer";
import { object, string, TypeOf, boolean, ZodVoidDef } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Control, FieldErrors } from "react-hook-form";
import { useToast } from "@/providers/ToastProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import InputField from "@/components/Form/InputField";
import DateInput from "@/components/Form/DateInput";
import { useRouter } from "next/router";

interface Props {
  publications: any[];
  artpieceId: string;
}
const ArtPiecePublications: React.FC<Props> = ({ publications }) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [publicationDoc, setPublicationDoc] = useState(null);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [currentPublication, setCurrentPublication] = useState<any>(null);

  const publicationSchema = object({
    authorName: string().nonempty("Author name is required"),
    articleName: string().nonempty("Article name is required"),
    publicationName: string().nonempty("Publication name is required"),
    attachmentCaption: string(),
    notes: string(),
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
  } = useForm<publicationInput>({
    resolver: zodResolver(publicationSchema),
  });

  const {
    isLoading,
    error,
    isError,
    isSuccess,
    mutate: submit,
  } = useMutation({
    mutationFn: (data) => axiosAuth.post(`/publication/add`, data),
    onSuccess: () => {
      setOpen(false);
      toast.success("Publication added successfully.");
      reset();
      router.replace(router.asPath);
    },
    onError: (error) => {
      const errorMessage =
        // @ts-ignore
        error.response?.data?.message ||
        "An error occurred while adding the exhibition.";
      toast.error(errorMessage);
    },
  });

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPublicationDoc(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?
  };

  const onSubmitHandler: SubmitHandler<publicationInput> = async (values) => {
    const formData = new FormData();

    formData.append("attachment", publicationImg);
    formData.append("artPieceId", artPieceId);
    formData.append("authorName", values.authorName);
    formData.append("articleName", values.articleName);
    formData.append("publicationName", values.publicationName);
    formData.append("attachmentCaption", values.attachmentCaption);
    formData.append("notes", values.notes);
    currentPublication &&
      formData.append("publicationId", currentPublication?._id);
  };

  return (
    <ArtDetailsAccordionContainer
      onClick={() => setOpen(true)}
      title={"Publications"}
    >
      <></>
      <FormDialogContainer
        onSubmit={handleSubmit(onSubmitHandler)}
        title="Publication"
        open={open}
        isLoading={isLoading}
        handleClose={() => setOpen(false)}
      >
        <></>
      </FormDialogContainer>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPiecePublications;
