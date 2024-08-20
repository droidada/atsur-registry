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
import React, { useState } from "react";

interface Props {
  artist: any;
}
const ArtitstTable: React.FC<Props> = ({ artist }) => {
  const [text, setText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {[
              "Story Behind Art Piece",
              "Plan To Sell",
              "Video",
              "Notes",
              "Agreement Document",
            ].map((col) => (
              <TableCell
                key={`table-head-${col}`}
                className="bg-primary text-white text-md font-[600]"
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <span
                onClick={() => {
                  setText(artist?.storyTelling);
                  setOpenDialog(true);
                }}
              >
                {artist?.storyTelling?.split(" ").splice(0, 5).join(" ")}
              </span>
            </TableCell>
            <TableCell>{artist?.planToSell ? "Yes" : "No"}</TableCell>
            <TableCell>
              <span>{artist?.creationVideo?.split("/").pop()}</span>
            </TableCell>
            <TableCell>{artist?.notes}</TableCell>
            <TableCell>
              <span>{artist?.agreementDocument?.split("/").pop()}</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContentText>{text}</DialogContentText>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ArtitstTable;
