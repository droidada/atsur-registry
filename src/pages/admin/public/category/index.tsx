import LoadingButton from "@/components/Form/LoadingButton";
import NoData from "@/components/dashboard/NoData";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useDebounce from "@/hooks/useDebounce";
import axios from "@/lib/axios";
import { artPieceMediums } from "@/lib/utils/mediums";
import { useToast } from "@/providers/ToastProvider";

import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/top-categories`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { topCategories: res?.data?.categories } };
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

const PublicCategory = ({ topCategories }) => {
  const [categories, setCategories] = React.useState<
    {
      title: string;
      artworks: {
        assets: string[];
        title: string;
        _id: string;
      }[];
    }[]
  >(topCategories || []);
  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) =>
      axiosAuth.post("/public/top-categories", {
        categories: data,
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
    if (categories.length !== 4) {
      toast.error("Please add all categories");
      return;
    }
    // @ts-ignore
    mutate(
      categories.map((item) => {
        return {
          title: item.title,
          artworks: item.artworks.map((art) => art._id),
        };
      }),
    );
  };

  return (
    <AdminDashboardLayout>
      <h1 className="text-2xl font-bold">Top Categories</h1>
      <form action="">
        <div className="flex mt-4 flex-wrap gap-4">
          {[...Array(4)]?.map((item, index) => (
            <div
              key={`top-categories-${index}`}
              className=" w-full max-w-[250px] flex flex-col items-center "
            >
              <div
                onClick={() => {
                  setCurrentIndex(index);
                  setOpenModal(true);
                }}
                className="border-2 cursor-pointer rounded-md w-full hover:shadow-md h-[250px] grid grid-cols-2 gap-2 p-2"
              >
                {categories[index]?.artworks?.map((item) => (
                  <Image
                    width={200}
                    height={200}
                    // @ts-ignore
                    src={item?.assets[0]?.url}
                    alt=""
                    key={item._id}
                    className="rounded-md"
                  />
                ))}
              </div>
              <p className="capitalize">
                {categories[index]?.title || "No Category"}
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
      <AddArtPieceDialog
        open={openModal}
        handleClose={() => setOpenModal(false)}
        setCategories={setCategories}
        index={currentIndex}
      />
    </AdminDashboardLayout>
  );
};

export default PublicCategory;

interface Props {
  open: boolean;
  handleClose: () => void;
  setCategories: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        artworks: {
          assets: string[];
          title: string;
          _id: string;
        }[];
      }[]
    >
  >;
  index: number;
}
const AddArtPieceDialog: React.FC<Props> = ({
  open,
  handleClose,
  setCategories,
  index,
}) => {
  const axiosAuth = useAxiosAuth();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [selectedArtworks, setSelectedArtworks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const toast = useToast();

  const {
    data: artPieces,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["art-piece", debouncedQuery, title],
    queryFn: async () =>
      axiosAuth.get(
        debouncedQuery
          ? `/art-piece/list?search=${debouncedQuery}&limit=10${
              title ? `&medium=${title}` : ""
            }`
          : `/art-piece/list?limit=10${title ? `&medium=${title}` : ""}`,
      ),
    enabled: Boolean(debouncedQuery || title),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setSelectedArtworks([]);
  }, [title]);

  const handleSelectArtwork = (artwork: any) => {
    setSelectedArtworks((prev) => {
      if (prev.some((item) => item._id === artwork._id)) {
        return prev.filter((item) => item._id !== artwork._id); // Deselect if already selected
      }
      if (prev.length < 4) {
        return [...prev, artwork];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedArtworks.length !== 4) {
      toast.error("Please select exactly 4 art pieces.");
      return;
    }

    if (!title) {
      toast.error("Please select a category.");
      return;
    }
    setCategories((prev) => {
      const data = prev;
      data[index] = { title, artworks: selectedArtworks };
      return data;
    });
    setSelectedArtworks([]);
    setTitle("");
    setQuery("");
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
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent className="flex flex-col gap-4" dividers>
        <select
          onChange={(e) => setTitle(e.target.value)}
          className="w-full capitalize"
          value={title}
        >
          <option selected value="" disabled>
            Select Medium
          </option>
          {artPieceMediums.map((item) => (
            <option className="capitalize" key={item} value={item}>
              {item.replace(/-/g, " ")}
            </option>
          ))}
        </select>
        <TextField
          className="w-full"
          fullWidth
          variant="outlined"
          placeholder="Search art pieces..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-4">
          {isFetching ? (
            <CircularProgress color="inherit" size={20} />
          ) : !artPieces ? (
            <NoData
              text={`No art pieces found for ${query}  ${
                title && `in ${title} `
              } `}
            />
          ) : (
            <div className="flex flex-wrap gap-2 items-stretch">
              {artPieces?.data?.artPieces?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleSelectArtwork(item)}
                  className={`w-[200px] ${
                    selectedArtworks.some((art) => art._id === item._id)
                      ? "shadow-lg border-black"
                      : ""
                  } hover:shadow-md p-2  rounded-md border-2 cursor-pointer`}
                >
                  <Image
                    width={200}
                    height={200}
                    src={item?.assets[0]?.url}
                    alt=""
                  />
                  <h6 className="text-center text-sm mt-2 font-semibold">
                    {item?.title}
                  </h6>
                  <div className="flex gap-2 justify-center items-center">
                    <Avatar
                      alt={item?.custodian?.profile?.firstName}
                      className="w-5 h-5"
                      src={item?.custodian?.profile?.avatar as string}
                    />
                    <span className="text-xs">
                      {item?.custodian?.profile?.firstName}{" "}
                      {item?.custodian?.profile?.lastName}
                    </span>
                  </div>
                </div>
              ))}
              {/* <Pagination /> */}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-primary text-white">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
