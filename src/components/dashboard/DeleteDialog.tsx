import useAxiosAuth from "@/hooks/useAxiosAuth";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

import { error } from "console";
import { useRouter } from "next/router";
import { useToast } from "@/providers/ToastProvider";

interface Props {
  open: boolean;
  onClose: () => void;
  itemToDelete?: {
    itemType:
      | "publication"
      | "exhibition"
      | "appraisal"
      | "location"
      | "provenance"
      | "auction"
      | string;
    itemId: string;
  };
  deleteUrl?: string;
  artPieceId?: string;
  redirectUrl?: string;
  urlBody?: any;
  prompText?: string;
}

const DeleteDialog: React.FC<Props> = ({
  open,
  onClose,
  itemToDelete,
  artPieceId,
  deleteUrl,
  redirectUrl,
  urlBody,
  prompText,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      if (!deleteUrl && artPieceId) {
        if (Object.values(itemToDelete)?.length == 2) {
          const data = {
            artPieceId,
            // @ts-ignore
            [`${itemToDelete.itemType}Id`]: itemToDelete.itemId,
          };

          const result = await axiosAuth.post(
            // @ts-ignore
            `/${itemToDelete.itemType}/delete`,
            data,
          );
          onClose();
        } else {
          setIsError(true);
          setErrorMessage("No Data selected");
        }
      } else {
        const result = await axiosAuth.post(deleteUrl, { ...urlBody });
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.replace(router.asPath);
        }
        onClose();
      }
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h3" sx={{ textTransform: "capitalize" }}>
        {itemToDelete?.itemType}
      </DialogTitle>
      <DialogContent>
        {prompText ||
          `Are you sure your want to delete this ${itemToDelete?.itemType}?`}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ borderRadius: "12px" }}
          className="tf-button style-1"
          onClick={onClose}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ borderRadius: "12px" }}
          className="tf-button style-1"
          loading={isLoading}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
