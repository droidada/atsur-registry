import React, { useEffect, useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";
import FormDialogContainer from "../FormDialogContainer";
import { object, string, TypeOf, boolean, ZodVoidDef, array } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Control,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { useToast } from "@/providers/ToastProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import InputField from "@/components/Form/InputField";
import DateInput from "@/components/Form/DateInput";
import SelectField from "@/components/Form/SelectField";
import {
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
} from "@mui/material";
import SwitchInput from "@/components/Form/SwitchInput";
import CompetitionTable from "./CompetitionTable";
import { useRouter } from "next/router";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";

interface Props {
  competitions: any[];
  artPieceId: string;
}
const ArtPieceCompetition: React.FC<Props> = ({ competitions, artPieceId }) => {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const [competitionImg, setCompetitionImg] = useState(null);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [currentCompetition, setCurrentCompetition] = useState<any>(null);

  const jurorSchema = object({
    name: string().nonempty({ message: "Juror name is required" }),
    phone: string().nonempty({ message: "Juror phone number is required" }),
    email: string()
      .email({ message: "Email must be valid" })
      .nonempty({ message: "Email is required" }),
  });

  const curatorSchema = object({
    name: string().nonempty({ message: "Curator name is required" }),
    phone: string().nonempty({ message: "Curator phone number is required" }),
    email: string()
      .email({ message: "Email must be valid" })
      .nonempty({ message: "Email is required" }),
  });

  const competitionSchema = object({
    name: string().nonempty("competition name is required"),
    description: string().nonempty("Description is required"),
    type: string().nonempty("Type is required"),
    showingType: string().nonempty("Showing is required"),
    organizerName: string().nonempty("Organizer name is required"),
    organizerEmail: string().nonempty("Organizer email is required"),
    organizerWebsite: string(),
    organizerPhone: string(),
    startDate: string().nonempty("Start date is required"),
    endDate: string().nonempty("End Date is required"),
    isCirca: boolean().optional(),
    locationAddress: string().optional(),
    locationCountry: string().optional(),
    jurors: array(jurorSchema),
    curators: array(curatorSchema),
  });

  type competitionInput = TypeOf<typeof competitionSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm<competitionInput>({
    resolver: zodResolver(competitionSchema),
    defaultValues: {
      jurors: [{ name: "", phone: "", email: "" }],
      curators: [{ name: "", phone: "", email: "" }],
    },
  });

  const {
    isLoading,
    error,
    isError,
    isSuccess,
    mutate: submit,
  } = useMutation({
    mutationFn: (data) =>
      currentCompetition
        ? axiosAuth.post(`/competition/update`, data)
        : axiosAuth.post(`/competition/add`, data),
    onSuccess: () => {
      reset();
      setOpen(false);

      toast.success(
        `competition ${currentCompetition ? "updated" : "added"}  successfully.`,
      );

      router.replace(router.asPath);
    },
    onError: (error) => {
      const errorMessage =
        // @ts-ignore
        error.response?.data?.message ||
        `An error occurred while ${
          currentCompetition ? "updating" : "adding"
        } the competition.`;
      toast.error(errorMessage);
    },
  });

  const onSubmitHandler: SubmitHandler<competitionInput> = async (values) => {
    const formData = new FormData();
    formData.append("image", competitionImg);
    formData.append("artPieceId", artPieceId);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("type", values.type);
    formData.append("showingType", values.showingType);
    formData.append("organizerName", values.organizerName);
    formData.append("organizerWebsite", values.organizerWebsite);
    formData.append("organizerEmail", values.organizerEmail);
    formData.append("organizerPhone", values.organizerPhone);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("jurors", JSON.stringify(values.jurors));
    formData.append("curators", JSON.stringify(values.curators));
    currentCompetition &&
      formData.append("competitionId", currentCompetition?._id);

    // @ts-ignore
    submit(formData);
  };

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setCompetitionImg(reader.result);
    }.bind(this);
  };

  useEffect(() => {
    setValue("name", currentCompetition?.name || "");
    setValue("description", currentCompetition?.description || "");
    setValue("type", currentCompetition?.type || "");
    setValue("showingType", currentCompetition?.showingType || "");
    setValue("organizerName", currentCompetition?.organizer?.name || "");
    // setValue("organizerLocation", currentCompetition?.organizerLocation || "");
    setValue("organizerWebsite", currentCompetition?.organizer?.website || "");
    setValue("organizerEmail", currentCompetition?.organizer?.email || "");
    setValue("organizerPhone", currentCompetition?.organizer?.phone || "");
    setValue("startDate", currentCompetition?.date?.startDate || "");
    setValue("endDate", currentCompetition?.date?.endDate || "");
    setValue("isCirca", currentCompetition?.date?.isCirca || false);
  }, [currentCompetition]);

  return (
    <ArtDetailsAccordionContainer
      onClick={() => setOpen(true)}
      title={"Competitions"}
    >
      <>
        {competitions?.length > 0 && (
          <CompetitionTable
            setOpenDialog={setOpen}
            setCurrentCompetition={setCurrentCompetition}
            competitions={competitions}
            artpieceId={artPieceId}
          />
        )}
      </>

      <FormDialogContainer
        onSubmit={handleSubmit(onSubmitHandler)}
        title="competition"
        open={open}
        isLoading={isLoading}
        handleClose={() => {
          setCurrentCompetition(null);
          setOpen(false);
        }}
      >
        <FormDataComponent
          competitionImg={competitionImg}
          handleUploadClick={handleUploadClick}
          control={control}
          errors={errors}
          // competitions={[]}
        />
      </FormDialogContainer>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPieceCompetition;

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
  competitionImg: any;
  handleUploadClick: (event: any) => void;
}
const FormDataComponent: React.FC<FormDataProps> = ({
  errors,
  control,
  competitionImg,
  handleUploadClick,
}) => {
  return (
    <div className="py-6 flex-col flex gap-4">
      <div className="flex gap-4 items-start">
        <div className="w-[166px] relative h-[193px] bg-secondary-white">
          {competitionImg && (
            <Image src={competitionImg} alt="" className="object-cover" fill />
          )}
        </div>
        <div className="flex flex-col gap-3 max-w-[256px] w-full">
          <p className="text-[19px] leading-[27px] tracking-[-4%]">
            Drag or choose competition image to upload
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
          <MenuItem value="competition">competition</MenuItem>
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

      <div>
        <h2 className="font-bold  my-4 text-2xl md:text-[30px] md:leading-[20px]">
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
            errors["organizerLocation"]
              ? errors["organizerLocation"].message
              : ""
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
              errors["organizerWebsite"]
                ? errors["organizerWebsite"].message
                : ""
            }
            control={control}
          />
        </div>
      </div>

      <PeopleFields
        title="Jurors"
        name="jurors"
        errors={errors}
        control={control}
      />
      <PeopleFields
        title="Curators"
        name="curators"
        errors={errors}
        control={control}
      />
    </div>
  );
};

