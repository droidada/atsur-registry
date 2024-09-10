import React, { useEffect, useState } from "react";
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
import PublicationTable from "./PublicationTable";

interface Props {
  publications: any[];
  artpieceId: string;
}
const ArtPiecePublications: React.FC<Props> = ({
  publications,
  artpieceId,
}) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [publicationDoc, setPublicationDoc] = useState(null);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [currentPublication, setCurrentPublication] = useState<any>(null);
  const [docName, setDocName] = useState("");

  const publicationSchema = object({
    authorName: string().nonempty("Author name is required"),
    articleName: string().nonempty("Article name is required"),
    publicationName: string().nonempty("Publication name is required"),
    attachmentCaption: string(),
    notes: string(),
  });

  console.log(currentPublication);

  type publicationInput = TypeOf<typeof publicationSchema>;
  const {
    register,
    formState: { errors },
    reset,
    control,
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
    mutationFn: (data) =>
      currentPublication
        ? axiosAuth.post(`/publication/update`, data)
        : axiosAuth.post(`/publication/add`, data),
    onSuccess: () => {
      setOpen(false);
      // toast.success(
      //   `Publication ${currentPublication ? "updated" : "added"} successfully.`,
      // );
      reset();
      router.replace(router.asPath);
    },
    onError: (error) => {
      const errorMessage =
        // @ts-ignore
        error.response?.data?.message ||
        `An error occurred while ${
          currentPublication ? "updating" : "adding"
        } the exhibition.`;
      toast.error(errorMessage);
    },
  });

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPublicationDoc(reader.result);
      setDocName(file?.name);
      console.log(file);
    }.bind(this);
    console.log(url); // Would see a path?
  };

  const onSubmitHandler: SubmitHandler<publicationInput> = async (values) => {
    const formData = new FormData();

    formData.append("attachment", publicationDoc);
    formData.append("artPieceId", artpieceId);
    formData.append("authorName", values.authorName);
    formData.append("articleName", values.articleName);
    formData.append("publicationName", values.publicationName);
    formData.append("attachmentCaption", values.attachmentCaption);
    formData.append("notes", values.notes);
    currentPublication &&
      formData.append("publicationId", currentPublication?._id);

    // @ts-ignore
    submit(formData);
  };

  useEffect(() => {
    // Set default values for form fields when publication prop changes
    setValue("authorName", currentPublication?.authorName || "");
    setValue("articleName", currentPublication?.articleName || "");
    setValue("publicationName", currentPublication?.publicationName || "");
    setValue(
      "attachmentCaption",
      currentPublication?.attachment?.caption || "",
    );
    setValue("notes", currentPublication?.notes || "");
    setDocName(
      currentPublication?.attachment?.url?.split("/")[
        currentPublication?.attachment?.url?.split("/").length - 1
      ],
    );
  }, [currentPublication]);

  return (
    <ArtDetailsAccordionContainer
      onClick={() => setOpen(true)}
      title={"Publications"}
    >
      <>
        {publications?.length > 0 && (
          <PublicationTable
            setOpenDialog={setOpen}
            setCurrentPublication={setCurrentPublication}
            publications={publications}
            artpieceId={artpieceId}
          />
        )}
      </>
      <FormDialogContainer
        onSubmit={handleSubmit(onSubmitHandler)}
        title="Publication"
        open={open}
        isLoading={isLoading}
        handleClose={() => setOpen(false)}
      >
        <></>
        <FormDataComponent
          docName={docName}
          handleUploadClick={handleUploadClick}
          control={control}
          errors={errors}
        />
      </FormDialogContainer>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPiecePublications;

interface FormDataProps {
  errors: FieldErrors<{
    authorName?: string;
    articleName?: string;
    publicationName?: string;
    attachmentCaption?: string;
    notes?: string;
  }>;
  control: Control<
    {
      authorName?: string;
      articleName?: string;
      publicationName?: string;
      attachmentCaption?: string;
      notes?: string;
    },
    any
  >;
  docName: string;
  handleUploadClick: (event: any) => void;
}

const FormDataComponent: React.FC<FormDataProps> = ({
  control,
  errors,
  handleUploadClick,
  docName,
}) => {
  return (
    <div className="py-6 flex-col flex gap-4">
      <div className="flex gap-4 items-center">
        <InputField
          label="Article Title"
          id="articleName"
          placeholder=""
          name="articleName"
          className="w-full"
          inputClassName="bg-secondary-white "
          tabIndex={2}
          aria-required={true}
          fullWidth
          error={!!errors["articleName"]}
          helperText={
            errors["articleName"] ? errors["articleName"].message : ""
          }
          control={control}
        />
        <InputField
          label="Publication Title"
          id="publicationName"
          placeholder=""
          className="w-full"
          name="publicationName"
          inputClassName="bg-secondary-white w-full"
          tabIndex={2}
          aria-required={true}
          fullWidth
          error={!!errors["publicationName"]}
          helperText={
            errors["publicationName"] ? errors["publicationName"].message : ""
          }
          control={control}
        />
      </div>
      <InputField
        label="Author Name"
        id="authorName"
        placeholder=""
        name="authorName"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["authorName"]}
        helperText={errors["authorName"] ? errors["authorName"].message : ""}
        control={control}
      />
      <div className="flex flex-col text-base gap-2">
        <p className="font-semibold">Attachment</p>
        <div className="flex flex-col p-4  gap-3 bg-secondary-white  w-full">
          <p className="text-[19px] leading-[27px] tracking-[-4%]">
            {docName ? docName : "Drag or choose exhibition image to upload"}
          </p>
          <label
            htmlFor="file"
            className="grid place-items-center w-[124px] h-[33px] bg-primary text-[13px] leading-[16px] text-white cursor-pointer"
          >
            Upload
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleUploadClick}
            hidden
          />
        </div>
      </div>
      <InputField
        label="Caption"
        multiline
        id="attachmentCaption"
        placeholder=""
        name="attachmentCaption"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        rows={2}
        aria-required="true"
        fullWidth
        error={!!errors["attachmentCaption"]}
        helperText={
          errors["attachmentCaption"] ? errors["attachmentCaption"].message : ""
        }
        control={control}
      />

      <InputField
        label="Notes"
        multiline
        id="notes"
        placeholder=""
        name="notes"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        rows={4}
        aria-required="true"
        fullWidth
        error={!!errors["notes"]}
        helperText={errors["notes"] ? errors["notes"].message : ""}
        control={control}
      />
    </div>
  );
};
