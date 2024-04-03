import useAxiosAuth from "@/hooks/useAxiosAuth";
import { CheckBox } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useToast } from "@/providers/ToastProvider";

interface Props {
  collection: any;
  open: boolean;
  handleClose: () => void;
}
const AddArtworkToCollection: React.FC<Props> = ({
  collection,
  open,
  handleClose,
}) => {
  const router = useRouter();
  const [artworks, setArtWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [artPiecesToAdd, setArtPieceToAdd] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const fetchArtWorks = async () => {
    try {
      setLoading(true);
      const res = await axiosAuth.get(`/art-piece/creator`);

      // filter out artpiece that have already been added to the collection
      const filter = res?.data?.artPieces?.filter(
        (art) =>
          !collection?.artworks?.some((artPiece) => artPiece?._id === art?._id),
      );

      setArtWorks(filter);
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (artPiecesToAdd.length < 1) {
      setError(true);
      setErrorMessage("Please select at least one art piece");
    }
    try {
      setAdding(true);
      const resp = await Promise.all(
        artPiecesToAdd.map(async (id) => {
          const { data } = await axiosAuth.post(
            `/collection/add-art-work/${collection?._id}`,
            { artPieceId: id },
          );
        }),
      );
      router.replace(router.asPath);
      handleClose();
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchArtWorks();
  }, [collection]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <h4 className="items-center justify-center">Add Art Piece</h4>
      </DialogTitle>
      <DialogContent className="max-w-[550px] w-full overflow-y-auto">
        <Stack direction={"column"} spacing={1}>
          {loading &&
            [...Array(5)].map((_, ind) => (
              <Skeleton
                key={`skeleton_${ind}`}
                height={10}
                variant="rectangular"
                animation="wave"
              />
            ))}
        </Stack>

        <div className="lg:w-[550px] w-full">
          {artworks?.length > 0 &&
            artworks?.map((artpiece) => (
              <div
                key={artpiece?._id}
                className="grid items-center group grid-cols-2 gap-4 h-10"
              >
                <label className="text-lg font-medium" htmlFor={artpiece?._id}>
                  {artpiece?.title}
                </label>
                <Checkbox
                  size="medium"
                  checked={artPiecesToAdd.includes(artpiece?._id)}
                  id={artpiece?._id}
                  className="hover:bg-transparent hover:border-transparent group-hover:scale-70"
                  onChange={() => {
                    if (artPiecesToAdd.includes(artpiece?._id)) {
                      setArtPieceToAdd((prev) =>
                        prev.filter((item) => item !== artpiece?._id),
                      );
                    } else {
                      setArtPieceToAdd((prev) => [...prev, artpiece?._id]);
                    }
                  }}
                />
              </div>
            ))}

          {!artworks?.length && (
            <p className="text-center">No artwork available</p>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ borderRadius: "12px" }}
          className="tf-button style-1"
          onClick={handleClose}
        >
          Cancel
        </Button>
        {artworks?.length > 0 && (
          <LoadingButton
            sx={{ borderRadius: "12px" }}
            className="tf-button style-1"
            loading={adding}
            onClick={handleAdd}
          >
            Add
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddArtworkToCollection;
