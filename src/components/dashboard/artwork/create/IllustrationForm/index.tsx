import React, { useEffect } from "react";
import CreateArtWorkFormContainer from "../FormContainer";
import { object, string, number, TypeOf } from "zod";
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
    height: string()
      .nonempty("Height is required")
      .refine(
        (data) => !isNaN(parseFloat(data)) && parseFloat(data) > 0,
        "Height must be a number greater than 0",
      ),
    width: string()
      .nonempty("Width is required")
      .refine(
        (data) => !isNaN(parseFloat(data)) && parseFloat(data) > 0,
        "Width must be a number greater than 0",
      ),
    depth: string(),
      // .nonempty("Depth is required")
      // .refine(
      //   (data) => !isNaN(parseFloat(data)) && parseFloat(data) > 0,
      //   "Depth must be a number greater than 0",
      // ),
    medium: string().nonempty("Medium is required"),
    subjectMatter: string().nonempty("Subject matter is required"),
    rarity: string().nonempty("Rarity is required"),
    type: string().nonempty("Type is required"),
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
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

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
    //  @ts-ignore
    handleNext(values);
  };

  useEffect(() => {
    setValue("title", formData?.illustration?.title);
    setValue("description", formData?.illustration?.description);
    setValue("height", String(formData?.illustration?.height));
    setValue("width", String(formData?.illustration?.width));
    setValue("depth", String(formData?.illustration?.depth));
    setValue("rarity", formData?.illustration?.rarity);
    setValue("medium", formData?.illustration?.medium);
    setValue("subjectMatter", formData?.illustration?.subjectMatter);
    setValue("type", formData?.illustration?.type);
  }, [formData]);

  return (
    <CreateArtWorkFormContainer
      isFirst
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Stack spacing={4}>
        <InputField
          label="Title"
          id="title"
          placeholder=""
          name="title"
          aria-required="true"
          fullWidth
          error={!!errors["title"]}
          helperText={errors["title"] ? errors["title"].message : ""}
          control={control}
          inputClassName="bg-secondary"
        />
        <InputField
          label="Description"
          id="description"
          placeholder=""
          name="description"
          multiline
          rows={4}
          inputClassName="bg-secondary"
          aria-required="true"
          fullWidth
          error={!!errors["description"]}
          helperText={
            errors["description"] ? errors["description"].message : ""
          }
          control={control}
        />
        <div className="flex gap-4 items-center">
          <InputField
            label="Subject Matter"
            id="subjectMatter"
            placeholder=""
            name="subjectMatter"
            inputClassName="bg-secondary"
            className="w-full"
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

        <div className="flex gap-4 items-center">
          <InputField
            label="Height [in inches]"
            id="height"
            type="number"
            placeholder="in inches"
            name="height"
            className="w-full"
            inputClassName="bg-secondary"
            fullWidth
            aria-required="true"
            error={!!errors["height"]}
            helperText={errors["height"] ? errors["height"].message : ""}
            control={control}
          />
          <InputField
            label="Width [in inches]"
            id="width"
            type="number"
            placeholder="in inches"
            name="width"
            className="w-full"
            inputClassName="bg-secondary"
            aria-required="true"
            fullWidth
            error={!!errors["width"]}
            helperText={errors["width"] ? errors["width"].message : ""}
            control={control}
          />
          <InputField
            label="Depth [in inches]"
            id="depth"
            type="number"
            placeholder="in inches"
            inputClassName="bg-secondary"
            name="depth"
            className="w-full"
            aria-required="false"
            fullWidth
            error={!!errors["depth"]}
            helperText={errors["depth"] ? errors["depth"].message : ""}
            control={control}
          />
        </div>
        <div className="flex gap-4 items-center">
          <SelectField
            label="Rarity"
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
          <SelectField
            label="Type"
            name="type"
            selectClassName="bg-secondary"
            control={control}
            fullWidth
            helperText={errors["type"] ? errors["type"].message : ""}
            error={!!errors["type"]}
          >
            {["artifact", "art-piece"].map((item) => (
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
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default IllustrationForm;
