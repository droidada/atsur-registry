import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
} from "@mui/material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import InputField from "@/components/Form/InputField";
import LoadingButton from "@/components/Form/LoadingButton";
import SelectField from "@/components/Form/SelectField";
import axios from "axios";
import { Dropzone } from "@dropzone-ui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { parsePhoneNumberFromString, isValidNumber } from "libphonenumber-js";
import VerificationFileDroper from "../artwork/Verification/VerificationFileDroper";

interface Props {
  openCreateDialog: boolean;
  setOpenCreateDialog: React.Dispatch<React.SetStateAction<boolean>>;
  organization?: any;
  invitationToken?: any;
}
const CreateOrganizationDialog: React.FC<Props> = ({
  openCreateDialog,
  setOpenCreateDialog,
  organization,
  invitationToken: token,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [phonePrefix, setPhonePrefix] = useState("");
  const [sortedCountries, setSortedCountries] = useState([]);
  const router = useRouter();
  const orgSchema = object({
    name: string().nonempty("Name is required"),
    address: string().nonempty("Address is required"),
    email: string().nonempty("Email is required"),
    country: string().nonempty("Country is required"),
    phone: string(),
    website: string(),
    // type: string(),
  }).superRefine((values, ctx) => {
    if (values.country) {
      const countryCode = sortedCountries.find(
        (country) => country.name === values.country,
      ).code;

      if (!isValidNumber(values.phone, countryCode)) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid phone number",
          path: ["phone"],
        });
      }
    }
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axios.get("https://restcountries.com/v3.1/all?fields=name,cca2,idd"),
    refetchOnWindowFocus: false,
  });
  const [previewImg, setPreviewImg] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      organization && !token
        ? axiosAuth.put(`/org/${organization._id}`, data)
        : axiosAuth.post("/org/add", data),
    onSuccess: async (data) => {
      if (token) {
        const { data: response } = await axiosAuth.post("/invite/accept", {
          token,
          userResponse: "accepted",
          orgId: data?.data?.organization?._id,
        });

        console.log(data);
      }

      toast.success("Organization created successfully");
      reset();
      setOpenCreateDialog(false);
      organization
        ? router.replace(router.asPath)
        : token
        ? router.replace(
            `/dashboard/organizations/${data.data.organization?._id}`,
          )
        : router.push(
            `/dashboard/organizations/${data.data.organization?._id}`,
          );
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  type OrgInput = TypeOf<typeof orgSchema>;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm<OrgInput>({
    resolver: zodResolver(orgSchema),
  });

  useEffect(() => {
    if (countries) {
      const sorted = countries?.data
        ?.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          callingCode:
            country?.idd?.root +
            (country?.idd?.suffixes ? country?.idd?.suffixes[0] : ""),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setSortedCountries(sorted);
    }
  }, [countries]);

  useEffect(() => {
    if (organization) {
      setValue("name", organization.name);
      setValue("address", organization.address);
      setValue("email", organization.email);
      setValue("country", organization.country);
      setValue("phone", organization.phone);
      setValue("website", organization.website);
    }
  }, [organization]);

  const selectedCountry = watch("country");

  console.log(selectedCountry);

  useEffect(() => {
    if (selectedCountry) {
      sortedCountries.find((country) => country.name === selectedCountry)
        ?.callingCode &&
        setValue(
          "phone",
          sortedCountries.find((country) => country.name === selectedCountry)
            ?.callingCode,
        );
    }
  }, [selectedCountry]);

  const onSubmitHandler: SubmitHandler<OrgInput> = async (values) => {
    const formData = new FormData();
    previewImg && formData.append("image", previewImg);
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("country", values.country);
    //   formData.append("type", values.type);
    formData.append("website", values.website);
    // @ts-ignore
    mutate(formData);
  };

  const handleUpload = (files: any) => {
    const fileDoc = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(fileDoc.file);
  };

  return (
    <Dialog
      PaperComponent={Paper}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmitHandler),
        noValidate: true,
        className: "bg-white p-2 max-w-[680px] w-full px-6",
      }}
      maxWidth={"md"}
      open={openCreateDialog}
      onClose={() => setOpenCreateDialog(false)}
    >
      <DialogTitle>Create Organization</DialogTitle>
      <DialogContent className="grid grid-cols-2 gap-4" dividers>
        <VerificationFileDroper
          maxSize={10 * 1024 * 1024}
          desc="Drag and drop your organization logo to upload PNG, JPEG, GIF, or  WEBP (max 10MB)"
          handleUpload={handleUpload}
          className="w-full col-span-2"
          buttonClassName="bg-[#CECDCD]"
          dropzoneClassName="w-full relative h-[162px] "
          accept="image/png, image/jpeg, image/webp"
          previewImage={previewImg || organization?.image}
          isImage={true}
        />

        <InputField
          className=""
          control={control}
          name={`name`}
          label="Name"
          inputClassName="bg-secondary"
          type="text"
          error={!!errors?.name}
          helperText={errors?.name?.message}
        />
        <InputField
          className=""
          control={control}
          name={`email`}
          label="Email"
          inputClassName="bg-secondary"
          disabled={token ? true : false}
          type="email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <InputField
          className=""
          control={control}
          name={`address`}
          label="Address"
          inputClassName="bg-secondary"
          type="text"
          error={!!errors?.address}
          helperText={errors?.address?.message}
        />


        <SelectField
          control={control}
          name="country"
          // @ts-ignore
          sx={{
            "& fieldset": { border: "none", backgroundColor: "#D9D9D9" },
            borderColor: "black",
          }}
          label="Country"
          fullWidth
          error={!!errors?.country}
          helperText={errors?.country?.message}
        >
          <MenuItem selected value={""} disabled>
            Select a country
          </MenuItem>

          {sortedCountries?.length > 0 &&
            sortedCountries?.map((country) => (
              <MenuItem key={country.code} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
        </SelectField>
        <InputField
          className=""
          control={control}
          name={`phone`}
          label="Phone Number"
          inputClassName="bg-secondary"
          type="text"
          error={!!errors?.phone}
          helperText={errors?.phone?.message}
        />
        <InputField
          className=""
          control={control}
          name={`website`}
          label="Website"
          inputClassName="bg-secondary"
          type="url"
          error={!!errors?.website}
          helperText={errors?.website?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => !isLoading && setOpenCreateDialog(false)}
        >
          Close
        </Button>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          className="bg-primary"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrganizationDialog;
