import { Dropzone, ExtFile } from "@dropzone-ui/react";
import Image from "next/image";
import React from "react";
import { FaFile } from "react-icons/fa";

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
  previewImage,
  isImage,
  buttonClassName,
}) => {
  return (
    <div className={`w-2/3 flex flex-col gap-4 ${className}`}>
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
        } gap-4 text-xs leading-[16px] relat flex flex-col items-center justify-center ${dropzoneClassName}`}
        maxFiles={maxFiles || 1}
        onChange={handleUpload}
      >
        {isImage && previewImage ? (
          <>
            <Image
              src={previewImage as string}
              fill
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="flex flex-col items-center justify-center relative gap-4">
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
          </>
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
    </div>
  );
};

export default VerificationFileDroper;
