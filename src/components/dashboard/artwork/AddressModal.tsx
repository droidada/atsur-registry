import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { TypeOf, boolean, object, string } from "zod";

interface Props {
  open: boolean;
  onClose: () => void;
}
const AddressModal: React.FC<Props> = ({ open, onClose }) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();

  const addressSchema = object({
    address: string().nonempty("Address is required"),
    country: string().nonempty("Date is required"),
    zipCode: string().optional(),
    state: string().optional(),
    city: string().optional(),
    contactName: string(),
    phone: string(),
    isDefault: boolean(),
  });

  type MetadataInput = TypeOf<typeof addressSchema>;

  const { mutate } = useMutation({});
  return (
    <Dialog
      PaperComponent={Paper}
      PaperProps={{
        component: "form",
        onSubmit: () => {},
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Add Address</DialogTitle>
      <DialogContent dividers></DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" className="bg-primary text-white">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressModal;
