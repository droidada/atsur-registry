import useDebounce from "@/hooks/useDebounce";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CollectionFilter from "./CollectionFilter";
import { IoIosSearch } from "react-icons/io";
import {
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import NoData from "@/components/dashboard/NoData";
import Image from "next/image";
import Link from "next/link";

const CollectionTab = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [sort, setSort] = useState("newest");
  const debounce = useDebounce(search as string, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: "",
    verificationStatus: "",
  });

  const {
    data: collections,
    isFetching,
    refetch,
  } = useQuery(
    ["series", currentPage, selectedArtist?.id, debounce, sort],
    () =>
      axios.get(
        `/collection/all?page=${currentPage}${
          selectedArtist?.id ? `&artist=${selectedArtist?.id}` : ""
        }&search=${debounce}&sort=${sort}`,
      ),
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  console.log("Collections", collections?.data);

  const handlePaginationChange = (e, value) => {
    setCurrentPage(value);
    refetch();
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex md:flex-row flex-col  gap-12 pb-4">
      <CollectionFilter
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
      />

      <div className="flex-1 page-container flex flex-col gap-5 ">
        <div className="flex items-center justify-end gap-4">
          <div className="flex-1">
            <div className="flex items-center overflow-hidden divide-x-[1px] divide-primary border-[1px] border-primary rounded-[47px] h-[34px]  gap-2">
              <input
                name="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 h-full outline-none focus:ring-0 px-3 border-none ring-none bg-transparent"
                placeholder="Search collections"
              />
              <button className="px-2 h-full grid place-items-center">
                <IoIosSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {isFetching ? (
            <div
              className="flex justify-center items-center w-full h-[250px]"
              data-aos="zoom-in"
            >
              <CircularProgress color="inherit" size={30} />
            </div>
          ) : collections.data?.collections?.length === 0 ? (
            <div className="flex justify-center w-full items-center">
              <NoData text="No Art Series Found" />
            </div>
          ) : (
            collections?.data?.collections?.map((item) => (
              <div
                key={item?._id}
                className="max-w-[350px] flex flex-col justify-between items-center  w-full  border p-2"
              >
                <Image
                  src={item?.image}
                  width={350}
                  height={350}
                  alt={item?.title}
                />

                <div className="w-full">
                  <p className="text-xl  font-[300] border-b border-primary w-full text-center mt-2">
                    {item?.title}
                  </p>
                  <Link
                    href={`/explore/artist/${item?._id}`}
                    className="flex gap-2 group justify-center items-center mt-2"
                  >
                    <Avatar
                      className="w-8 h-8"
                      src={item?.creator?.avatar}
                      alt={item?.creator?.firstName}
                    />
                    <p className="text-sm group-hover:underline font-semibold">
                      {item?.creator?.firstName} {item?.creator?.lastName}
                    </p>
                  </Link>

                  {item?.artworks?.length > 0 && (
                    <div className="flex justify-center items-center  gap-2">
                      <p className="text-sm font-semibold">Artworks</p>{" "}
                      <AvatarGroup max={3}>
                        {item?.artworks?.map((art) => (
                          <Avatar key={art?._id} src={art?.assets[0]?.url} />
                        ))}
                      </AvatarGroup>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() =>
                    router.push(`/explore/collection/${item?._id}`)
                  }
                  variant="contained"
                  className="mt-2 bg-primary text-white w-full"
                >
                  View
                </Button>
              </div>
            ))
          )}
        </div>

        {collections?.data?.collections?.length > 0 && (
          <div className="flex justify-center mt-12 mb-5">
            <Pagination
              count={collections?.data?.meta?.totalPages}
              page={currentPage}
              onChange={(e, value) => handlePaginationChange(e, value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionTab;