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
import { useState } from "react";
import Image from "next/image";

interface Props {
  openCreateDialog: boolean;
  setOpenCreateDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateOrganizationDialog: React.FC<Props> = ({
  openCreateDialog,
  setOpenCreateDialog,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const orgSchema = object({
    name: string().nonempty("Name is required"),
    address: string().nonempty("Address is required"),
    email: string().nonempty("Email is required"),
    country: string().nonempty("Country is required"),
    phone: string(),
    website: string(),
    // type: string(),
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axios.get("https://restcountries.com/v3.1/all?fields=name,cca2"),
    refetchOnWindowFocus: false,
  });
  const [previewImg, setPreviewImg] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => axiosAuth.post("/org/add", data),
    onSuccess: (data) => {
      console.log("This is the response", data);
      toast.success("Organization created successfully");
      reset();
      setOpenCreateDialog(false);
      router.push(`/dashboard/organization/${data.data.organization?._id}`);
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });

  type OrgInput = TypeOf<typeof orgSchema>;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm<OrgInput>({
    resolver: zodResolver(orgSchema),
  });

  const onSubmitHandler: SubmitHandler<OrgInput> = async (values) => {
    const formData = new FormData();
    formData.append("image", previewImg);
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("country", values.country);
    //   formData.append("type", values.type);
    formData.append("website", values.website);

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
        <Dropzone
          maxFileSize={10 * 1024 * 1024}
          footer={false}
          header={false}
          accept={"image/*"}
          className="p-4 h-full col-span-2 border-none relative  rounded-none bg-secondary-white gap-4 text-xs leading-[16px] flex flex-col items-center justify-center"
          maxFiles={1}
          onChange={handleUpload}
        >
          <div className="flex flex-col  items-center justify-center">
            {previewImg ? (
              <Image
                alt="preview"
                src={previewImg}
                fill
                className="object-cover"
              />
            ) : (
              "Drag or choose your organization logo to upload PNG, JPEG, GIF, or  WEBP"
            )}
          </div>
        </Dropzone>

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
          type="text"
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

          {countries?.data
            ?.map((country) => ({
              name: country.name.common,
              code: country.cca2,
            }))
            ?.map((country) => (
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
