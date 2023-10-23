import * as React from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  content: React.ReactNode;
  open: boolean;
  showCancel: boolean;
  onConfirm: (confirmed?: boolean) => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogRawProps) {
  const { onConfirm, open, content, showCancel, ...other } = props;

  //   const radioGroupRef = React.useRef<HTMLElement>(null);
  //   const handleEntering = () => {
  //     if (radioGroupRef.current != null) {
  //       radioGroupRef.current.focus();
  //     }
  //   };

  const handleCancel = () => {
    onConfirm(false);
  };

  const handleOk = () => {
    onConfirm(true);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      //   TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        {showCancel && (
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