interface PeopleFieldsProps {
  control: Control;
  name: string;
  title: string;
  errors: any;
}

const PeopleFields: React.FC<PeopleFieldsProps> = ({
  title,
  name,
  errors,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold  my-4 text-2xl md:text-[30px] md:leading-[20px]">
        {title}
      </h2>
      <div className="flex flex-col gap-4">
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="grid grid-cols-2 flex-1 gap-4">
              <InputField
                control={control}
                name={`${name}.${index}.name`}
                label="Name"
                inputClassName="bg-secondary-white"
                error={!!errors?.[index]?.name}
                helperText={errors?.[index]?.name?.message}
              />
              <InputField
                control={control}
                name={`${name}.${index}.phone`}
                label="Phone"
                inputClassName="bg-secondary-white"
                error={!!errors?.[index]?.phone}
                helperText={errors?.[index]?.phone?.message}
              />
              <InputField
                className="col-span-2"
                control={control}
                name={`${name}.${index}.email`}
                label="Email"
                inputClassName="bg-secondary-white"
                type="email"
                error={!!errors?.[index]?.email}
                helperText={errors?.[index]?.email?.message}
              />
            </div>
            <IconButton
              className="bg-secondary"
              type="button"
              onClick={() => remove(index)}
            >
              <MdOutlineRemoveCircleOutline />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        startIcon={<MdAddCircleOutline />}
        type="button"
        className="bg-secondary text-xs font-[300]"
        onClick={() => append({ name: "", phone: "", email: "" })}
      >
        Add {title.slice(0, -1)}{" "}
      </Button>
    </div>
  );
};