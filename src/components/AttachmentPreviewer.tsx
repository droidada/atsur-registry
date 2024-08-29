import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Document, Page } from "react-pdf";
import axios from "@/lib/axios";

export function getFileType(url: string) {
  const extension = url?.split(".").pop();
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    mp4: "video/mp4",
    webm: "video/webm",
    pdf: "application/pdf",
  };
  return mimeTypes[extension] || "unknown";
}

interface Props {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
}

const AttachmentPreviewer: React.FC<Props> = ({ open, onClose, fileUrl }) => {
  const [fileType, setFileType] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const fetFileType = () => {
    const type = getFileType(fileUrl);


    setFileType(type);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  React.useEffect(() => {
    fetFileType();
  }, [fileUrl]);

  return (
    <Dialog
      PaperComponent={Paper}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Attachment Previewer</DialogTitle>
      <DialogContent dividers>
        {fileType?.startsWith("image/") ? (
          <Image
            width={450}
            height={450}
            className="w-full h-full object-cover"
            src={fileUrl}
            alt="Preview"
          />
        ) : fileUrl?.startsWith("video/") ? (
          <ReactPlayer
            width={450}
            height={450}
            className="w-full h-full"
            url={fileUrl}
          />
        ) : fileType?.startsWith("application/pdf") ? (
          <>
            <div>
              <button onClick={goToPrevPage}>Prev</button>
              <button onClick={goToNextPage}>Next</button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </>
        ) : (
          <Typography>File type not supported.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AttachmentPreviewer;
