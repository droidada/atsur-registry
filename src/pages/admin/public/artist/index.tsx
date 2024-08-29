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
import React, { useState } from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/top-artists`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { topArtists: res?.data?.topArtist } };
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

const PublicArtist = ({ topArtists }) => {
  const [artists, setArtists] = useState<
    {
      firstName: string;
      lastName: string;
      id: string;
      avatar: string;
    }[]
  >(topArtists || []);
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const toast = useToast();
  const axiosAuth = useAxiosAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      axiosAuth.post("/public/top-artists", {
        artists: data,
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
    if (artists.every((item) => !item.id)) {
      toast.error("Please add all collections");
      return;
    }
    // @ts-ignore
    mutate(artists.map((item) => item.id));
  };

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold">Top Artist</h1>

      <form className=" mt-4 ">
        <div className="grid  md:grid-cols-2  lg:grid-cols-4 gap-4">
          {[...Array(10)].map((item, index) => (
            <div
              onClick={() => {
                setOpenModal(true);
                setCurrentIndex(index);
              }}
              key={`artist-collection-${index}`}
              className="flex shadow-md p-2 cursor-pointer rounded-md gap-2  items-center flex-col"
            >
              <Avatar
                src={artists[index]?.avatar}
                className="w-20 h-20  hover:shadow-md  "
              />
              <p className="text-sm font-semibold">
                {artists[index]?.firstName} {artists[index]?.lastName}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <LoadingButton
            loading={isLoading}
            onClick={handleSubmit}
            className=" bg-primary text-white"
          >
            Update
          </LoadingButton>
        </div>
      </form>

      <TopArtistModal
        setTopArtist={setArtists}
        index={currentIndex}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </AdminDashboardLayout>
  );
};

export default PublicArtist;

interface Props {
  open: boolean;
  handleClose: () => void;
  setTopArtist: React.Dispatch<React.SetStateAction<any[]>>;
  index: number;
}

const TopArtistModal: React.FC<Props> = ({
  open,
  handleClose,
  setTopArtist,
  index,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  const { data: artists, isLoading } = useQuery({
    queryKey: ["top-artist"],
    queryFn: async () =>
      axiosAuth.get(`/user/list?search=${debouncedQuery}&limit=10&page=1`),

    enabled: Boolean(debouncedQuery),
  });

  const handleSubmit = () => {
    setTopArtist((prev) => {
      const data = prev;
      data[index] = selectedArtist;
      return data;
    });

    handleClose();
  };

  return (
    <Dialog
      PaperProps={{
        className: "bg-white py-8 max-w-[550px] w-full px-6",
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Add Artist</DialogTitle>
      <DialogContent dividers>
        <TextField
          className="w-full"
          fullWidth
          variant="outlined"
          placeholder="Search Artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-4">
          {isLoading ? (
            <>
              <CircularProgress color="inherit" size={20} />
            </>
          ) : (
            <div className="grid md:grid-cols-4  gap-2">
              {artists?.data?.users?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedArtist(item);
                  }}
                  className={`${
                    item?.id == selectedArtist?.id ? "shadow-lg" : ""
                  } hover:shadow-md p-2 rounded-md flex flex-col  items-center cursor-pointer`}
                >
                  <Avatar className="w-20 h-20" src={item?.avatar} />
                  <h6 className="text-center text-sm mt-2 font-semibold ">
                    {item?.firstName} {item?.lastName}
                  </h6>
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
