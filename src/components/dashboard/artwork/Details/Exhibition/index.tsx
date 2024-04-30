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
import SelectField from "@/components/Form/SelectField";
import { FormControlLabel, MenuItem, Switch } from "@mui/material";
import SwitchInput from "@/components/Form/SwitchInput";

interface Props {
  exhibitions: any[];
  artPieceId: string;
}
const ArtPieceExhibition: React.FC<Props> = ({ exhibitions, artPieceId }) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [exhibitionImg, setExhibitionImg] = useState(null);
  const axiosAuth = useAxiosAuth();
  const [currentExhibition, setCurrentExhibition] = useState<any>(null);
  const {
    isLoading,
    error,
    isError,
    isSuccess,
    mutate: submit,
  } = useMutation({
    mutationFn: (data) => axiosAuth.post(`/exhibition/add`, data),
    onSuccess: () => {
      // Close dialog and show success toast
      setOpen(false);
      toast.success("Exhibition added successfully.");
    },
    onError: (error) => {
      // Extract error message and show error toast
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while adding the exhibition.";
      toast.error(errorMessage);
    },
  });

  console.log;

  const exhibitionSchema = object({
    name: string().nonempty("Exhibition name is required"),
    description: string().nonempty("Description is required"),
    type: string().nonempty("Type is required"),
    showingType: string().nonempty("Showing is required"),
    organizerName: string().nonempty("Organizer name is required"),
    organizerLocation: string().nonempty("Organizer location is required"),
    organizerEmail: string().nonempty("Organizer email is required"),
    organizerWebsite: string(),
    organizerPhone: string(),
    startDate: string().nonempty("Start date is required"),
    endDate: string().nonempty("End Date is required"),
    isCirca: boolean().optional(),
  });

  type ExhibitionInput = TypeOf<typeof exhibitionSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
    setValue,
  } = useForm<ExhibitionInput>({
    resolver: zodResolver(exhibitionSchema),
  });

  const onSubmitHandler: SubmitHandler<ExhibitionInput> = async (values) => {
    const formData = new FormData();
    formData.append("image", exhibitionImg);
    formData.append("artPieceId", artPieceId);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("type", values.type);
    formData.append("showingType", values.showingType);
    formData.append("organizerName", values.organizerName);
    formData.append("organizerLocation", values.organizerLocation);
    formData.append("organizerWebsite", values.organizerWebsite);
    formData.append("organizerEmail", values.organizerEmail);
    formData.append("organizerPhone", values.organizerPhone);
    currentExhibition &&
      formData.append("exhibitionId", currentExhibition?._id);

    submit(formData);
  };

  console.log(errors);

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setExhibitionImg(reader.result);
    }.bind(this);
  };

  return (
    <ArtDetailsAccordionContainer
      onClick={() => setOpen(true)}
      title={"Exhibition"}
    >
      <></>

      <FormDialogContainer
        onSubmit={handleSubmit(onSubmitHandler)}
        title="Exhibition"
        open={open}
        isLoading={isLoading}
        handleClose={() => setOpen(false)}
      >
        <FormDataComponent
          exhibitionImg={exhibitionImg}
          handleUploadClick={handleUploadClick}
          control={control}
          errors={errors}
          // exhibitions={[]}
        />
      </FormDialogContainer>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPieceExhibition;

interface FormDataProps {
  errors: FieldErrors<{
    name?: string;
    description?: string;
    type?: string;
    showingType?: string;
    organizerName?: string;
    organizerLocation?: string;
    organizerEmail?: string;
    organizerWebsite?: string;
    organizerPhone?: string;
    startDate?: string;
    endDate?: string;
    isCirca?: boolean;
  }>;
  control: Control<
    {
      name?: string;
      description?: string;
      type?: string;
      showingType?: string;
      organizerName?: string;
      organizerLocation?: string;
      organizerEmail?: string;
      organizerWebsite?: string;
      organizerPhone?: string;
      startDate?: string;
      endDate?: string;
      isCirca?: boolean;
    },
    any
  >;
  exhibitionImg: any;
  handleUploadClick: (event: any) => void;
}
const FormDataComponent: React.FC<FormDataProps> = ({
  errors,
  control,
  exhibitionImg,
  handleUploadClick,
}) => {
  return (
    <div className="py-6 flex-col flex gap-4">
      <div className="flex gap-4 items-start">
        <div className="w-[166px] relative h-[193px] bg-secondary-white">
          {exhibitionImg && (
            <Image src={exhibitionImg} alt="" className="object-cover" fill />
          )}
        </div>
        <div className="flex flex-col gap-3 max-w-[256px] w-full">
          <p className="text-[19px] leading-[27px] tracking-[-4%]">
            Drag or choose exhibition image to upload
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
        label="Name"
        id="name"
        placeholder=""
        name="name"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["name"]}
        helperText={errors["name"] ? errors["name"].message : ""}
        control={control}
      />
      <InputField
        label="Description"
        multiline
        id="description"
        placeholder=""
        name="description"
        inputClassName="bg-secondary-white"
        tabIndex={2}
        rows={4}
        aria-required="true"
        fullWidth
        error={!!errors["description"]}
        helperText={errors["description"] ? errors["description"].message : ""}
        control={control}
      />
      <div className="flex gap-4 items-center">
        <SelectField
          label="Showing Type"
          name="showingType"
          control={control}
          fullWidth
          helperText={
            errors["showingType"] ? errors["showingType"].message : ""
          }
          error={!!errors["showingType"]}
        >
          <MenuItem disabled selected>
            Select
          </MenuItem>
          <MenuItem value="solo">Solo</MenuItem>
          <MenuItem value="group">Group</MenuItem>
        </SelectField>
        <SelectField
          label="Type"
          name="type"
          control={control}
          fullWidth
          helperText={errors["type"] ? errors["type"].message : ""}
          error={!!errors["type"]}
        >
          <MenuItem>Select</MenuItem>
          <MenuItem value="exhibition">Exhibition</MenuItem>
          <MenuItem value="competition">Competition</MenuItem>
        </SelectField>
      </div>
      <div className="flex items-start gap-4">
        <DateInput
          id="startDate"
          label="Start Date"
          name="startDate"
          control={control}
          helperText={errors["startDate"] ? errors["startDate"].message : ""}
          error={!!errors["startDate"]}
        />
        <DateInput
          id="endDate"
          label="End Date"
          name="endDate"
          control={control}
          helperText={errors["endDate"] ? errors["endDate"].message : ""}
          error={!!errors["endDate"]}
        />
        <SwitchInput
          label="Is Circa"
          name="isCirca"
          control={control}
          error={!!errors["isCirca"]}
          helperText={errors["isCirca"] ? errors["isCirca"].message : ""}
        />
      </div>

      <h2 className="font-bold  mt-4 text-2xl md:text-[30px] md:leading-[20px]">
        Organizer Info
      </h2>
      <InputField
        label="Organizer Name"
        className="w-full"
        id="organizerName"
        name="organizerName"
        placeholder=""
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["organizerName"]}
        helperText={
          errors["organizerName"] ? errors["organizerName"].message : ""
        }
        control={control}
      />
      <InputField
        label="Location"
        className="w-full"
        id="organizerLocation"
        name="organizerLocation"
        placeholder=""
        inputClassName="bg-secondary-white"
        tabIndex={2}
        aria-required="true"
        fullWidth
        error={!!errors["organizerLocation"]}
        helperText={
          errors["organizerLocation"] ? errors["organizerLocation"].message : ""
        }
        control={control}
      />
      <div className="flex items-start gap-4">
        <InputField
          label="Phone"
          className="w-full"
          id="organizerPhone"
          name="organizerPhone"
          placeholder=""
          inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["organizerPhone"]}
          helperText={
            errors["organizerPhone"] ? errors["organizerPhone"].message : ""
          }
          control={control}
        />
        <InputField
          label="Email"
          className="w-full"
          type="email"
          id="organizerEmail"
          name="organizerEmail"
          placeholder=""
          inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["organizerEmail"]}
          helperText={
            errors["organizerEmail"] ? errors["organizerEmail"].message : ""
          }
          control={control}
        />
        <InputField
          label="Website"
          className="w-full"
          id="organizerWebsite"
          name="organizerWebsite"
          type="url"
          placeholder=""
          inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["organizerWebsite"]}
          helperText={
            errors["organizerWebsite"] ? errors["organizerWebsite"].message : ""
          }
          control={control}
        />
      </div>
    </div>
  );
};
