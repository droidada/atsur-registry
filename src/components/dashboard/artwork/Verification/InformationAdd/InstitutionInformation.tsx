import React, { useEffect, useState } from "react";
import FormContainer from "./formContainer";
import { useRouter } from "next/router";
import { object, string, number, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import DateInput from "@/components/Form/DateInput";
import SwitchInput from "@/components/Form/SwitchInput";
import { MenuItem } from "@mui/material";
import SelectField from "@/components/Form/SelectField";
import { useToast } from "@/providers/ToastProvider";
import SelectOrganization from "@/components/dashboard/SeleteOrganization";
import InputField from "@/components/Form/InputField";
import VerificationFileDroper from "../VerificationFileDroper";
import { useMutation } from "@tanstack/react-query";
import InviteUsers from "@/components/dashboard/InviteUsers";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
}
const InstitutionInformation = ({
  setActiveIndex,
  defaultValues,
  artpieceId,
}) => {
  const axiosFetch = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();
  const [artist, setArtist] = useState<{
    firstName: string;
    lasName: string;
    email: string;
    _id?: string;
  }>();
  const [selectedOrganization, setSelectedOrganization] =
    React.useState<any>(null);

  const [myOrganization, setMyOrganization] = React.useState<any>(null);
  const [file, setFile] = useState<{
    filename: string;
    fileUrl: any;
  }>({
    filename: "",
    fileUrl: "",
  });
  const [defaultFile, setDefaultFile] = useState<{
    filename: string;
    fileUrl: any;
  }>(null);
  const [currentSubmitType, setCurrentSubmitType] = React.useState<
    "save" | "publish"
  >(null);

  const metadataSchema = object({
    date: string().nonempty("Date is required"),
    acquisitionType: string().nonempty("Channel is required"),
    acquisitionPurpose: string().nonempty(),
    isCirca: boolean().optional().default(false),
    boughtFromOrganization: boolean().optional().default(false),
    acquisitionDocumentCaption: string().optional(),
    // methodOfPurchase: string().nonempty("Method purchase is required"),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const handleUpload = (currentFiles: any) => {
    if (currentFiles && currentFiles.length > 0) {
      const fileDoc = currentFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        console.log(e.target?.result);
        setFile({
          filename: fileDoc.name,
          fileUrl: e.target?.result,
        });
      };

      if (fileDoc.file instanceof Blob) {
        reader.readAsDataURL(fileDoc.file);
      }
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (values: any) =>
      axiosFetch.post(`/verify-artpiece/institution/${artpieceId}`, values),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
    onSuccess: () => {
      if (currentSubmitType === "save") {
        // toast.success("Data saved successfully");
        router.replace(router.asPath);
        // setActiveIndex((prevIndex) => prevIndex + 1);
      } else {
        // toast.success("Data published successfully");
        router.replace(router.asPath);
      }
    },
  });

  useEffect(() => {
    if (defaultValues) {
      console.log(defaultValues);
      setValue("date", defaultValues?.acquisition?.date);
      setValue("acquisitionType", defaultValues?.acquisition?.type);
      setValue("acquisitionPurpose", defaultValues?.acquisition?.purpose);
      setValue(
        "boughtFromOrganization",
        defaultValues?.acquisition.method === "organization" ? true : false,
      );
      setValue("acquisitionDocumentCaption", defaultValues?.attachmentCaption);
      setValue("isCirca", defaultValues?.isCirca);
      setDefaultFile({
        filename: defaultValues?.attachment?.split("/").pop(),
        fileUrl: defaultValues?.attachment,
      });
      // setValue("methodOfPurchase", defaultValues?.methodOfPurchase);

      setMyOrganization(defaultValues?.organization);
      console.log(
        defaultValues?.acquisition?.acquiredFromOrganization?.orgInfo,
      );
      setSelectedOrganization(
        defaultValues?.acquisition?.acquiredFromOrganization?.orgInfo,
      );
      setArtist(defaultValues?.artist?.artistInfo);
    }
  }, [defaultValues]);

  console.log(selectedOrganization);

  const onSubmit: SubmitHandler<MetadataInput> = async (values, event) => {
    //@ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save = buttonClicked === "save" ? true : false;

    setCurrentSubmitType(buttonClicked);

    if (values.boughtFromOrganization === true && !selectedOrganization) {
      toast.error("Please select an organization");
      return;
    }

    const formData = new FormData();
    formData.append("save", JSON.stringify(save));
    formData.append("date", values.date);
    formData.append(
      "acquiredFromOrganization",
      JSON.stringify(selectedOrganization),
    );
    formData.append("acquisitionPurpose", values.acquisitionPurpose);
    formData.append("acquisitionType", values.acquisitionType);
    selectedOrganization &&
      // formData.append(
      //   "acquiredFromOrganization",
      //   JSON.stringify(selectedOrganization) || "",
      // );
      formData.append("isCirca", JSON.stringify(values.isCirca));
    values.acquisitionDocumentCaption &&
      formData.append(
        "acquisitionDocumentCaption",
        values.acquisitionDocumentCaption,
      );
    formData.append(
      "method",
      values.boughtFromOrganization ? "organization" : "individual",
    );
    formData.append("artist", JSON.stringify(artist));
    formData.append("organization", myOrganization._id || "");

    formData.append("acquisitionDocument", file.fileUrl);

    mutate(formData);
  };

  const boughtFromOrganization = watch("boughtFromOrganization");

  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      onSubmit={handleSubmit(onSubmit)}
      saveIsLoading={currentSubmitType === "save" && isLoading}
      publishIsLoading={currentSubmitType === "publish" && isLoading}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex gap-2 col-span-2 mb-4 items-center">
          <SelectOrganization
            isUserOrg
            className="col-span-2 "
            label="Tell us more about your Organization"
            selectedOrg={myOrganization}
            setSelectedOrg={setMyOrganization}
          />
        </div>
        <div className="flex gap-2 col-span-2 items-center">
          <DateInput
            labelClassName="text-sm font-[400]  leading-[16px]"
            id="date"
            label="Date of Acquisition"
            name="date"
            className="flex-1"
            control={control}
            helperText={errors["date"] ? errors["date"].message : ""}
            error={!!errors["date"]}
            maxDate={new Date().toDateString()}
          />
          <SwitchInput
            label="Is Circa?"
            name="isCirca"
            labelClassName="text-sm font-[400]  leading-[16px]"
            control={control}
            error={!!errors["isCirca"]}
            helperText={errors["isCirca"] ? errors["isCirca"].message : ""}
          />
        </div>
        <SelectField
          labelClassName={"text-sm font-[400]  leading-[16px]"}
          label="Acquisition Type"
          name="acquisitionType"
          selectClassName="bg-secondary capitalize"
          control={control}
          fullWidth
          helperText={
            errors["acquisitionType"] ? errors["acquisitionType"].message : ""
          }
          error={!!errors["acquisitionType"]}
        >
          {[
            { name: "direct", value: "directly from the artist" },
            {
              name: "broker",
              value: "from a gallery or representative of the artist",
            },
            { name: "auction", value: "from an auction" },
            { name: "donation", value: "it was donated" },
            { name: "inheritance", value: "you inherited the artwork" },
            { name: "gift", value: "it was gifted to the institution" },
            {
              name: "salvage",
              value: "it was salvaged and restored from being discarded",
            },
            { name: "other", value: "another option not listed above" },
          ].map((item) => (
            <MenuItem
              key={item.name}
              value={item.name}
              className="text-xm capitalize bg-secondary"
            >
              {item.value}
            </MenuItem>
          ))}
        </SelectField>
        <SelectField
          labelClassName={"text-sm font-[400]  leading-[16px] capitalize"}
          label="Acquisition Purpose"
          name="acquisitionPurpose"
          selectClassName="bg-secondary capitalize"
          control={control}
          fullWidth
          helperText={
            errors["acquisitionPurpose"]
              ? errors["acquisitionPurpose"].message
              : ""
          }
          error={!!errors["acquisitionPurpose"]}
        >
          {[
            "sale",
            "resale",
            "investment",
            "donation",
            "showcase",
            "gift",
            "other",
          ].map((item) => (
            <MenuItem
              key={item}
              value={item}
              className="text-xm capitalize bg-secondary"
            >
              {item}
            </MenuItem>
          ))}
        </SelectField>
        <SwitchInput
          label="Did you acquire from an organization?"
          className="w-fit"
          name="boughtFromOrganization"
          labelClassName="text-sm font-[400]  leading-[16px]"
          control={control}
          error={!!errors["boughtFromOrganization"]}
          helperText={
            errors["boughtFromOrganization"]
              ? errors["boughtFromOrganization"].message
              : ""
          }
        />
        {boughtFromOrganization === true && (
          <SelectOrganization
            className=""
            label="Please add the organization"
            selectedOrg={selectedOrganization}
            setSelectedOrg={setSelectedOrganization}
          />
        )}
      </div>
      <InviteUsers
        labelClassName="text-sm font-[400] leading-[16px"
        label="Who is the Artist?"
        placeholder="Type to search for the artist"
        className="mt-4 col-span-2 "
        selectedUsers={artist}
        setSelectedUsers={setArtist}
      />

      <div className="col-span-2 mt-8 gap-4 justify-between">
        <VerificationFileDroper
          label="Acquisition Document"
          fileName={file.filename}
          defaultFile={defaultFile}
          handleUpload={handleUpload}
        />
        <InputField
          label="Acquisition Document Caption"
          id="acquisitionDocumentCaption"
          placeholder=""
          name="acquisitionDocumentCaption"
          tabIndex={2}
          labelClassName="font-[400]"
          inputClassName="bg-secondary-white w-full "
          aria-required={true}
          fullWidth
          error={!!errors["acquisitionDocumentCaption"]}
          helperText={
            errors["acquisitionDocumentCaption"]
              ? errors["acquisitionDocumentCaption"].message
              : ""
          }
          control={control}
        />
      </div>
    </FormContainer>
  );
};

export default InstitutionInformation;
