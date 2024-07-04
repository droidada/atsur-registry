import ICreateArtworkFormData from "@/types/models/createArtwork";
import CreateArtWorkFormContainer from "../FormContainer";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useToast } from "@/providers/ToastProvider";
import Image from "next/image";
import VerificationFileDroper from "../../Verification/VerificationFileDroper";

interface Props {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<ICreateArtworkFormData>>;
  formData: ICreateArtworkFormData;
}
const AssetsForm: React.FC<Props> = ({
  setActiveIndex,
  setFormData,
  formData,
}) => {
  const [files, setFiles] = useState({
    primaryViewLandscape: "",
    mountedView: "",
    framedView: "",
    primaryViewPortrait: "",
  });

  const handleUploadClick = (
    files,
    type:
      | "primaryViewLandscape"
      | "mountedView"
      | "framedView"
      | "primaryViewPortrait",
  ) => {
    let file = files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file.file);

    reader.onloadend = function (e) {
      setFiles((prev) => ({ ...prev, [type]: reader.result }));
    };
  };
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !files.primaryViewLandscape &&
      !formData?.assets?.primaryViewLandscape
    ) {
      toast.error("Primary View image is required");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      assets: {
        primaryViewLandscape:
          files.primaryViewLandscape || formData?.assets?.primaryViewLandscape,
        secondaryView: {
          mountedView:
            files.mountedView || formData?.assets?.secondaryView?.mountedView,
          primaryViewPortrait:
            files.primaryViewPortrait ||
            formData?.assets?.secondaryView?.primaryViewPortrait,
          framedView:
            files.framedView || formData?.assets?.secondaryView?.framedView,
        },
      },
    }));
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <CreateArtWorkFormContainer
      handleGoBack={() => {
        console.log("hello");
        setActiveIndex((prev) => prev - 1);
      }}
      onSubmit={handleSubmit}
    >
      <Stack spacing={4}>
        <div className="flex flex-col gap-4">
          <h2 className="text-[17px] leading-[16px] ">
            Primary View [Landscape] *
          </h2>
          <VerificationFileDroper
            maxSize={10 * 1024 * 1024}
            maxFiles={1}
            desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
            handleUpload={(e) => handleUploadClick(e, "primaryViewLandscape")}
            className="w-full"
            buttonClassName="bg-[#CECDCD]"
            dropzoneClassName="w-full relative h-[162px] bg-secondary"
            accept="image/png, image/jpeg, image/webp"
            previewImage={
              files.primaryViewLandscape ||
              formData?.assets?.primaryViewLandscape
            }
            isImage={true}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center ">
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Portrait View</h4>
              <VerificationFileDroper
                maxSize={10 * 1024 * 1024}
                maxFiles={1}
                desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
                handleUpload={(e) =>
                  handleUploadClick(e, "primaryViewPortrait")
                }
                className="w-full"
                buttonClassName="bg-[#CECDCD]"
                dropzoneClassName="w-full relative h-[162px] bg-secondary"
                accept="image/png, image/jpeg, image/webp"
                previewImage={
                  files.primaryViewPortrait ||
                  formData?.assets?.secondaryView?.primaryViewPortrait
                }
                isImage={true}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Framed View</h4>
              <VerificationFileDroper
                maxSize={10 * 1024 * 1024}
                maxFiles={1}
                desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
                handleUpload={(e) => handleUploadClick(e, "framedView")}
                className="w-full"
                buttonClassName="bg-[#CECDCD]"
                dropzoneClassName="w-full relative h-[162px] bg-secondary"
                accept="image/png, image/jpeg, image/webp"
                previewImage={
                  files.framedView ||
                  formData?.assets?.secondaryView?.framedView
                }
                isImage={true}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Mounted View</h4>
              <VerificationFileDroper
                maxSize={10 * 1024 * 1024}
                maxFiles={1}
                desc="Drag or choose your file to upload PNG, JPEG, or WEBP, (Max 10MB)"
                handleUpload={(e) => handleUploadClick(e, "mountedView")}
                className="w-full"
                buttonClassName="bg-[#CECDCD]"
                dropzoneClassName="w-full relative h-[162px] bg-secondary"
                accept="image/png, image/jpeg, image/webp"
                previewImage={
                  formData?.assets?.secondaryView?.mountedView ||
                  files.mountedView
                }
                isImage={true}
              />
            </div>
          </div>
        </div>
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default AssetsForm;
