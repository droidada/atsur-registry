import { Dropzone, ExtFile } from "@dropzone-ui/react";
import React from "react";
import { FaFile } from "react-icons/fa";

interface Props {
  handleUpload: (files: ExtFile[]) => void;
  label: string;
  fileName?: string;
  maxSize?: number;
  defaultFile?: any;
  accept?: string;
  desc?: string;
  className?: string;
  maxFiles?: number;
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
}) => {
  return (
    <div className={`w-2/3 flex flex-col gap-4 ${className}`}>
      <label className="text-sm font-thin  leading-[16px]" htmlFor="">
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
        className="p-4 h-full border-none  rounded-none bg-secondary-white gap-4 text-xs leading-[16px] flex flex-col items-center justify-center"
        maxFiles={maxFiles || 1}
        onChange={handleUpload}
      >
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
            htmlFor="attachment2"
            className="w-[114.8px] flex flex-col items-center justify-center h-[30.3px] bg-secondary text-xs leading-[16px]"
          >
            Browse File
          </label>{" "}
        </div>
        {/* <FileMosaic file={file} className="w-full h-full" /> */}
      </Dropzone>
    </div>
  );
};

export default VerificationFileDroper;
