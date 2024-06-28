import React from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import ICreateArtworkFormData from "@/types/models/createArtwork";
import { object, string, number, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DateInput from "@/components/Form/DateInput";
import InputField from "@/components/Form/InputField";
import { Stack } from "@mui/material";
import { IoIosInformationCircleOutline } from "react-icons/io";
import SwitchInput from "@/components/Form/SwitchInput";

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
    creationDate: string(),
    price: string(),
    type: string(),
    isCirca: boolean(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: zodResolver(PricingSchema) });

  type PricingData = TypeOf<typeof PricingSchema>;

  const onSubmit: SubmitHandler<PricingData> = (data) => {
    setFormData({
      ...formData,
      illustration: {
        ...formData.illustration,
        creationDate: {
          ...formData.illustration.creationDate,
          date: data.creationDate,
        },
        price: {
          ...formData.illustration.price,
          amount: Number(data.price),
          type: data?.type,
        },
      },
    });
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <CreateArtWorkFormContainer
      handleGoBack={() => setActiveIndex((prev) => prev - 1)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={4}>
        <div className="flex gap-4 items-center">
          <DateInput
            className="flex-1"
            id="creationDate"
            label="Date Of Creation"
            name="creationDate"
            //   inputClassName="bg-secondary"
            control={control}
            // @ts-ignore
            helperText={
              errors["creationDate"] ? errors["creationDate"].message : ""
            }
            error={!!errors["creationDate"]}
          />

          <SwitchInput
            label="isCirca"
            name="isCirca"
            control={control}
            error={!!errors["isCirca"]}
            // @ts-ignore
            helperText={errors["isCirca"] ? errors["isCirca"].message : ""}
          />
        </div>
        <InputField
          label="Price"
          id="price"
          placeholder=""
          name="price"
          type="number"
          //   inputClassName="bg-secondary-white"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["price"]}
          // @ts-ignore
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
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default PricingForm;
