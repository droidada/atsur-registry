import LoadingButton from "@/components/Form/LoadingButton";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  isLoading?: boolean;
}

const FormDialogContainer: React.FC<Props> = ({
  open,
  handleClose,
  title,
  onSubmit,
  children,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: onSubmit,
        className: "bg-white p-2 max-w-[680px] w-full px-6",
      }}
    >
      <DialogTitle className="font-[400] p-0 text-3xl md:text-4xl  border-secondary border-b-[1px] lg:text-[50px] lg:leading-[70px]">
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
        <div className="flex gap-4 items-center mt-6">
          <LoadingButton
            className="w-[156.68px] h-[41.7px] bg-primary text-white font-[600] text-[16px] leading-[16px]"
            loading={isLoading}
            type="submit"
          >
            Submit
          </LoadingButton>
          <Button
            className="w-[156.68px] h-[41.7px] bg-primary text-white font-[600] text-[16px] leading-[16px]"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialogContainer;
