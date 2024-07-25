import ProtectedPage from "@/HOC/Protected";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import SelectField from "@/components/Form/SelectField";
import { MenuItem } from "@mui/material";
import InputField from "@/components/Form/InputField";
import { useToast } from "@/providers/ToastProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useRouter } from "next/router";
import LoadingButton from "@/components/Form/LoadingButton";

const KybVerification = () => {
  const { data: countries } = useQuery({
    queryFn: () =>
      axios
        .get(`https://restcountries.com/v3.1/all?fields=name,cca2`)
        .then((res) => {
          const formattedCountries = res.data
            .map((country) => ({
              name: country.name.common,
              code: country.cca2,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
          const wantedCountries = ["nigeria", "kenya", "south africa"];

          return formattedCountries.filter((country) =>
            wantedCountries.includes(country.name.toLowerCase()),
          );
        }),

    refetchOnWindowFocus: false,
  });

  const router = useRouter();
  const orgId = router.query.orgId;

  console.log(orgId);

  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const BusinessInfoSchema = object({
    country: string(),
    id_type: string(),
    id_number: string(),
    postal_code: string().optional(),
    postal_address: string().optional(),
    business_type: string().optional(),
  })
    .refine(
      (data) => {
        if (data.country === "NG" && data.id_type === "BUSINESS_REGISTRATION") {
          return data.business_type !== undefined;
        }
        if (data.country === "KE") {
          return (
            data.postal_code !== undefined && data.postal_address !== undefined
          );
        }
        return true;
      },
      {
        message: "Required fields are missing",
        path: [
          "country",
          "id_type",
          "business_type",
          "postal_code",
          "postal_address",
        ],
      },
    )
    .refine(
      (data) => {
        let regex;
        if (data.country === "NG" && data.id_type === "BUSINESS_REGISTRATION") {
          regex = /^0{7}$|^(?![0]+$)[A-Z0-9]{1,8}$/i;
        } else if (
          data.country === "NG" &&
          data.id_type === "TAX_INFORMATION"
        ) {
          regex = /^[0-9]{8,}-[0-9]{4,}$/;
        } else if (
          data.country === "ZA" &&
          data.id_type === "BUSINESS_REGISTRATION"
        ) {
          regex = /\d{4}\/\d{6}\/\d{2}/;
        }
        return regex ? regex.test(data.id_number) : true;
      },
      {
        message: "Invalid ID number format",
        path: ["id_number"],
      },
    );

  type BusinessInput = TypeOf<typeof BusinessInfoSchema>;

  const { data, mutate, isLoading } = useMutation({
    mutationFn: (data: BusinessInput) =>
      axiosAuth.post(`/smile-verification/business`, {
        orgId,
        ...data,
      }),
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
    onSuccess: (data) => {
      router.push(
        `/dashboard/settings/security/kyb-verification/${orgId}/status`,
      );
    },
  });

  const {
    control,
    formState: { isSubmitting, errors },
    reset,
    handleSubmit,
    setValue,
    watch,
  } = useForm<BusinessInput>({
    resolver: zodResolver(BusinessInfoSchema),
  });

  const watchCountry = watch("country");
  const watchIdType = watch("id_type");

  const onSubmitHandler: SubmitHandler<BusinessInput> = async (values) => {
    mutate(values);
  };

  return (
    <div>
      <h1 className="text-3xl  mb-4 font-[600]">Organization Verification</h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-4 mt-7"
      >
        <SelectField
          // @ts-ignore
          sx={{
            "& fieldset": {
              background: "#DCDCDC",
              border: "none",
              color: "black",
            },

            // borderColor: "black",
          }}
          name="country"
          error={!!errors["country"]}
          fullWidth
          helperText={errors["country"] ? errors["country"].message : ""}
          control={control}
          label="Country"
        >
          <MenuItem selected disabled value="">
            Select Country
          </MenuItem>
          {countries?.length > 0 &&
            countries?.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
        </SelectField>

        <SelectField
          name="id_type"
          error={!!errors["id_type"]}
          fullWidth
          // @ts-ignore
          sx={{
            "& fieldset": {
              background: "#DCDCDC",
              border: "none",
              color: "black",
            },

            // borderColor: "black",
          }}
          helperText={errors["id_type"] ? errors["id_type"].message : ""}
          control={control}
          label="ID Type"
        >
          <MenuItem selected disabled value="">
            Select ID Type
          </MenuItem>
          {watchCountry === "NG"
            ? ["TAX_INFORMATION", "BUSINESS_REGISTRATION"]?.map((idType) => (
                <MenuItem className="capitalize" key={idType} value={idType}>
                  {idType.replace("_", " ")}
                </MenuItem>
              ))
            : ["BUSINESS_REGISTRATION"]?.map((idType) => (
                <MenuItem className="capitalize" key={idType} value={idType}>
                  {idType.replace("_", " ")}
                </MenuItem>
              ))}
        </SelectField>
        <InputField
          label="ID Number"
          id="id_number"
          type="number"
          placeholder={
            watchCountry === "NG"
              ? "Enter numbers only without the 2 letter suffix"
              : `Enter id number`
          }
          name="id_number"
          className="w-full"
          inputClassName="bg-secondary"
          tabIndex={2}
          fullWidth
          aria-required="true"
          error={!!errors["id_number"]}
          helperText={errors["id_number"] ? errors["id_number"].message : ""}
          control={control}
        />

        {watchCountry === "NG" && watchIdType === "BUSINESS_REGISTRATION" && (
          <SelectField
            // @ts-ignore
            sx={{
              "& fieldset": {
                background: "#DCDCDC",
                border: "none",
                color: "black",
              },

              // borderColor: "black",
            }}
            name="business_type"
            error={!!errors["business_type"]}
            fullWidth
            helperText={
              errors["business_type"] ? errors["business_type"].message : ""
            }
            control={control}
            label="Business Type"
          >
            <MenuItem selected disabled value="">
              Select business type
            </MenuItem>
            {[
              { name: "business name registration", code: "bn" },
              { name: "private or public limited companies", code: "co" },
              { name: "incorporated trustees", code: "it" },
            ].map((business_type) => (
              <MenuItem
                className="capitalize"
                key={business_type.code}
                value={business_type.code}
              >
                {business_type.name}
              </MenuItem>
            ))}
          </SelectField>
        )}

        {watchCountry === "KE" && (
          <>
            <InputField
              label="Postal Code"
              id="postal_code"
              type="number"
              placeholder=""
              name="postal_code"
              className="w-full"
              inputClassName="bg-secondary"
              tabIndex={2}
              fullWidth
              aria-required="true"
              error={!!errors["postal_code"]}
              helperText={
                errors["postal_code"] ? errors["postal_code"].message : ""
              }
              control={control}
            />
            <InputField
              label="Postal Code"
              id="postal_address"
              type="number"
              placeholder=""
              name="postal_address"
              className="w-full"
              inputClassName="bg-secondary"
              tabIndex={2}
              fullWidth
              aria-required="true"
              error={!!errors["postal_address"]}
              helperText={
                errors["postal_address"] ? errors["postal_address"].message : ""
              }
              control={control}
            />
          </>
        )}

        <div className="flex justify-end">
          <LoadingButton
            variant="contained"
            className="px-4 bg-primary text-white"
            loading={isLoading}
            type="submit"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default ProtectedPage(KybVerification);
