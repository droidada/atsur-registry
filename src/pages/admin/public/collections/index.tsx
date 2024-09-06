import LoadingButton from "@/components/Form/LoadingButton";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useDebounce from "@/hooks/useDebounce";
import axios from "@/lib/axios";
import { useToast } from "@/providers/ToastProvider";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
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
    const res = await axios.get(`/public/top-collections`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res?.data);

    return { props: { topCollections: res.data.topCollections } };
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
const PublicCollection = ({ topCollections }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [collections, setCollections] = useState<
    {
      title: string;
      image: string;
      _id: string;
    }[]
  >(topCollections || []);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      axiosAuth.post("/public/top-collections", {
        collections: data,
      }),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
    onSuccess: () => {
      // toast.success("Collection added successfully");
    },
  });

  const handleSubmit = () => {
    if (collections.every((item) => !item._id)) {
      toast.error("Please add all collections");
      return;
    }
    // @ts-ignore
    mutate(collections.map((item) => item._id));
  };

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold">Top Collections</h1>

      <form className="grid mt-4 lg:grid-cols-2  gap-2">
        {[...Array(4)].map((item, index) => (
          <div
            onClick={() => {
              setCurrentIndex(index);
              setOpenModal(true);
            }}
            key={`top-collection-${index}`}
            className="border-2 hover:shadow-md p-2 flex items-center flex-col cursor-pointer rounded-md max-w-[250px] w-full  "
          >
            {collections[index]?.image && (
              <Image
                src={collections[index]?.image || ""}
                alt=""
                width={200}
                height={200}
              />
            )}
            <p className="text-sm font-semibold mt-2">
              {collections[index]?.title}
            </p>
          </div>
        ))}

        <div className="col-span-2 w-full mt-4  flex justify-end">
          <LoadingButton
            loading={isLoading}
            onClick={handleSubmit}
            className=" bg-primary text-white"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
      <AddCollectionDialog
        setCollections={setCollections}
        index={currentIndex}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </AdminDashboardLayout>
  );
};

export default PublicCollection;

interface Props {
  open: boolean;
  handleClose: () => void;
  setCollections: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        image: string;
      }[]
    >
  >;
  index: number;
}
const AddCollectionDialog: React.FC<Props> = ({
  open,
  handleClose,
  setCollections,
  index,
}) => {
  const toast = useToast();
  const axiosAuth = useAxiosAuth();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const { data: collection, isLoading } = useQuery({
    queryKey: ["top-collections"],
    queryFn: async () =>
      axiosAuth.get(
        `/collection/list?title[$regex]=${debouncedQuery}&title[$options]=i`,
      ),

    enabled: Boolean(debouncedQuery),
  });

  const handleSubmit = () => {
    setCollections((prev) => {
      const data = prev;
      data[index] = selectedCollection;
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
            <div className="grid md:grid-cols-2  gap-2">
              {collection?.data?.data?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedCollection(item);
                  }}
                  className={`w-[200px] h-[250px] ${
                    item?._id == selectedCollection?._id ? "shadow-lg" : ""
                  } hover:shadow-md p-2 rounded-md border-2 cursor-pointer`}
                >
                  <Image width={200} height={200} src={item?.image} alt="" />
                  <h6 className="text-center text-sm mt-2 font-semibold ">
                    {item?.title}
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
