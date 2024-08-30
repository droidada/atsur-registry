import LoadingButton from "@/components/Form/LoadingButton";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useDebounce from "@/hooks/useDebounce";
import axios from "@/lib/axios";
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
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React, { useState } from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/featured-art-pieces`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res?.data);

    return { props: { featuredArtworks: res?.data?.featuredArtpieces } };
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
const PublicFeaturedArtworks = ({ featuredArtworks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
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
  >(featuredArtworks);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      axiosAuth.post("/public/featured-art-pieces", {
        artPieces: data,
      }),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
    onSuccess: () => {
      toast.success("Collection added successfully");
    },
  });

  const handleSubmit = () => {
    if (artworks.length !== 4) {
      toast.error("Artworks must be 4");
      return;
    }
    if (artworks.every((item) => !item._id)) {
      toast.error("Please add all collections");
      return;
    }
    // @ts-ignore
    mutate(artworks.map((item) => item._id));
  };

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold">Featured Artworks</h1>

      <form>
        <div className="flex flex-wrap items-stretch  gap-4">
          {[...Array(4)].map((item, index) => (
            <div
              onClick={() => {
                setCurrentIndex(index);
                setOpenModal(true);
              }}
              key={`featured-artwork-${index}`}
              className="border-2 hover:shadow-md p-2 flex items-center flex-col cursor-pointer rounded-md max-w-[250px] min-h-[250px] w-full "
            >
              {artworks[index]?.assets && (
                <Image
                  src={artworks[index]?.assets[0]?.url || ""}
                  alt=""
                  width={200}
                  height={200}
                />
              )}

              {artworks[index] && (
                <>
                  <h6 className="text-center text-sm mt-2 font-semibold ">
                    {artworks[index]?.title}
                  </h6>
                  <div className="flex gap-2 justify-center items-center ">
                    <Avatar
                      className="w-5 h-5 "
                      src={
                        artworks[index]?.custodian?.profile?.avatar as string
                      }
                    />
                    <span className="text-xs ">
                      {artworks[index]?.custodian?.profile?.firstName}{" "}
                      {artworks[index]?.custodian?.profile?.lastName}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className=" mt-4  flex justify-end">
          <LoadingButton
            loading={isLoading}
            onClick={handleSubmit}
            className=" bg-primary text-white"
          >
            Update
          </LoadingButton>
        </div>
      </form>
      <AddArtPieceDialog
        setArtworks={setArtworks}
        index={currentIndex}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </AdminDashboardLayout>
  );
};

export default PublicFeaturedArtworks;

interface Props {
  open: boolean;
  handleClose: () => void;
  setArtworks: React.Dispatch<
    React.SetStateAction<
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
    >
  >;
  index: number;
}
const AddArtPieceDialog: React.FC<Props> = ({
  open,
  handleClose,
  setArtworks,
  index,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

  const { data: artPieces, isLoading } = useQuery({
    queryKey: ["art-piece"],
    queryFn: async () =>
      axiosAuth.get(`/art-piece/list?search=${debouncedQuery}&limit=10`),

    enabled: Boolean(debouncedQuery),
  });

  const handleSubmit = () => {
    setArtworks((prev) => {
      const data = prev;
      data[index] = selectedArtwork;
      return data;
    });

    handleClose();
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
      <DialogTitle>Add Collection</DialogTitle>
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
                  onClick={() => {
                    setSelectedArtwork(item);
                  }}
                  className={`w-[200px]  ${
                    item?._id == selectedArtwork?._id ? "shadow-lg" : ""
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

              {/* <Pagination  /> */}
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
          loading={false}
          className="bg-primary text-white"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
