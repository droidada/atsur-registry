import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  artist: any;
}
const ArtitstTable: React.FC<Props> = ({ artist }) => {
  const [text, setText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);



  return (
    <>
      <span className="font-[600]  ">Artwork Story</span>
      <span className="font-[400]">{artist?.storyTelling}</span>
      <span className="font-[600]  ">Plan to Sell</span>
      <span className="font-[400]">{artist?.planToSell ? "Yes" : "No"}</span>
      <span className="font-[600]  ">Video</span>
      <span className="font-[400]">
        <Link
          href={artist?.creationVideo?.url}
          download={true}
          className="p-2 bg-secondary"
        >
          View Video
        </Link>
      </span>
      {artist?.attachments?.map(
        (item, index) =>
          item && (
            <>
              <span className="font-[600]  ">
                Agreement Document {index + 1}
              </span>
              <span className="font-[400]">
                <Link
                  href={item?.url}
                  target="_blank"
                  download={true}
                  className="p-2 bg-secondary"
                >
                  View Document
                </Link>
              </span>
            </>
          ),
      )}
    </>
  );
};

export default ArtitstTable;
