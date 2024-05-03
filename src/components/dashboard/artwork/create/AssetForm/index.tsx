import ICreateArtworkFormData from "@/types/models/createArtwork";
import CreateArtWorkFormContainer from "../FormContainer";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useToast } from "@/providers/ToastProvider";
import Image from "next/image";

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
    primaryView: "",
    mountedView: "",
    rightAngleView: "",
    leftAngleView: "",
  });

  const handleUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "primaryView" | "mountedView" | "rightAngleView" | "leftAngleView",
  ) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setFiles((prev) => ({ ...prev, [type]: reader.result }));
    }.bind(this);
  };
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files.primaryView && !formData?.assets?.primaryView) {
      toast.error("Primary View image is required");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      assets: {
        primaryView: files.primaryView || formData?.assets?.primaryView,
        secondaryView: {
          mountedView:
            files.mountedView || formData?.assets?.secondaryView?.mountedView,
          leftAngleView:
            files.leftAngleView ||
            formData?.assets?.secondaryView?.leftAngleView,
          rightAngleView:
            files.rightAngleView ||
            formData?.assets?.secondaryView?.rightAngleView,
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
          <h2 className="text-[17px] leading-[16px] ">Primary View</h2>
          <div className="w-full relative h-[162px] bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
            {(files.primaryView || formData?.assets?.primaryView) && (
              <Image
                alt="primaryView"
                src={files.primaryView || formData?.assets?.primaryView}
                fill
                className="object-cover"
              />
            )}

            <div
              className={`flex flex-col gap-4 items-center relative ${
                files.primaryView || formData?.assets?.primaryView
                  ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                  : ""
              }`}
            >
              <p className="text-[10px] leading-[16px] text-center">
                Drag or choose your file to upload PNG, JPEG, GIF, WEBP, MP4 or
                MP3 (Max 1GB)
              </p>
              <label
                htmlFor="primaryView"
                className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
              >
                Browse file
              </label>
              <input
                type="file"
                onChange={(e) => handleUploadClick(e, "primaryView")}
                hidden
                accept="image/*"
                id="primaryView"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-[17px] leading-[16px] ">Secondary View</h2>
          <div className="flex flex-col md:flex-row gap-4 items-center ">
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Left Angle View</h4>
              <div className="w-full h-[162px] relative bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
                {(files.leftAngleView ||
                  formData?.assets?.secondaryView?.leftAngleView) && (
                  <Image
                    alt="leftAngleView"
                    src={
                      files.leftAngleView ||
                      formData?.assets?.secondaryView?.leftAngleView
                    }
                    fill
                    className="object-cover"
                  />
                )}
                <div
                  className={`flex flex-col gap-4 items-center relative ${
                    files.leftAngleView ||
                    formData?.assets?.secondaryView?.leftAngleView
                      ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                      : ""
                  }`}
                >
                  <p className="text-[10px] leading-[16px] text-center">
                    Drag or choose your file to upload PNG, JPEG, GIF, WEBP, MP4
                    or MP3 (Max 1GB)
                  </p>
                  <label
                    htmlFor="leftAngleView"
                    className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
                  >
                    Browse file
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadClick(e, "leftAngleView")}
                    hidden
                    accept="image/*"
                    id="leftAngleView"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Right Angle View</h4>
              <div className="w-full h-[162px] relative bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
                {(files.rightAngleView ||
                  formData?.assets?.secondaryView?.rightAngleView) && (
                  <Image
                    alt="rightAngleView"
                    src={
                      files.rightAngleView ||
                      formData?.assets?.secondaryView?.rightAngleView
                    }
                    fill
                    className="object-cover"
                  />
                )}
                <div
                  className={`flex flex-col gap-4 items-center relative ${
                    files.rightAngleView ||
                    formData?.assets?.secondaryView?.rightAngleView
                      ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                      : ""
                  }`}
                >
                  <p className="text-[10px] leading-[16px] text-center">
                    Drag or choose your file to upload PNG, JPEG, GIF, WEBP, MP4
                    or MP3 (Max 1GB)
                  </p>
                  <label
                    htmlFor="rightAngleView"
                    className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
                  >
                    Browse file
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadClick(e, "rightAngleView")}
                    hidden
                    accept="image/*"
                    id="rightAngleView"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Mounted View</h4>
              <div className="w-full h-[162px] relative bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
                {(formData?.assets?.secondaryView?.mountedView ||
                  files.mountedView) && (
                  <Image
                    alt="mountedView"
                    src={
                      formData?.assets?.secondaryView?.mountedView ||
                      files.mountedView
                    }
                    fill
                    className="object-cover"
                  />
                )}
                <div
                  className={`flex flex-col gap-4 items-center relative ${
                    formData?.assets?.secondaryView?.mountedView ||
                    files.mountedView
                      ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                      : ""
                  }`}
                >
                  <p className="text-[10px] leading-[16px] text-center">
                    Drag or choose your file to upload PNG, JPEG, GIF, WEBP, MP4
                    or MP3 (Max 1GB)
                  </p>
                  <label
                    htmlFor="mountedView"
                    className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
                  >
                    Browse file
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadClick(e, "mountedView")}
                    hidden
                    accept="image/*"
                    id="mountedView"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Stack>
    </CreateArtWorkFormContainer>
  );
};

export default AssetsForm;
