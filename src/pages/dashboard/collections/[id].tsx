import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";

import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import axiosMain from "axios";

import AddArtworkToCollection from "@/components/dashboard/add-artwork-to-collection";
import Image from "next/image";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { FormatColorResetSharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import ProtectedPage from "@/HOC/Protected";
import { MdDeleteOutline } from "react-icons/md";
import NoData from "@/components/dashboard/NoData";
import AddArtPieceModal from "@/components/dashboard/collection/AddArtPieceModal";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import LoadingButton from "@/components/Form/LoadingButton";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/collection/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    return { props: { collection: res.data.collection } };
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

function Collection({ collection }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddArtWork, setOpenAddArtWork] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<any>({});
  const [openRemoveArtwork, setOpenRemoveArtwork] = useState(false);
  const [removingArtId, setRemovingArtId] = useState<string | null>(null); // Track the artwork being removed
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [artworks, setArtworks] = useState<
    {
      title: string;
      assets: { url: string }[];
      custodian: {
        profile: {
          firstName: string;
          lastName: string;
          avatar: string;
        };
      };
      _id: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: (artPieceId: string) =>
      axiosAuth.post(`/collection/remove-art-work/${collection._id}`, {
        artPieceId,
      }),
    onMutate: (artPieceId: string) => {
      setRemovingArtId(artPieceId); // Set the ID of the artwork being removed
    },
    onSuccess: () => {
      setRemovingArtId(null); // Reset after success
      router.push(router.asPath);
    },
    onError: (error: any) => {
      setRemovingArtId(null); // Reset on error
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  return (
    <>
      <Stack spacing={4}>
        <Stack direction={["column", "row"]} justifyContent={"space-between"}>
          <h1 className="text-2xl font-bold">{collection?.title}</h1>
          <div className="flex gap-2">
            <Button className="bg-primary text-white">Edit</Button>
            <Button
              onClick={() => setOpenDeleteDialog(true)}
              className="bg-[#a90202] text-white"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Stack>
        <p className="text-sm">{collection?.description}</p>

        <div className="flex flex-col gap-5">
          <div className="w-full flex justify-between items-center font-bold border-b-2 border-primary mb-4 pb-2">
            <h2> Artworks</h2>
            <Button
              onClick={() => setOpenAddArtWork(true)}
              className="bg-primary text-white"
            >
              Add Artwork
            </Button>
          </div>

          {collection?.artworks?.length > 0 ? (
            <div className="grid grid-cols-auto-fit gap-4">
              {collection?.artworks?.map((artwork) => (
                <Link
                  href={`/dashboard/artworks/${artwork._id}`}
                  key={artwork._id}
                  className="relative rounded-md border-2 p-2 w-full "
                >
                  <Image
                    src={artwork?.assets[0]?.url}
                    alt=""
                    width={250}
                    height={250}
                    className="w-full rounded-md"
                  />
                  <p className="text-center font-semibold mt-2">
                    {artwork?.title}
                  </p>
                  <LoadingButton
                    onClick={() => mutate(artwork?._id)}
                    loading={isLoading && removingArtId === artwork._id} // Only show loading for the current artwork
                    className="bg-primary text-white w-full"
                  >
                    Remove Artwork
                  </LoadingButton>
                </Link>
              ))}
            </div>
          ) : (
            <NoData text="No artworks found" />
          )}
        </div>
        <AddArtPieceModal
          collection_id={collection?._id}
          setArtworks={setCurrentArtwork}
          open={openAddArtWork}
          handleClose={() => setOpenAddArtWork(false)}
        />
        <DeleteDialog
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          collection_id={collection?._id}
        />
      </Stack>
    </>
  );
}

Collection.requireAuth = true;
export default ProtectedPage(Collection);

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  collection_id: string;
}
const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  collection_id,
}) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => axiosAuth.delete(`/collection/${collection_id}`),
    onSuccess: () => {
      // toast.success("Collection deleted successfully");
      router.push("/dashboard/collections");
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
      <DialogTitle>Delete Collection</DialogTitle>
      <DialogContent dividers>
        Are you sure you want to delete this collection?
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
