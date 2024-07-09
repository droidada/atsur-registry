import React from "react";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import LoadingButton from "@/components/Form/LoadingButton";

interface Props {
  title: string;
  body: string;
  open: boolean;
  isLoading?: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}
const DeleteDialog: React.FC<Props> = ({
  title,
  body,
  open,
  handleClose,
  handleDelete,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "bg-white py-8 max-w-[480px] w-full px-6",
      }}
    >
      <DialogTitle className="font-[600] p-0 text-2xl  mb-4  border-secondary ">
        Delete {title}
      </DialogTitle>
      <DialogContent dividers>
        <p className="tex-sm">{body}</p>
      </DialogContent>
      <div className="flex gap-4 items-center mt-6">
        <LoadingButton
          className="w-[156.68px] h-[41.7px] bg-primary text-white font-[600] text-[16px] leading-[16px]"
          loading={isLoading}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
        <Button
          className="w-[156.68px] h-[41.7px] bg-primary text-white font-[600] text-[16px] leading-[16px]"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
