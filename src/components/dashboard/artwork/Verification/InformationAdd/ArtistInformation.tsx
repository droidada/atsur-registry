import React, { useState, useEffect } from "react";
import FormContainer from "./formContainer";
import { object, string, number, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import { Button, MenuItem, Stack } from "@mui/material";
import InputField from "@/components/Form/InputField";
import { useToast } from "@/providers/ToastProvider";
import VerificationFileDroper from "../VerificationFileDroper";
import SwitchInput from "@/components/Form/SwitchInput";
import SelectField from "@/components/Form/SelectField";
import SelectedSeries from "@/components/dashboard/SelectedSeries";
import { useRouter } from "next/router";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
  setIsArtistBroker: (arg: boolean) => void;
  handleAddDealerStep: () => void;
  handleRemoveDealerStep: () => void;
}
const ArtistInformation: React.FC<Props> = ({
  setActiveIndex,
  defaultValues,
  artpieceId,
  setIsArtistBroker,
  handleAddDealerStep,
  handleRemoveDealerStep,
}) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const [selectedSeries, setSelectedSeries] = useState<any>();
  const [currentSubmitType, setCurrentSubmitType] = React.useState<
    "save" | "next" | "publish"
  >(null);

  const metadataSchema = object({
    story: string().nonempty("Story is required"),
    videoCaption: string().optional(),
    isSeries: string().nonempty(),
    planToSell: string().nonempty("Please select an option"),
    sellerType: string().nonempty("Please select seller type"),
  });

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const planToSell = watch("planToSell");
  const isSeries = watch("isSeries");
  const sellerType = watch("sellerType");

  console.log(errors);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      axiosAuth.post(`/verify-artpiece/artist/${artpieceId}`, data),
    onError: (error: any) => {
      toast.error(error.response.data.message || error.message);
    },
    onSuccess: (data) => {
      if (currentSubmitType === "save" || currentSubmitType === "next") {
        toast.success("Data saved successfully");
        if (sellerType === "broker") {
          setActiveIndex((prevIndex) => prevIndex + 1);
          setIsArtistBroker(true);
        } else {
          router.replace(router.asPath);
        }

        // setActiveIndex((prevIndex) => prevIndex + 1);
      } else {
        toast.success("Data published successfully");
        if (sellerType === "broker") {
          setActiveIndex((prevIndex) => prevIndex + 1);
          setIsArtistBroker(true);
        } else {
          router.replace(router.asPath);
        }
      }
    },
  });
  const [attachments, setAttachments] = useState<{
    video: { file: any; filename: string } | null;
    attachments: { file: any; filename: string }[];
  }>({
    video: null,
    attachments: [],
  });

  const handleUploadClick = (
    currentFiles: any,
    type: "video" | "attachments",
  ) => {
    if (type === "video") {
      const fileDoc = currentFiles[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setAttachments((prevState) => ({
          ...prevState,
          video: {
            file: e.target.result,
            filename: fileDoc.name,
          },
        }));
      };
      reader.readAsDataURL(fileDoc.file);
    } else {
      const newFiles = [];
      currentFiles.forEach((fileDoc) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newFiles.push({
            file: e.target.result,
            filename: fileDoc.name,
          });
          setAttachments((prevState) => ({
            ...prevState,
            attachments: newFiles.slice(0, 2),
          }));
        };
        reader.readAsDataURL(fileDoc.file);
      });
    }
  };

  const onSubmit: SubmitHandler<MetadataInput> = (data, event) => {
    //@ts-ignore
    const buttonClicked = event.nativeEvent.submitter.name;
    const save =
      buttonClicked === "save" || data.sellerType === "broker" ? true : false;

    setCurrentSubmitType(buttonClicked);

    const formData = new FormData();
    formData.append("save", JSON.stringify(save));
    formData.append("story", data.story);
    formData.append("isSeries", data.isSeries == "yes" ? "true" : "false");
    formData.append("planToSell", data.planToSell === "yes" ? "true" : "false");
    data.planToSell === "yes" && formData.append("sellerType", data.sellerType);
    attachments?.attachments?.length > 0 &&
      formData.append(
        "attachments",
        JSON.stringify(attachments?.attachments?.map((file) => file.file)),
      );
    attachments?.video?.file &&
      formData.append("video", attachments?.video?.file);

    attachments?.video?.file &&
      formData.append("videoCaption", data.videoCaption);

    data.isSeries == "yes" && formData.append("series", selectedSeries);

    // @ts-ignore
    mutate(formData);
  };

  useEffect(() => {
    console.log("defaultValues here is ", defaultValues);
    if (defaultValues?.artist) {
      setValue("story", defaultValues?.artist?.storyTelling);
      setValue("videoCaption", defaultValues?.artist?.videoCaption);
      setValue("isSeries", defaultValues?.artist?.partOfSeries ? "yes" : "no");
      setValue("planToSell", defaultValues?.artist?.planToSell ? "yes" : "no");
      setValue("sellerType", defaultValues?.artist?.sellerType);
      setSelectedSeries(defaultValues?.artist?.series);
    }
    if (defaultValues?.artist?.sellerType === "broker") {
      setIsArtistBroker(true);
      handleAddDealerStep();
    }
  }, [
    defaultValues,
    setValue,
    sellerType,
    setSelectedSeries,
    setIsArtistBroker,
    handleAddDealerStep,
  ]);

  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      onSubmit={handleSubmit(onSubmit)}
      saveIsLoading={currentSubmitType === "save" && isLoading}
      publishIsLoading={currentSubmitType === "publish" && isLoading}
    >
      <Stack spacing={2}>
        <InputField
          label="Story"
          id="story"
          placeholder="Tell us a story about your artpiece"
          name="story"
          tabIndex={2}
          labelClassName="font-[400] text-sm"
          inputClassName="bg-secondary-white"
          isRequired
          multiline
          rows={4}
          aria-required={true}
          fullWidth
          error={!!errors["story"]}
          helperText={errors["story"] ? errors["story"].message : ""}
          control={control}
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            labelClassName={"text-sm font-[400]  "}
            label="Do you want to sell the artpiece?"
            id="planToSell"
            name="planToSell"
            className={(!planToSell || planToSell == "no") && "col-span-2"}
            selectClassName="bg-secondary capitalize"
            control={control}
            fullWidth
            helperText={
              errors["planToSell"] ? errors["planToSell"].message : ""
            }
            error={!!errors["planToSell"]}
          >
            {["yes", "no"].map((item) => (
              <MenuItem
                key={item}
                value={item}
                className="text-xm capitalize bg-secondary"
              >
                {item}
              </MenuItem>
            ))}
          </SelectField>

          {planToSell === "yes" && (
            <SelectField
              labelClassName={"text-sm font-[400]  "}
              label="How?"
              id="sellerType"
              name="sellerType"
              selectClassName="bg-secondary capitalize"
              control={control}
              fullWidth
              helperText={
                errors["sellerType"] ? errors["sellerType"].message : ""
              }
              error={!!errors["sellerType"]}
            >
              {["individual", "broker"].map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  onClick={() => {
                    if (item === "broker") {
                      handleAddDealerStep();
                    } else {
                      handleRemoveDealerStep();
                    }
                  }}
                  className="text-xm bg-secondary"
                >
                  {item === "individual"
                    ? "As an individual"
                    : "Through a broker"}
                </MenuItem>
              ))}
            </SelectField>
          )}
        </div>

        <SelectField
          labelClassName={"text-sm font-[400]  le[400] text-smg-[16px]"}
          label="Is this artpiece part of a series?"
          id="isSeries"
          name="isSeries"
          selectClassName="bg-secondary capitalize"
          control={control}
          fullWidth
          helperText={errors["isSeries"] ? errors["isSeries"].message : ""}
          error={!!errors["isSeries"]}
        >
          {["yes", "no"].map((item) => (
            <MenuItem
              key={item}
              value={item}
              className="text-xm capitalize bg-secondary"
            >
              {item}
            </MenuItem>
          ))}
        </SelectField>

        {isSeries === "yes" && (
          <SelectedSeries
            labelClassName={"text-sm font-[400]  le[400] text-smg-[16px]"}
            label="Series"
            selectedSeries={selectedSeries}
            setSelectedSeries={setSelectedSeries}
          />
        )}

        <div className="mt-12 grid gap-4">
          <h2 className="text-[17px] leading-[17px] font-semibold ">
            Attachments
          </h2>

          <div className="flex items-stretch h-fit gap-4">
            <div className="w-2/3 flex flex-col gap-4">
              <VerificationFileDroper
                className="w-full"
                accept="video/*"
                maxSize={100 * 1024 * 1024}
                desc=" `Drag or choose your file to upload video (Max 100MB)`"
                label="Video"
                fileName={
                  attachments?.video?.filename ||
                  defaultValues?.artist?.creationVideo?.url?.split("/").pop()
                }
                handleUpload={(files) => handleUploadClick(files, "video")}
              />
            </div>

            <InputField
              label="Video Caption"
              id="videoCaption"
              placeholder=""
              name="videoCaption"
              tabIndex={2}
              labelClassName="font-[400] text-sm"
              inputClassName="bg-secondary-white w-full h-[141px] "
              multiline
              rows={3}
              aria-required={true}
              fullWidth
              error={!!errors["videoCaption"]}
              helperText={
                errors["videoCaption"]
                  ? errors["attachment1Caption"].message
                  : ""
              }
              control={control}
            />
          </div>

          <div>
            <VerificationFileDroper
              className="w-full"
              accept="application/pdf,image/*"
              maxFiles={2}
              maxSize={10 * 1024 * 1024}
              desc={
                attachments?.attachments?.length > 0
                  ? attachments.attachments
                      .map((attachment) => attachment.filename)
                      .join(", ")
                  : " Drag or choose your file to upload PDF or Image (Max 10MB). Max 2 files allowed"
              }
              label="Attachments"
              handleUpload={(files) => handleUploadClick(files, "attachments")}
            />
          </div>
        </div>
      </Stack>
    </FormContainer>
  );
};

export default ArtistInformation;
