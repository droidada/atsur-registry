import React, { useEffect } from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import { object, string, number, TypeOf, boolean, ZodIssueCode } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import ICreateArtworkFormData, {
  ICreateArtworkIllustration,
} from "@/types/models/createArtwork";
import InputField from "@/components/Form/InputField";
import { MenuItem, Stack } from "@mui/material";
import SelectField from "@/components/Form/SelectField";
import SwitchInput from "@/components/Form/SwitchInput";
import Image from "next/image";
import { DataObjectOutlined } from "@mui/icons-material";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<ICreateArtworkFormData>>;
  formData: ICreateArtworkFormData;
}
const IllustrationForm: React.FC<Props> = ({
  setActiveIndex,
  setFormData,
  formData,
}) => {
  const axiosAuth = useAxiosAuth();

  const metadataSchema = object({
    title: string().nonempty("Title is required"),
    description: string().nonempty("Description is required"),
    isDigital: string().nonempty("Is this a digital art?"),
    height: string(),
    width: string(),
    depth: string(),
    medium: string().nonempty("Medium is required"),
    subjectMatter: string().nonempty("Subject matter is required"),
    rarity: string().nonempty("Rarity is required"),
    withFrame: boolean().default(false),
  }).superRefine((data, ctx) => {
    if (data.isDigital === "no") {
      const dimensions = ["height", "width", "depth"] as const;
      dimensions.forEach((dim) => {
        const value = data[dim];
        if (!value || value.trim() === "") {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: `${
              dim.charAt(0).toUpperCase() + dim.slice(1)
            } is required when artwork is not digital`,
            path: [dim],
          });
        } else if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: `${
              dim.charAt(0).toUpperCase() + dim.slice(1)
            } must be a number greater than 0`,
            path: [dim],
          });
        }
      });
    }
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const mediums = [
    "drawing",
    "pastel",
    "pencil",
    "charcoal",
    "ink-pen",
    "chalk",
    "painting",
    "water-color-paint",
    "acrylic-paint",
    "oil-paint",
    "mixed-media",
    "collage",
    "installation",
    "assemblage",
    "sculpture",
    "clay",
    "metal",
    "glass",
    "stone",
    "wood",
    "photography",
  ];
  const rarity = ["unique", "limited-edition", "open-edition", "unknown"];

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    handleSubmit,
    watch,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  console.log(errors);

  const digitalArt = watch("isDigital");

  console.log(digitalArt);

  const { isLoading, mutate: handleNext } = useMutation(
    (data: ICreateArtworkIllustration) => {
      setFormData((prev) => ({ ...prev, illustration: data }));

      return Promise.resolve();
    },
    {
      onSuccess: () => {
        setActiveIndex((prev) => prev + 1);
      },
    },
  );

  const onSubmitHandler: SubmitHandler<MetadataInput> = async (values) => {
    console.log(values);
    const data = {
      ...values,
      isDigital: values.isDigital == "yes" ? true : false,
      width: values?.width !== "undefined" ? values.width : 0,
      height: values?.height !== "undefined" ? values.height : 0,
      depth: values?.depth ? values.depth : 0,
    };

    console.log("This is the data", data);
    //  @ts-ignore
    handleNext(data);
  };

  useEffect(() => {
    setValue("title", formData?.illustration?.title);
    setValue("description", formData?.illustration?.description);
    setValue("height", String(formData?.illustration?.dimensions?.height));
    setValue("width", String(formData?.illustration?.dimensions?.width));
    setValue("depth", String(formData?.illustration?.dimensions?.depth ?? 0));
    setValue("rarity", formData?.illustration?.rarity);
    setValue("medium", formData?.illustration?.medium);
    setValue("subjectMatter", formData?.illustration?.subjectMatter);
    setValue("withFrame", formData?.illustration?.withFrame);
    setValue("isDigital", formData?.illustration?.isDigital ? "yes" : "no");
    // setValue("type", formData?.illustration?.type);
  }, [formData]);

  return (
    <CreateArtWorkFormContainer
      isFirst
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Stack spacing={4}>
        <InputField
          label="Title"
          hasInfo
          info="Title of the artwork"
          id="title"
          placeholder=""
          name="title"
          tabIndex={2}
          aria-required="true"
          fullWidth
          error={!!errors["title"]}
          helperText={errors["title"] ? errors["title"].message : ""}
          control={control}
          inputClassName="bg-secondary"
        />
        <InputField
          label="Description"
          hasInfo
          info="Description of the artwork"
          id="description"
          placeholder=""
          name="description"
          tabIndex={2}
          multiline
          rows={4}
          // textFieldClassName="bg-secondary"
          inputClassName="bg-secondary p-2"
          aria-required="true"
          fullWidth
          error={!!errors["description"]}
          helperText={
            errors["description"] ? errors["description"].message : ""
          }
          control={control}
        />
        <div className="flex gap-4  items-start">
          <InputField
            hasInfo
            info="Subject matter of the artpiece"
            label="Subject Matter"
            id="subjectMatter"
            placeholder=""
            name="subjectMatter"
            inputClassName="bg-secondary"
            className="w-full"
            tabIndex={2}
            aria-required="true"
            fullWidth
            error={!!errors["subjectMatter"]}
            helperText={
              errors["subjectMatter"] ? errors["subjectMatter"].message : ""
            }
            control={control}
          />
          <SelectField
            label="Medium"
            name="medium"
            hasInfo
            info="Medium used in the artwork"
            // @ts-ignore
            sx={{
              "& fieldset": {
                background: "#DCDCDC",
                border: "none",
                color: "black",
              },
            }}
            control={control}
            fullWidth
            helperText={errors["medium"] ? errors["medium"].message : ""}
            error={!!errors["medium"]}
          >
            {mediums.map((medium) => (
              <MenuItem
                key={medium}
                value={medium}
                className="text-xm capitalize"
              >
                {medium}
              </MenuItem>
            ))}
          </SelectField>
        </div>

        <div className="flex gap-4  items-start">
          <SelectField
            label="Is this a digital art?"
            name="isDigital"
            // @ts-ignore
            sx={{
              "& fieldset": {
                background: "#DCDCDC",
                border: "none",
                color: "black",
              },
            }}
            control={control}
            fullWidth
            helperText={errors["isDigital"] ? errors["isDigital"].message : ""}
            error={!!errors["isDigital"]}
          >
            {["yes", "no"].map((item) => (
              <MenuItem key={item} value={item} className="text-xm capitalize">
                {item}
              </MenuItem>
            ))}
          </SelectField>
        </div>

        {digitalArt == "no" && (
          <div className="flex gap-4 items-center">
            <InputField
              hasInfo
              info="1 inches = 2.54cm. 1 inches = 25.4mm"
              label="Height [in inches]"
              id="height"
              type="number"
              placeholder=""
              name="height"
              className="w-full"
              inputClassName="bg-secondary"
              tabIndex={2}
              fullWidth
              aria-required="true"
              error={!!errors["height"]}
              helperText={errors["height"] ? errors["height"].message : ""}
              control={control}
            />
            <InputField
              hasInfo
              info="1 inches = 2.54cm. 1 inches = 25.4mm"
              label="Width [in inches]"
              id="width"
              type="number"
              placeholder=""
              name="width"
              className="w-full"
              inputClassName="bg-secondary"
              tabIndex={2}
              aria-required="true"
              fullWidth
              error={!!errors["width"]}
              helperText={errors["width"] ? errors["width"].message : ""}
              control={control}
            />
            <InputField
              label="Depth [in inches]"
              hasInfo
              info="1 inches = 2.54cm. 1 inches = 25.4mm"
              id="depth"
              type="number"
              placeholder=""
              inputClassName="bg-secondary"
              name="depth"
              tabIndex={2}
              className="w-full"
              aria-required="false"
              fullWidth
              error={!!errors["depth"]}
              helperText={errors["depth"] ? errors["depth"].message : ""}
              control={control}
            />
          </div>
        )}
        <div className="flex gap-4 items-center">
          <SelectField
            label="Rarity"
            hasInfo
            info="How rare is the artwork"
            className=""
            // @ts-ignore
            sx={{
              "& fieldset": { background: "#DCDCDC", border: "none" },
              // borderColor: "black",
            }}
            name="rarity"
            selectClassName="bg-secondary"
            control={control}
            fullWidth
            helperText={errors["rarity"] ? errors["rarity"].message : ""}
            error={!!errors["rarity"]}
          >
            {rarity.map((item) => (
              <MenuItem key={item} value={item} className="text-xm capitalize">
                {item}
              </MenuItem>
            ))}
          </SelectField>
          <div className="max-w-[300px] w-full">
            <SwitchInput
              hasInfo
              info="Does the artwork has a frame"
              labelPlacement="start"
              label="With Frame"
              name="withFrame"
              control={control}
              error={!!errors["withFrame"]}
              // @ts-ignore
              helperText={
                errors["withFrame"] ? errors["withFrame"].message : ""
              }
            />
          </div>
        </div>
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default IllustrationForm;
