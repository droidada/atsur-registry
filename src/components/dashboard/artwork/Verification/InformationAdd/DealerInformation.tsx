import React, { useEffect, useState } from "react";
import FormContainer from "./formContainer";
import { Stack } from "@mui/material";
import SelectOrganization from "@/components/dashboard/SeleteOrganization";
import CommissionSplit from "@/components/dashboard/CommisionSplit";
import VerificationFileDroper from "../VerificationFileDroper";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { TypeOf, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/components/Form/InputField";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artPieceId: string;
  title?: string;
  isArtistBroker: boolean;
}
const DealerInformation = ({
  setActiveIndex,
  defaultValues,
  artPieceId,
  title = "Broker Information",
  isArtistBroker,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  console.log(isArtistBroker);

  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [percentages, setPercentages] = useState<
    {
      userInfo: {
        firstName: string;
        lastName: string;
        email: string;
        role?: string;
      };
      percentage: number;
    }[]
  >([]);
  const [errorTree, setErrorTree] = useState({});
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [agreementDocument, setAgreementDocument] = useState<{
    filename: string;
    file: any;
  }>(null);
  const [currentSubmitType, setCurrentSubmitType] = React.useState<
    "save" | "publish"
  >(null);

  const metadataSchema = object({
    notes: string().nonempty("notes is required"),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setValue,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      setValue("notes", defaultValues?.notes);
      setSelectedOrganization(defaultValues?.organization);
      // setPercentages(defaultValues?.commission);
      // setSelectedUsers(defaultValues?.users);
    }
  }, [defaultValues]);

  const handleUpload = (files: any) => {
    const fileDoc = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileDoc.file);
    reader.onload = () => {
      setAgreementDocument({
        filename: fileDoc.name,
        file: reader.result,
      });
    };
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      axiosAuth.post(
        `/verify-artpiece/${
          isArtistBroker ? "artist-broker" : "dealer"
        }/${artPieceId}`,
        data,
      ),
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
        // setActiveIndex((prevIndex) => prevIndex + 1);
      } else {
        toast.success("Data published successfully");
        router.replace(router.asPath);
      }
    },
  });

  const onSubmitHandler: SubmitHandler<MetadataInput> = (values, event) => {
    // @ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save = buttonClicked === "save" ? true : false;
    const checkMainArtistRole = percentages.filter(
      (item) => item.userInfo?.role === "main artist",
    );

    if (checkMainArtistRole.length > 1) {
      toast.error(
        "Only one main artist role is allowed, for commission split broker",
      );
      return;
    }

    if (checkMainArtistRole.length === 0) {
      toast.error("Main artist is required for commission split broker");
      return;
    }

    setCurrentSubmitType(buttonClicked);

    if (!agreementDocument?.file && !defaultValues?.agreementAttachment) {
      toast.error("Agreement document is required");
      return;
    }
    if (Object.keys(errorTree).length > 0) {
      toast.error(Object.values(errorTree).join(" "));
      return;
    }
    if (percentages.length === 0) {
      toast.error("Commission split is required");
      return;
    }

    console.log("This is the organization", selectedOrganization);

    const formData = new FormData();
    !defaultValues?.agreementAttachment &&
      formData.append("agreement", agreementDocument?.file);
    formData.append("commission", JSON.stringify(percentages));
    formData.append("save", JSON.stringify(save));
    formData.append("notes", values.notes);
    selectedOrganization &&
      formData.append("organization", selectedOrganization._id);
    formData.append(
      "isArtistBroker",
      JSON.stringify(isArtistBroker ? true : false),
    );
    // @ts-ignore
    mutate(formData);
  };

  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      // title={title ?? "Broker Information"}
      onSubmit={handleSubmit(onSubmitHandler)}
      saveIsLoading={currentSubmitType === "save" && isLoading}
      publishIsLoading={currentSubmitType === "publish" && isLoading}
    >
      <Stack spacing={4}>
        <SelectOrganization
          isUserOrg
          labelClassName="text-sm font-[400]  leading-[16px"
          label="Organization"
          selectedOrg={selectedOrganization}
          setSelectedOrg={setSelectedOrganization}
        />
        <CommissionSplit
          setErrorTree={setErrorTree}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          percentages={percentages}
          setPercentages={setPercentages}
          errorTree={errorTree}
          defaultValues={defaultValues?.collaborators}
        />

        <div className="flex flex-col gap-4 mt-7">
          <label className="font-semibold text-[17px] leading-[17px] ">
            Contract Agreement Document
          </label>
          <VerificationFileDroper
            maxFiles={1}
            label="Agreement Document"
            fileName={
              agreementDocument?.filename ||
              defaultValues?.agreementAttachment?.split("/")?.pop()
            }
            // defaultFile={defaultFile}
            handleUpload={handleUpload}
            className="w-full"
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
      </Stack>
    </FormContainer>
  );
};

export default DealerInformation;
