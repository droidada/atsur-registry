import React, { useState } from "react";
import FormContainer from "./formContainer";
import { object, string, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import { Button, Stack } from "@mui/material";
import InputField from "@/components/Form/InputField";
import { useToast } from "@/providers/ToastProvider";
import VerificationFileDroper from "../VerificationFileDroper";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
}
const ArtistInformation: React.FC<Props> = ({
  setActiveIndex,
  defaultValues,
  artpieceId,
}) => {
  const axiosAuth = useAxiosAuth();
  const metadataSchema = object({
    story: string().nonempty("Story is required"),
    videoCaption: string().optional(),
    attachment1Caption: string().optional(),
    attachment2Caption: string().optional(),
  });
  const toast = useToast();

  type MetadataInput = TypeOf<typeof metadataSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    control,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(metadataSchema),
  });

  const { mutate, isLoading } = useMutation({});
  const [attachments, setAttachments] = useState<{
    video: {
      file: any;
      filename: string;
    };
    attachments: {
      file: any;
      filename: string;
    }[];
  }>(null);
  const handleUploadClick = (
    currentFiles: any,
    type: "video" | "attachments",
  ) => {
    if (type === "video") {
      const fileDoc = currentFiles[0];
      const reader = new FileReader();

      // if(attachmentName.includes("attachment") && file.)

      reader.onload = (e) => {
        setAttachments({
          ...attachments,
          video: {
            file: e.target.result,
            filename: fileDoc.name,
          },
        });
      };
      reader.readAsDataURL(fileDoc.file);
    } else {
      const files = currentFiles;

      console.log(files);

      files.forEach((fileDoc) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAttachments({
            ...attachments,
            attachments: [
              ...attachments?.attachments,
              {
                file: e.target.result,
                filename: fileDoc.name,
              },
            ],
          });
        };

        reader.readAsDataURL(fileDoc.file);
      });
    }
  };

  console.log(attachments?.attachments);

  return (
    <FormContainer
      setActiveIndex={setActiveIndex}
      title="Artist Information"
      onSubmit={() => {}}
    >
      <Stack spacing={2}>
        <InputField
          label="Story"
          id="story"
          placeholder=""
          name="story"
          tabIndex={2}
          labelClassName="font-thin"
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
        <h2 className="text-[17px] leading-[17px] font-semibold ">
          Attachments
        </h2>

        <div className="flex items-stretch h-fit gap-4">
          <div className="w-2/3 flex flex-col gap-4">
            {/* <label className="text-sm font-thin  leading-[16px]" htmlFor="">
              Video
            </label> */}
            <VerificationFileDroper
              className="w-full"
              accept="video/*"
              maxSize={100 * 1024 * 1024}
              desc=" `Drag or choose your file to upload video (Max 100MB)`"
              label="Video"
              fileName={attachments?.video?.filename}
              handleUpload={(files) => handleUploadClick(files, "video")}
            />
            {/* <div className=" p-4 h-full bg-secondary-white gap-4 flex flex-col items-center justify-center">
              <p className="text-xs leading-[16px]">
                {attachments?.video.file ? (
                  attachments?.video?.filename
                ) : (
                  <>Drag or choose your file to upload MP4 (Max 100MB)</>
                )}
              </p>
              <label
                htmlFor="attachment1"
                className="w-[114.8px] flex flex-col items-center justify-center h-[30.3px] bg-secondary text-xs leading-[16px]"
              >
                Browse File
              </label>
              <input
                type="file"
                hidden
                accept="video/*"
                id="attachment1"
                onChange={(e) => handleUploadClick(e, "video")}
              />
            </div> */}
          </div>

          <InputField
            label="Video Caption"
            id="videoCaption"
            placeholder=""
            name="videoCaption"
            tabIndex={2}
            labelClassName="font-thin"
            inputClassName="bg-secondary-white w-full h-[141px] "
            multiline
            rows={3}
            aria-required={true}
            fullWidth
            error={!!errors["videoCaption"]}
            helperText={
              errors["videoCaption"] ? errors["attachment1Caption"].message : ""
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
                ? attachments?.attachments?.length + " files"
                : " Drag or choose your file to upload PDF or Image (Max 10MB)"
            }
            label="Attachments"
            handleUpload={(files) => handleUploadClick(files, "attachments")}
          />
        </div>

        {/* <div className="flex items-stretch h-fit gap-4">
          <div className="w-2/3 flex flex-col gap-4">
            <label className="text-sm font-thin  leading-[16px]" htmlFor="">
              Attachment 1
            </label>
            <div className=" p-4 h-full bg-secondary-white gap-4 flex flex-col items-center justify-center">
              <p className="text-xs leading-[16px]">
                {attachments?.attachment1.file ? (
                  attachments?.attachment1?.filename
                ) : (
                  <>
                    Drag or choose your file to upload PNG, JPEG, GIF, WEBP, MP4
                    or MP3 (Max 10MB)
                  </>
                )}
              </p>
              <label
                htmlFor="attachment2"
                className="w-[114.8px] flex flex-col items-center justify-center h-[30.3px] bg-secondary text-xs leading-[16px]"
              >
                Browse File
              </label>
              <input
                type="file"
                hidden
                id="attachment1"
                onChange={(e) => handleUploadClick(e, "attachment1")}
              />
            </div>
          </div>

          <InputField
            label="Attachment 1 Caption"
            id="attachment1Caption"
            placeholder=""
            name="attachment1Caption"
            tabIndex={2}
            labelClassName="font-thin"
            inputClassName="bg-secondary-white w-full h-[141px] "
            multiline
            rows={3}
            aria-required={true}
            fullWidth
            error={!!errors["attachment1Caption"]}
            helperText={
              errors["attachment1Caption"]
                ? errors["attachment1Caption"].message
                : ""
            }
            control={control}
          />
        </div>

        <div className="flex items-stretch h-fit gap-4">
          <div className="w-2/3 flex flex-col gap-4">
            <label className="text-sm font-thin  leading-[16px]" htmlFor="">
              Attachment 2
            </label>
            <div className=" p-4 h-full bg-secondary-white gap-4 flex flex-col items-center justify-center">
              <p className="text-xs leading-[16px]">
                {attachments?.attachment2.file ? (
                  attachments?.attachment2?.filename
                ) : (
                  <>
                    {" "}
                    Drag or choose your file to upload PNG, JPEG, GIF, WEBP, or
                    MP4 (Max 10MB)
                  </>
                )}
              </p>
              <label
                htmlFor="attachment2"
                className="w-[114.8px] flex flex-col items-center justify-center h-[30.3px] bg-secondary text-xs leading-[16px]"
              >
                Browse File
              </label>
              <input
                type="file"
                hidden
                id="attachment1"
                onChange={(e) => handleUploadClick(e, "attachment2")}
              />
            </div>
          </div>

          <InputField
            label="Attachment 2 Caption"
            id="attachment2Caption"
            placeholder=""
            name="attachment2Caption"
            tabIndex={2}
            labelClassName="font-thin"
            inputClassName="bg-secondary-white w-full h-[141px] "
            multiline
            rows={3}
            aria-required={true}
            fullWidth
            error={!!errors["attachment2Caption"]}
            helperText={
              errors["attachment2Caption"]
                ? errors["attachment2Caption"].message
                : ""
            }
            control={control}
          />
        </div> */}
      </Stack>
    </FormContainer>
  );
};

export default ArtistInformation;
