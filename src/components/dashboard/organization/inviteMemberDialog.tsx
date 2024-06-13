import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  organizationId: string;
}
const inviteMemberDialog: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog maxWidth={"sm"} open={open} onClose={handleClose}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent dividers></DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default inviteMemberDialog;
