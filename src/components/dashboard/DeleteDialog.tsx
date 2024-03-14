import useAxiosAuth from "@/hooks/useAxiosAuth";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import SnackBarAlert from "../common/SnackBarAlert";
import { error } from "console";

interface Props {
  open: boolean;
  onClose: () => void;
  itemToDelete: {
    itemType: "publication" | "exhibition" | "appraisal" | "";
    itemId: string;
  };

  artPieceId: string;
}

const DeleteDialog: React.FC<Props> = ({
  open,
  onClose,
  itemToDelete,
  artPieceId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosAuth = useAxiosAuth();

  const handleDelete = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

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
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message);
      } else {
        setErrorMessage("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textTransform: "capitalize" }}>
        {itemToDelete?.itemType}
      </DialogTitle>
      <DialogContent>
        Are you sure your want to delete this {itemToDelete?.itemType}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={isLoading} onClick={handleDelete}>
          Delete
        </LoadingButton>
      </DialogActions>

      <SnackBarAlert
        open={isError}
        onClose={() => setIsError(false)}
        message={errorMessage}
        type="error"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Dialog>
  );
};

export default DeleteDialog;
