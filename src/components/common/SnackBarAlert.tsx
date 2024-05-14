import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";

interface Props {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
  anchorOrigin?: {
    vertical: "bottom" | "top";
    horizontal: "left" | "right" | "center";
  };
}
const SnackBarAlert: React.FC<Props> = ({
  message,
  onClose,
  open,
  duration,
  type,
  anchorOrigin,
}) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      open={open}
      autoHideDuration={duration || 5000}
    >
      <Alert
        variant="filled"
        sx={{ width: "100%" }}
        severity={type}
        onClose={onClose}
      >
        <Typography variant="body1">{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default SnackBarAlert;
