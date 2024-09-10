import ProtectedPage from "@/HOC/Protected";
import axios from "@/lib/axios";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import NoData from "@/components/dashboard/NoData";
import Link from "next/link";
import Image from "next/image";
import LoadingButton from "@/components/Form/LoadingButton";
import AddArtPieceToSeriesModal from "@/components/dashboard/series/AddArtPieceToSeriesModal";
import { useRouter } from "next/router";
import { useToast } from "@/providers/ToastProvider";
import CreateSeriesModal from "@/components/dashboard/series/CreateSeriesModal";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-series/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { series: res?.data?.data } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};
const SeriesDetails = ({ series }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddArtWork, setOpenAddArtWork] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [openRemoveArtwork, setOpenRemoveArtwork] = useState(false);
  const toast = useToast();
  const [removingArtId, setRemovingArtId] = useState<string | null>(null);

  const { data: artPieces, isLoading } = useQuery({
    queryKey: ["series-artPieces", currentPage, series?._id],
    queryFn: () =>
      axiosAuth.get(
        `art-series/${series?._id}/art-pieces?page=${currentPage}&limit=20`,
      ),
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading: onSubmitIsLoading } = useMutation({
    mutationFn: (artPieceId: string) =>
      axiosAuth.put(`art-series/${series?._id}/art-pieces`, {
        artPieceId,
      }),

    onSuccess: () => {
      // toast.success("Artwork removed successfully");
      setRemovingArtId(null);
      setOpenRemoveArtwork(false);
      router.push(router.asPath);
    },
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  return (
    <>
      <Stack spacing={4}>
        <Stack direction={["column", "row"]} justifyContent={"space-between"}>
          <h1 className="text-2xl font-bold">{series?.title}</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setOpenEdit(true)}
              className="bg-primary text-white"
            >
              Edit
            </Button>
            <Button
              onClick={() => setOpenDeleteDialog(true)}
              className="bg-[#a90202] text-white"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Stack>
        <p className="text-sm">{series?.description}</p>

        <div className="flex flex-col gap-5">
          <div className="w-full flex justify-between items-center font-bold border-b-2 border-primary mb-4 pb-2">
            <h2>Series Artworks</h2>
            <Button
              onClick={() => setOpenAddArtWork(true)}
              className="bg-primary text-white"
            >
              Add Artwork
            </Button>
          </div>

          {isLoading ? (
            <div className="grid place-items-center min-h-[450px]">
              <CircularProgress color="inherit" size={40} />
            </div>
          ) : artPieces?.data?.data?.length > 0 ? (
            <div className="grid grid-cols-auto-fit gap-4">
              {artPieces?.data?.data?.map((artwork) => (
                <div
                  key={artwork._id}
                  className={`relative rounded-md border-2 p-2 ${
                    artPieces?.data?.data?.length < 2 ? "max-w-[250px]" : ""
                  } w-full`}
                >
                  <Link
                    href={`/dashboard/artworks/${artwork._id}`}
                    className="block"
                  >
                    <Image
                      src={artwork?.assets[0]?.url}
                      alt={artwork?.title}
                      width={250}
                      height={250}
                      className="w-full rounded-md"
                    />
                    <p className="text-center font-semibold mt-2">
                      {artwork?.title}
                    </p>
                  </Link>
                  <Button
                    onClick={(e) => {
                      console.log(artwork._id);
                      setRemovingArtId(artwork._id);
                      setOpenRemoveArtwork(true);
                    }}
                    className="bg-primary text-white w-full mt-2"
                  >
                    Remove Artwork
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <NoData text="No artworks found" />
          )}
        </div>

        <Dialog
          open={openRemoveArtwork}
          onClose={() => setOpenRemoveArtwork(false)}
        >
          <DialogTitle>Remove Artwork </DialogTitle>
          <DialogContent dividers>
            <p>Are you sure you want to remove this artwork?</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenRemoveArtwork(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={() => mutate(removingArtId)}
              loading={onSubmitIsLoading}
              className="bg-primary text-white"
            >
              {" "}
              Remove
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <CreateSeriesModal
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          series={series}
        />
        <DeleteDialog
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          series_id={series?._id as string}
        />

        <AddArtPieceToSeriesModal
          open={openAddArtWork}
          handleClose={() => setOpenAddArtWork(false)}
          series_id={series?._id}
        />
      </Stack>
    </>
  );
};

export default ProtectedPage(SeriesDetails);

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  series_id: string;
}
const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  series_id,
}) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => axiosAuth.delete(`/art-series/${series_id}`),
    onSuccess: () => {
      // toast.success("Series deleted successfully");
      router.push("/dashboard/series");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

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
      <DialogTitle>Delete Series</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this series?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => mutate()}
          className="bg-primary text-white"
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
