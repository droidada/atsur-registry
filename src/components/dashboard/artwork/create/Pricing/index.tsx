import React, { useEffect } from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import ICreateArtworkFormData from "@/types/models/createArtwork";
import { object, string, number, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateInput from "@/components/Form/DateInput";
import InputField from "@/components/Form/InputField";
import { Autocomplete, MenuItem, Stack, TextField } from "@mui/material";
import { IoIosInformationCircleOutline } from "react-icons/io";
import SwitchInput from "@/components/Form/SwitchInput";
import SelectField from "@/components/Form/SelectField";
import path from "path";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<ICreateArtworkFormData>>;
  formData: ICreateArtworkFormData;
}
const PricingForm: React.FC<Props> = ({
  setActiveIndex,
  setFormData,
  formData,
}) => {
  const PricingSchema = object({
    creationDate: number(),
    price: string().optional(),
    type: string().optional(),
    forSale: boolean().optional(),
  }).superRefine((data, ctx) => {
    if (data.forSale && !data.price) {
      ctx.addIssue({
        path: ["price"],
        message: "Price is required for sale",
        code: "custom",
      });
    }
    if (data.forSale && !data.type) {
      ctx.addIssue({
        path: ["type"],
        message: "Type is required for sale",
        code: "custom",
      });
    }
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    register,
    getValues,
  } = useForm({
    resolver: zodResolver(PricingSchema),
    defaultValues: {
      creationDate: formData?.illustration?.creationDate?.date || null,
      price: formData?.illustration?.price?.amount?.toString() || "",
      type: formData?.illustration?.price?.type || "",
      forSale: formData?.illustration?.forSale || false,
    },
  });

  console.log(getValues(), errors);

  type PricingData = TypeOf<typeof PricingSchema>;

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1960 + 1 },
    (_, index) => 1960 + index,
  );

  useEffect(() => {
    setValue(
      "creationDate",
      formData?.illustration?.creationDate?.date || null,
    );
    setValue("price", formData?.illustration?.price?.amount?.toString() || "");
    setValue("type", formData?.illustration?.price?.type || "");
    setValue("forSale", formData?.illustration?.forSale || false);
  }, [formData, setValue]);

  const forSale = watch("forSale");

  const onSubmit: SubmitHandler<PricingData> = (data) => {
    console.log(data);
    setFormData({
      ...formData,
      illustration: {
        ...formData.illustration,
        creationDate: {
          ...formData.illustration.creationDate,
          // @ts-ignore
          date: data.creationDate,
        },

        price: {
          currency: "USD",
          amount: data.price ? Number(data.price) : 0,
          type: data.type || "",
        },
        forSale: data.forSale || false,
      },
    });
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <CreateArtWorkFormContainer
      handleGoBack={() => setActiveIndex((prev) => prev - 1)}
      // @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={4}>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col text-base gap-2  items-start w-full">
            <label htmlFor="creationDate" className="capitalize font-semibold">
              Creation Date
            </label>
            <Controller
              name="creationDate"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="w-full"
                  {...field}
                  options={years}
                  getOptionLabel={(option) => option.toString()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.creationDate}
                      helperText={errors.creationDate?.message}
                      fullWidth
                      sx={{
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                    />
                  )}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  value={field.value}
                />
              )}
            />
          </div>

          <SwitchInput
            label="Is the artwork for sale?"
            // id="forSale"
            name="forSale"
            control={control}
            error={!!errors["forSale"]}
            helperText={errors["forSale"] ? errors["forSale"].message : ""}
          />
        </div>
        {forSale && (
          <>
            <InputField
              label="Price"
              id="price"
              placeholder=""
              name="price"
              type="text"
              hasInfo
              info="The price of the artwork"
              tabIndex={2}
              aria-required="true"
              fullWidth
              defaultValue="0"
              error={!!errors["price"]}
              helperText={errors["price"] ? errors["price"].message : ""}
              control={control}
            />
            <div className="flex gap-4 items-center">
              {["fixed", "minimum-price"].map((item) => (
                <div key={item} className="flex gap-2 items-center">
                  <label htmlFor={item} className="capitalize">
                    {item.replace("-", " ")}
                  </label>
                  <input
                    type="radio"
                    id={item}
                    name="type"
                    value={item}
                    {...register("type")}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center text-[15px] italic">
              it is important not to over price a work to encourage sales
              <IoIosInformationCircleOutline />
            </div>
          </>
        )}
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default PricingForm;
