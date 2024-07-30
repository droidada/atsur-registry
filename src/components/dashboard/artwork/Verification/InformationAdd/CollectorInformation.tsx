import React, { useEffect, useState } from "react";
import FormContainer from "./formContainer";
import SelectField from "@/components/Form/SelectField";
import { Button, MenuItem } from "@mui/material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useRouter } from "next/router";
import { object, string, number, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import DateInput from "@/components/Form/DateInput";
import SwitchInput from "@/components/Form/SwitchInput";
import SelectOrganization from "@/components/dashboard/SeleteOrganization";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import { FaFile } from "react-icons/fa";
import InputField from "@/components/Form/InputField";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";
import InviteUsers from "@/components/dashboard/InviteUsers";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
}
const CollectorInformation: React.FC<Props> = ({
  setActiveIndex,
  defaultValues,
  artpieceId,
}) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [selectedOrganization, setSelectedOrganization] =
    React.useState<any>(null);
  const [file, setFile] = React.useState<any>(null);
  const [defaultFile, setDefaultFile] = useState<{
    filename: string;
    fileUrl: string;
  }>(null);
  const axiosFetch = useAxiosAuth();
  const toast = useToast();
  const [currentSubmitType, setCurrentSubmitType] = React.useState<
    "save" | "publish"
  >(null);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const [artist, setArtist] = useState<{
    firstName: string;
    lasName: string;
    email: string;
    _id?: string;
  }>();

  const metadataSchema = object({
    date: string().nonempty("Date is required"),
    acquisitionType: string().nonempty("Acquisition type is required"),
    acquisitionPurpose: string().nonempty("Acquisition purpose is required"),
    methodOfPurchase: string().nonempty("Method purchase is required"),
    acquisitionDocumentCaption: string().optional(),
    isCirca: boolean().optional(),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    watch,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      setValue("date", defaultValues?.date);
      setValue("acquisitionType", defaultValues?.type);
      setValue("acquisitionPurpose", defaultValues?.purpose);
      setValue("methodOfPurchase", defaultValues?.methodOfPurchase);
      setValue("acquisitionDocumentCaption", defaultValues?.attachmentCaption);
      setValue("isCirca", defaultValues?.isCirca);
      setDefaultFile({
        filename: defaultValues?.attachment?.split("/").pop(),
        fileUrl: defaultValues?.attachment,
      });
      setSelectedOrganization(defaultValues?.organization?.orgInfo);
    }
  }, [defaultValues]);

  const methodOfPurchase = watch("methodOfPurchase");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (values: any) =>
      axiosFetch.post(`/verify-artpiece/collector/${artpieceId}`, values),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
    onSuccess: () => {
      if (currentSubmitType === "save") {
        toast.success("Data saved successfully");
        router.replace(router.asPath);
      } else {
        toast.success("Data published successfully");
        router.replace(router.asPath);
      }
    },
  });

  const onSubmit: SubmitHandler<MetadataInput> = async (values, event) => {
    // @ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save = buttonClicked === "save" ? true : false;

    if (!artist) {
      toast.error("Please select an artist");
      return;
    }

    setCurrentSubmitType(buttonClicked);

    const formData = new FormData();
    formData.append("save", JSON.stringify(save));
    formData.append("date", values.date);
    // acquisitionDocument &&
    //   formData.append("acquisitionDocument", acquisitionDocument);
    formData.append("acquisitioPurpose", values.acquisitionPurpose);
    formData.append("methodOfPurchase", methodOfPurchase);
    formData.append(
      "acquisitionDocumentCaption",
      values.acquisitionDocumentCaption || "",
    );
    formData.append("aquisitionType", values.acquisitionType);
    formData.append("organization", selectedOrganization?._id || "");
    // @ts-ignore
    values.isCirca && formData.append("isCirca", values.isCirca);

    file && formData.append("acquisitionDocument", file);
    formData.append("artist", JSON.stringify(artist) || "");

    mutate(formData);
  };

  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Collector Information"
      onSubmit={handleSubmit(onSubmit)}
      saveIsLoading={currentSubmitType === "save" && isLoading}
      publishIsLoading={currentSubmitType === "publish" && isLoading}
    >
      <div className="grid md:grid-cols-2 gap-4">
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
            label="Is Circa"
            name="isCirca"
            labelClassName="text-sm font-[400]  leading-[16px]"
            control={control}
            error={!!errors["isCirca"]}
            helperText={errors["isCirca"] ? errors["isCirca"].message : ""}
          />
        </div>
        {/* <SelectOrganization
          // isUserOrg
          labelClassName="text-sm font-[400]  leading-[16px"
          label=" Organization"
          className="col-span-2 my-3"
          selectedOrg={selectedOrganization}
          setSelectedOrg={setSelectedOrganization}
        /> */}
        <SelectField
          labelClassName={"text-sm font-[300] leading-[20px]"}
          label="Acquisition Type"
          name="acquisitionType"
          selectClassName="bg-secondary"
          control={control}
          fullWidth
          helperText={
            errors["acquisitionType"] ? errors["acquisitionType"].message : ""
          }
          error={!!errors["acquisitionType"]}
        >
          {[
            { name: "direct", value: "Directly from the artist" },
            {
              name: "broker",
              value: "From a gallery or representative of the artist",
            },
            { name: "auction", value: "From an auction" },
            { name: "donation", value: "It was donated" },
            { name: "inheritance", value: "You inherited the art piece" },
            { name: "gift", value: "It was gifted to the institution" },
            {
              name: "salvage",
              value: "It was salvaged and restored from being discarded",
            },
            { name: "other", value: "Another option not listed above" },
          ].map((item) => (
            <MenuItem
              key={item.name}
              value={item.value}
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
        <SelectField
          labelClassName={"text-sm font-[400]  leading-[16px]"}
          className="col-span-2"
          label="Method of Purchase"
          name="methodOfPurchase"
          selectClassName="bg-secondary  capitalize"
          control={control}
          fullWidth
          helperText={
            errors["methodOfPurchase"] ? errors["methodOfPurchase"].message : ""
          }
          error={!!errors["methodOfPurchase"]}
        >
          <MenuItem value="" disabled selected>
            How did you purchase the artpiece?
          </MenuItem>
          {["organization", "individual"].map((item) => (
            <MenuItem
              key={item}
              value={item}
              className="text-xm capitalize bg-secondary"
            >
              {item}
            </MenuItem>
          ))}
        </SelectField>

        {methodOfPurchase === "organization" && (
          <SelectOrganization
            isUserOrg
            className="col-span-2"
            label="Organization"
            selectedOrg={selectedOrganization}
            setSelectedOrg={setSelectedOrganization}
          />
        )}

        <InviteUsers
          labelClassName="text-sm font-[400] leading-[16px"
          label="Artist"
          className="mt-4 col-span-2 "
          selectedUsers={artist}
          setSelectedUsers={setArtist}
        />
        <div className="col-span-2 mt-4 flex gap-4 justify-between">
          <FileDropZone
            file={file}
            defaultFile={defaultFile}
            setFile={setFile}
          />
          <InputField
            label="Acquisition Document Caption"
            id="acquisitionDocumentCaption"
            placeholder=""
            name="acquisitionDocumentCaption"
            tabIndex={2}
            labelClassName="font-[400]"
            inputClassName="bg-secondary-white w-full h-[141px] "
            multiline
            rows={3}
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
      </div>
    </FormContainer>
  );
};

export default CollectorInformation;

interface FileDropZoneProps {
  file: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  defaultFile?: {
    filename: string;
    fileUrl: string;
  };
}
const FileDropZone: React.FC<FileDropZoneProps> = ({
  file,
  setFile,
  defaultFile,
}) => {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  console.log(defaultFile);

  const handleChange = (currentFiles: any) => {
    if (currentFiles && currentFiles.length > 0) {
      const fileDoc = currentFiles[0];
      const reader = new FileReader();

      console.log(fileDoc);

      reader.onload = (e) => {
        console.log("E don reach here");
        setFile(e.target.result);
      };

      setFileName(fileDoc.name);
      setFileExtension(fileDoc.type);

      console.log("see am", fileDoc);

      if (fileDoc.file instanceof Blob) {
        console.log("Na here we de");
        reader.readAsDataURL(fileDoc.file);
      } else {
        console.error("The selected file is not a valid Blob.");
      }
    } else {
      console.error("No file selected.");
    }
  };
  return (
    <div className="w-2/3 flex flex-col gap-4">
      <label className="text-sm font-[400]  leading-[16px]" htmlFor="">
        Acquisition Document
      </label>
      <Dropzone
        maxFileSize={10 * 1024 * 1024}
        label={
          fileName || defaultFile?.filename
            ? `${fileName || defaultFile?.filename} `
            : `Drag or choose your file to upload PNG, JPEG, GIF, WEBP, or
                    MP4 (Max 10MB)`
        }
        footer={false}
        header={false}
        accept="image/*, video/*, application/pdf"
        className="p-4 h-full border-none border-secondary rounded-none bg-secondary-white gap-4 text-xs leading-[16px] flex flex-col items-center justify-center"
        maxFiles={1}
        onChange={handleChange}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          {fileName || defaultFile?.filename ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <FaFile size={24} />
              <p> {fileName || defaultFile?.filename} </p>
            </div>
          ) : (
            `Drag or choose your file to upload PNG, JPEG, GIF, WEBP, or
                    MP4 (Max 10MB)`
          )}
          <label
            htmlFor="attachment2"
            className="w-[114.8px] flex flex-col items-center justify-center h-[30.3px] bg-secondary text-xs leading-[16px]"
          >
            Browse File
          </label>{" "}
        </div>
        {/* <FileMosaic file={file} className="w-full h-full" /> */}
      </Dropzone>
    </div>
  );
};
