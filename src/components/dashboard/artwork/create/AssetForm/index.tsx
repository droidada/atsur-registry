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
    primaryViewLandscape: "",
    mountedView: "",
    framedView: "",
    primaryViewPortrait: "",
  });

  const handleUploadClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    type:
      | "primaryViewLandscape"
      | "mountedView"
      | "framedView"
      | "primaryViewPortrait",
  ) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    // donot upload files more than 10mb
    if (file.size > 10000000) {
      toast.error("File size is too large");
      return;
    }
    reader.onloadend = function (e) {
      setFiles((prev) => ({ ...prev, [type]: reader.result }));
    }.bind(this);
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

  console.log(formData);

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
          <div className="w-full relative h-[162px] bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
            {(files.primaryViewLandscape ||
              formData?.assets?.primaryViewLandscape) && (
              <Image
                alt="primaryViewLandscape"
                src={
                  files.primaryViewLandscape ||
                  formData?.assets?.primaryViewLandscape
                }
                fill
                className="object-cover"
              />
            )}

            <div
              className={`flex flex-col gap-4 items-center relative ${
                files.primaryViewLandscape ||
                formData?.assets?.primaryViewLandscape
                  ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                  : ""
              }`}
            >
              <p className="text-[10px] leading-[16px] text-center">
                Drag or choose your file to upload PNG, JPEG, or WEBP, (Max
                10MB)
              </p>
              <label
                htmlFor="primaryViewLandscape"
                className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
              >
                Browse file
              </label>
              <input
                type="file"
                onChange={(e) => handleUploadClick(e, "primaryViewLandscape")}
                hidden
                accept="image/*"
                id="primaryViewLandscape"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* <h2 className="text-[17px] leading-[16px] ">Secondary View</h2> */}
          <div className="flex flex-col md:flex-row gap-4 items-center ">
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Portrait View</h4>
              <div className="w-full h-[162px] relative bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
                {(files.primaryViewPortrait ||
                  formData?.assets?.secondaryView?.primaryViewPortrait) && (
                  <Image
                    alt="primaryViewPortrait"
                    src={
                      files.primaryViewPortrait ||
                      formData?.assets?.secondaryView?.primaryViewPortrait
                    }
                    fill
                    className="object-cover"
                  />
                )}
                <div
                  className={`flex flex-col gap-4 items-center relative ${
                    files.primaryViewPortrait ||
                    formData?.assets?.secondaryView?.primaryViewPortrait
                      ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                      : ""
                  }`}
                >
                  <p className="text-[10px] leading-[16px] text-center">
                    Drag or choose your file to upload PNG, JPEG, or WEBP, (Max
                    10MB)
                  </p>
                  <label
                    htmlFor="primaryViewPortrait"
                    className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
                  >
                    Browse file
                  </label>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleUploadClick(e, "primaryViewPortrait")
                    }
                    hidden
                    accept="image/*"
                    id="primaryViewPortrait"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[14px] leading-[16px]">Framed View</h4>
              <div className="w-full h-[162px] relative bg-secondary p-4 gap-4 flex flex-col justify-center items-center">
                {(files.framedView ||
                  formData?.assets?.secondaryView?.framedView) && (
                  <Image
                    alt="framedView"
                    src={
                      files.framedView ||
                      formData?.assets?.secondaryView?.framedView
                    }
                    fill
                    className="object-cover"
                  />
                )}
                <div
                  className={`flex flex-col gap-4 items-center relative ${
                    files.framedView ||
                    formData?.assets?.secondaryView?.framedView
                      ? "backdrop-blur-sm bg-black/70 text-white p-4 drop-shadow-md"
                      : ""
                  }`}
                >
                  <p className="text-[10px] leading-[16px] text-center">
                    Drag or choose your file to upload PNG, JPEG, or WEBP, (Max
                    10MB)
                  </p>
                  <label
                    htmlFor="framedView"
                    className="w-[122px] cursor-pointer hover:bg-secondary-white grid place-items-center h-[32px] bg-[#CECDCD] font-normal text-[11px] leading-[16px] text-primary"
                  >
                    Browse file
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleUploadClick(e, "framedView")}
                    hidden
                    accept="image/*"
                    id="framedView"
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
                    Drag or choose your file to upload PNG, JPEG, or WEBP, (Max
                    10MB)
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
