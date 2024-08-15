import InputField from "@/components/Form/InputField";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, boolean, object, string } from "zod";
import SelectField from "@/components/Form/SelectField";
import LoadingButton from "@/components/Form/LoadingButton";
import { ShippingAddressType } from "@/types/models/shipingAdress";

interface Props {
  open: boolean;
  onClose: () => void;
  setAddress: React.Dispatch<React.SetStateAction<ShippingAddressType>>;
}
const AddressModal: React.FC<Props> = ({ open, onClose, setAddress }) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [sortedCountries, setSortedCountries] = useState([]);

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axios.get("https://restcountries.com/v3.1/all?fields=name,cca2,idd"),
    refetchOnWindowFocus: false,
  });

  const addressSchema = object({
    address: string().nonempty("Address is required"),
    country: string().nonempty("Date is required"),
    zipCode: string().optional(),
    state: string().optional(),
    city: string().optional(),
    contactName: string(),
    phone: string(),
    isDefault: boolean(),
  });

  type MetadataInput = TypeOf<typeof addressSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(addressSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: typeof addressSchema) =>
      axiosAuth.post("/shipping-address", { ...values }),
    onSuccess: (data) => {
      console.log(data);
      setAddress(data?.data?.data);
      reset();
      onClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong",
      );
    },
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

  const selectedCountry = watch("country");

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

  const onSubmit: SubmitHandler<MetadataInput> = (values) => {
    // @ts-ignore
    mutate(values);
  };

  return (
    <Dialog
      PaperComponent={Paper}
      // maxWidth={450}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
        className: "max-w-[550px] w-full",
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add Address</DialogTitle>
      <DialogContent className="grid grid-cols-2 gap-4" dividers>
        <SelectField
          control={control}
          name="country"
          // @ts-ignore
          sx={{
            "& fieldset": { border: "none", backgroundColor: "#F3F3F3" },
            borderColor: "black",
          }}
          label="Country/region"
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
          control={control}
          label="State"
          className="bg-transparent"
          inputClassName="bg-secondary-white"
          placeholder="FCT"
          // id={item}
          name="state"
          error={!!errors["state"]}
          helperText={errors["state"] ? errors["state"].message : ""}
        />
        <InputField
          control={control}
          label="City"
          className="bg-transparent"
          inputClassName="bg-secondary-white"
          placeholder="Abuja"
          // id={item}
          name="city"
          error={!!errors["city"]}
          helperText={errors["city"] ? errors["city"].message : ""}
        />
        <InputField
          control={control}
          label="Address"
          className="bg-transparent"
          inputClassName="bg-secondary-white"
          placeholder="No 23 Adekuntu Close, Wuse 2, FCT Abuja"
          // id={item}
          name="address"
          error={!!errors["address"]}
          helperText={errors["address"] ? errors["address"].message : ""}
        />
        <InputField
          control={control}
          label="Contact Name"
          className="bg-transparent"
          inputClassName="bg-secondary-white"
          placeholder="John Doe"
          // id={item}
          name="contactName"
          error={!!errors["contactName"]}
          helperText={
            errors["contactName"] ? errors["contactName"].message : ""
          }
        />

        <InputField
          control={control}
          label="Postal Code"
          className="bg-transparent"
          inputClassName="bg-secondary-white"
          placeholder="55776"
          // id={item}
          name="zipCode"
          error={!!errors["zipCode"]}
          helperText={errors["zipCode"] ? errors["zipCode"].message : ""}
        />

        <InputField
          control={control}
          label="Phone Number"
          className="bg-transparent col-span-2"
          inputClassName="bg-secondary-white"
          placeholder=""
          // id={item}
          name="phone"
          error={!!errors["phone"]}
          helperText={errors["phone"] ? errors["phone"].message : ""}
        />

        <div className="col-span-2">
          <FormControlLabel
            control={<Checkbox {...register("isDefault")} />}
            label="Set as default shipping address"
          />
          {errors["agree"] && (
            <p className="text-red-600 text-[12px]">
              {errors["agree"].message}
            </p>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <LoadingButton
          loading={isLoading}
          type="submit"
          className="bg-primary text-white"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
