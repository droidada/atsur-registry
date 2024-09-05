import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useDebounce from "@/hooks/useDebounce";
import { useToast } from "@/providers/ToastProvider";

import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useState } from "react";

interface Props {
  series_id: string;
  open: boolean;
  handleClose: () => void;
}
const AddArtPieceToSeriesModal: React.FC<Props> = ({
  series_id,

  open,
  handleClose,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 500);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  const { data: artPieces, isLoading } = useQuery({
    queryKey: ["art-piece"],
    queryFn: async () => axiosAuth.get(`/art-piece/creator?limit=10`),
  });

  const {
    data,
    isLoading: onSubmitIsLoading,
    mutate,
  } = useMutation({
    mutationFn: (artPieceId: string) =>
      axiosAuth.post(`/art-series/${series_id}/art-pieces`, {
        artPieceId,
      }),
    onSuccess: () => {
      router.reload();
      toast.success("Artwork added successfully");
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  const handleSubmit = () => {
    if (selectedArtwork) {
      mutate(selectedArtwork?._id);
    } else {
      toast({
        message: "Please select an artwork before submitting",
        status: "warning",
      });
    }
  };

  const handleSelectArtwork = (artwork: any) => {
    setSelectedArtwork((prev) => (prev?._id === artwork._id ? null : artwork)); // Deselect if already selected
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: "bg-white py-8 max-w-[550px] w-full px-6",
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Artwork</DialogTitle>
      <DialogContent dividers>
        <TextField
          className="w-full"
          fullWidth
          variant="outlined"
          placeholder="Search collections..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-4">
          {isLoading ? (
            <>
              <CircularProgress color="inherit" size={20} />
            </>
          ) : (
            <div className="flex flex-wrap gap-2 items-stretch">
              {artPieces?.data?.artPieces?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleSelectArtwork(item)}
                  className={`w-[200px] ${
                    selectedArtwork?._id === item._id
                      ? "shadow-lg border-2 border-primary"
                      : ""
                  } hover:shadow-md p-2 rounded-md border-2 cursor-pointer`}
                >
                  <Image
                    width={200}
                    height={200}
                    src={item?.assets[0]?.url}
                    alt=""
                  />
                  <h6 className="text-center text-sm mt-2 font-semibold ">
                    {item?.title}
                  </h6>
                  <div className="flex gap-2 justify-center items-center ">
                    <Avatar
                      className="w-5 h-5 "
                      src={item?.custodian?.profile?.avatar as string}
                    />
                    <span className="text-xs ">
                      {item?.custodian?.profile?.firstName}{" "}
                      {item?.custodian?.profile?.lastName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={onSubmitIsLoading}
          className="bg-primary text-white"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddArtPieceToSeriesModal;
