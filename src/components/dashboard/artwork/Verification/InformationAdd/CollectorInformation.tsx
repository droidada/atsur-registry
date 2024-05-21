import React from "react";
import FormContainer from "./formContainer";
import SelectField from "@/components/Form/SelectField";
import { MenuItem } from "@mui/material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useRouter } from "next/router";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import DateInput from "@/components/Form/DateInput";
import SwitchInput from "@/components/Form/SwitchInput";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
}
const CollectorInformation: React.FC<Props> = ({
  setActiveIndex,
  defaultValues,
}) => {
  const axiosAuth = useAxiosAuth();

  const metadataSchema = object({
    date: string().nonempty("Date is required"),
    acquisitionType: string().nonempty("Channel is required"),
    acquisitionPurpose: string().nonempty(),
    // methodOfPurchase: string().nonempty("Subject matter is required"),
    acquisitionDocumentCaption: string().optional(),
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
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Collector Information"
      onSubmit={() => {}}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex gap-2 col-span-2 items-center">
          <DateInput
            id="date"
            label="Date of Purchase"
            name="date"
            className="flex-1"
            control={control}
            helperText={errors["date"] ? errors["date"].message : ""}
            error={!!errors["date"]}
          />
          <SwitchInput
            label="Is Circa"
            name="isCirca"
            control={control}
            error={!!errors["isCirca"]}
            helperText={errors["isCirca"] ? errors["isCirca"].message : ""}
          />
        </div>
        <SelectField
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
            "direct",
            "broker",
            "auction",
            "donation",
            "inheritance",
            "gift",
            "salvage",
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
          label="Acquisition Purpose"
          name="acquisitionPurpose"
          selectClassName="bg-secondary"
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
          label="Method of Purchase"
          name="methodOfPurchase"
          selectClassName="bg-secondary"
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
      </div>
    </FormContainer>
  );
};

export default CollectorInformation;
