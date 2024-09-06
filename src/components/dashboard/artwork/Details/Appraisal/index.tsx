import React, { useEffect, useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";
import FormDialogContainer from "../FormDialogContainer";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors, Control } from "react-hook-form";
import InputField from "@/components/Form/InputField";
import Image from "next/image";
import SelectField from "@/components/Form/SelectField";
import { MenuItem } from "@mui/material";
import AppraisalTable from "./AppraisalTable";

interface Props {
  appraisals: any[];
  artpieceId: string;
}
const ArtPieceAppraisal: React.FC<Props> = ({ appraisals, artpieceId }) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [currentAppraisal, setCurrentAppraisal] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [appraisalImg, setAppraisalImg] = useState(null);

  const appraisalSchema = object({
    appraiser: string().nonempty("Appraiser is required"),
    appraiserEmail: string().nonempty("Appraiser email is required"),
    value: string().nonempty("Value is required"),
    currency: string().nonempty("Currency is required"),
    appraiserWebsite: string(),
    attachmentCaption: string(),
    notes: string(),
  });

  type AppraisalInput = TypeOf<typeof appraisalSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
    setValue,
  } = useForm<AppraisalInput>({
    resolver: zodResolver(appraisalSchema),
  });

  const {
    isLoading,
    error,
    isError,
    isSuccess,
    mutate: submit,
  } = useMutation({
    mutationFn: (data) =>
      currentAppraisal
        ? axiosAuth.post(`/appraisal/update`, data)
        : axiosAuth.post(`/appraisal/add`, data),
    onSuccess: () => {
      setOpen(false);
      // toast.success(
      //   `Appraisal ${currentAppraisal ? "updated" : "added"} successfully.`,
      // );
      reset();
      setAppraisalImg(null);
      router.replace(router.asPath);
    },
    onError: (error) => {
      const errorMessage =
        // @ts-ignore
        error.response?.data?.message ||
        `An error occurred while ${
          currentAppraisal ? "updating" : "adding"
        } the appraisals.`;
      toast.error(errorMessage);
    },
  });

  const onSubmitHandler: SubmitHandler<AppraisalInput> = async (values) => {
    const formData = new FormData();
    formData.append("attachment", appraisalImg);
    formData.append("artPieceId", artpieceId);
    formData.append("appraiser", values.appraiser);
    formData.append("appraiserEmail", values.appraiserEmail);
    formData.append("appraiserWebsite", values.appraiserWebsite);
    formData.append("value", values.value);
    formData.append("currency", values.currency);
    formData.append("attachmentCaption", values.attachmentCaption);
    formData.append("notes", values.notes);
    currentAppraisal && formData.append("appraisalId", currentAppraisal?._id);

    // @ts-ignore
    submit(formData);
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setAppraisalImg(reader.result);
    }.bind(this);
    console.log(url); // Would see a path?
  };

  console.log(currentAppraisal);

  useEffect(() => {
    setValue("appraiser", currentAppraisal?.appraiser || "");
    setValue("appraiserEmail", currentAppraisal?.appraiserEmail || "");
    setValue("appraiserWebsite", currentAppraisal?.appraiserWebsite || "");
    setValue("value", currentAppraisal?.value || "");
    setValue("currency", currentAppraisal?.currency || "");
    setValue("attachmentCaption", currentAppraisal?.attachment?.caption || "");
    setValue("notes", currentAppraisal?.notes || "");
    setAppraisalImg(currentAppraisal?.attachment?.url);
  }, [currentAppraisal]);

  return (
    <ArtDetailsAccordionContainer
      onClick={() => setOpen(true)}
      title={"Appraisals"}
    >
      {appraisals?.length > 0 && (
        <AppraisalTable
          setOpenDialog={setOpen}
          setCurrentAppraisal={setCurrentAppraisal}
          appraisals={appraisals}
          artpieceId={artpieceId}
        />
      )}
      <FormDialogContainer
        onSubmit={handleSubmit(onSubmitHandler)}
        title="Appraiser"
        open={open}
        isLoading={isLoading}
        handleClose={() => {
          setCurrentAppraisal(null);
          setOpen(false);
        }}
      >
        <AppraisalFormData
          handleUploadClick={handleUploadClick}
          appraisalImg={appraisalImg}
          control={control}
          errors={errors}
        />
      </FormDialogContainer>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPieceAppraisal;

interface FormDataProps {
  errors: FieldErrors<{
    appraiser?: string;
    appraiserEmail?: string;
    value?: string;
    currency?: string;
    appraiserWebsite?: string;
    attachmentCaption?: string;
    notes?: string;
  }>;
  control: Control<
    {
      appraiser?: string;
      appraiserEmail?: string;
      value?: string;
      currency?: string;
      appraiserWebsite?: string;
      attachmentCaption?: string;
      notes?: string;
    },
    any
  >;
  appraisalImg: any;
  handleUploadClick: (event: any) => void;
}

const AppraisalFormData: React.FC<FormDataProps> = ({
  control,
  appraisalImg,
  handleUploadClick,
  errors,
}) => {
  return (
    <div className="py-6 flex-col flex gap-4">
      <InputField
        label="Appraiser Name"
        id="appraiser"
        placeholder=""
        name="appraiser"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["appraiser"]}
        helperText={errors["appraiser"] ? errors["appraiser"].message : ""}
        control={control}
      />
      <div className="flex items-start gap-4">
        <InputField
          label="Appraiser Email"
          className="w-full"
          type="email"
          id="appraiserEmail"
          name="appraiserEmail"
          placeholder=""
          inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["appraiserEmail"]}
          helperText={
            errors["appraiserEmail"] ? errors["appraiserEmail"].message : ""
          }
          control={control}
        />
        <InputField
          label="Appraiser Website"
          className="w-full"
          id="appraiserWebsite"
          name="appraiserWebsite"
          type="url"
          placeholder=""
          inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["appraiserWebsite"]}
          helperText={
            errors["appraiserWebsite"] ? errors["appraiserWebsite"].message : ""
          }
          control={control}
        />
      </div>
      <div className="flex gap-4 items-start">
        <div className="w-[166px] relative h-[193px] bg-secondary-white">
          {appraisalImg && (
            <Image src={appraisalImg} alt="" className="object-cover" fill />
          )}
        </div>
        <div className="flex flex-col gap-3 max-w-[256px] w-full">
          <p className="text-[19px] leading-[27px] tracking-[-4%]">
            Drag or choose Appraiser Document to upload
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
            accept="image/*, application/pdf"
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
        rows={4}
        aria-required="true"
        fullWidth
        error={!!errors["attachmentCaption"]}
        helperText={
          errors["attachmentCaption"] ? errors["attachmentCaption"].message : ""
        }
        control={control}
      />
      <div className="flex gap-4 items-center">
        <SelectField
          label="Currency"
          name="currency"
          control={control}
          fullWidth
          helperText={errors["currency"] ? errors["currency"].message : ""}
          error={!!errors["currency"]}
        >
          <MenuItem selected disabled>
            Select
          </MenuItem>
          <MenuItem value="usd">USD</MenuItem>
          <MenuItem value="pounds">Pounds</MenuItem>
        </SelectField>
        <InputField
          label="Value"
          className="w-full"
          id="value"
          placeholder=""
          name="value"
          type="number"
          inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["value"]}
          helperText={errors["value"] ? errors["value"].message : ""}
          control={control}
        />
      </div>
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
