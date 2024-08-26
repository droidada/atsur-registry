import { Dropzone, ExtFile } from "@dropzone-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaFile } from "react-icons/fa";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  handleUpload: (files: ExtFile[]) => void;
  label?: string;
  fileName?: string;
  maxSize?: number;
  defaultFile?: any;
  accept?: string;
  desc?: string;
  className?: string;
  maxFiles?: number;
  labelClassName?: string;
  dropzoneClassName?: string;
  previewHeightClassName?: string;
  uploadInfo?: string;
  isImage?: boolean;
  previewImage?: string;
  buttonClassName?: string;
}
const VerificationFileDroper: React.FC<Props> = ({
  handleUpload,
  label,
  fileName,
  maxSize,
  defaultFile,
  maxFiles,
  accept,
  desc,
  className,
  labelClassName,
  dropzoneClassName,
  previewHeightClassName,
  previewImage,
  isImage,
  buttonClassName,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const getCroppedImg = (imageSrc: any, crop: Crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = imageSrc.naturalWidth / imageSrc.width;
    const scaleY = imageSrc.naturalHeight / imageSrc.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(
      imageSrc,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob as Blob);
      }, "image/jpeg");
    });
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <label
        className={`text-sm   leading-[16px] ${labelClassName}`}
        htmlFor=""
      >
        {label}
      </label>
      <Dropzone
        maxFileSize={maxSize || 10 * 1024 * 1024}
        label={
          fileName || defaultFile?.filename
            ? `${fileName || defaultFile?.filename} `
            : `Drag or choose your file to upload PNG, JPEG, GIF, WEBP, or
                    MP4 (Max 10MB)`
        }
        footer={false}
        header={false}
        accept={accept || "image/*, video/*, application/pdf"}
        className={`p-4 h-full border-none  rounded-none ${
          !dropzoneClassName?.includes("bg") ? "bg-secondary-white" : ""
        } gap-4 text-xs leading-[16px] relative flex flex-col items-center justify-center ${dropzoneClassName}`}
        maxFiles={maxFiles || 1}
        onChange={handleUpload}
      >
        {isImage && (imageSrc || previewImage) ? (
          <div className="relative  w-full ">
            <ReactCrop
              className=" w-full h-full"
              crop={crop}
              onChange={(c) => setCrop(c)}
            >
              <img
                src={imageSrc || previewImage}
                alt=""
                style={{
                  maxWidth: "100%",
                  // width: "100%",
                  maxHeight: "300px",
                  margin: "auto",
                  // position: "absolute",
                  // top: 0,
                  // left: 0,
                }}
              />
            </ReactCrop>
            <div
              className={`flex flex-col items-center justify-center relative gap-4 ${previewHeightClassName}`}
            >
              {desc ||
                `Drag or choose your file to upload PNG, JPEG, GIF, WEBP, or
                    MP4 (Max 10MB)`}
              <label
                className={`w-[114.8px] flex flex-col items-center justify-center h-[30.3px] ${
                  !buttonClassName?.includes("bg") ? "bg-secondary" : ""
                } text-xs leading-[16px] ${buttonClassName}`}
              >
                Browse File
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            {fileName || defaultFile?.filename ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <FaFile size={24} />
                {maxFiles < 2 && <p> {fileName || defaultFile?.filename} </p>}
              </div>
            ) : (
              desc ||
              `Drag or choose your file to upload PNG, JPEG, GIF, WEBP, or
                    MP4 (Max 10MB)`
            )}
            <label
              className={`w-[114.8px] flex flex-col items-center justify-center h-[30.3px] ${
                !buttonClassName?.includes("bg") ? "bg-secondary" : ""
              } text-xs leading-[16px] ${buttonClassName}`}
            >
              Browse File
            </label>{" "}
          </div>
        )}
        {/* <FileMosaic file={file} className="w-full h-full" /> */}
      </Dropzone>
      {/* { isImage && imageSrc && (
        <button onC></button>
      )} */}
    </div>
  );
};

export default VerificationFileDroper;
