import React, { useState } from "react";
import ArtistFilters from "./ArtistFilters";
import useDebounce from "@/hooks/useDebounce";
import { IoIosSearch } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Avatar, CircularProgress, Pagination } from "@mui/material";
import NoData from "@/components/dashboard/NoData";
import Image from "next/image";
import Link from "next/link";

const ArtistTab = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const debounce = useDebounce(search as string, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: "",
    verificationStatus: "",
  });

  const {
    data: artists,
    isFetching,
    refetch,
  } = useQuery(
    ["artist", currentPage, filters, debounce, sort],
    () =>
      axios.get(
        `/artist?page=${currentPage}&filters=${JSON.stringify(
          filters,
        )}&search=${debounce}&sort=${sort}`,
      ),
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  const handlePaginationChange = (e, value) => {
    setCurrentPage(value);
    refetch();
    window.scrollTo(0, 0);
  };

  console.log(artists?.data);

  return (
    <div className="flex md:flex-row flex-col  gap-12 pb-4">
      <ArtistFilters filters={filters} setFilters={setFilters} />
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
                placeholder="Search artist"
              />
              <button className="px-2 h-full grid place-items-center">
                <IoIosSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-auto-fit items-stretch gap-2">
          {isFetching ? (
            <div
              className="flex justify-center items-center h-[250px]"
              data-aos="zoom-in"
            >
              <CircularProgress color="inherit" size={30} />
            </div>
          ) : artists?.data?.artists?.length === 0 ? (
            <NoData text="No Art Pieces Found" />
          ) : (
            artists?.data?.artists?.map((artist) => (
              <Link
                href={`/explore/artist/${artist?.id}`}
                key={artist?.id}
                className="max-w-[350px]  w-full shadow-md border p-2"
              >
                <Image
                  src={
                    artist?.avatar ||
                    `https://via.placeholder.com/150/000000/FFFFFF/?text=${
                      artist?.firstName[0] + artist?.lastName[0]
                    }`
                  }
                  width={350}
                  height={350}
                  alt={artist?.firstName}
                />
                <p className="text-xl font-semibold text-center mt-2">
                  {artist?.firstName} {artist?.lastName}
                </p>
              </Link>
            ))
          )}
        </div>

        {artists?.data?.artists?.length > 0 && (
          <div className="flex justify-center mt-12">
            <Pagination
              count={artists?.data?.meta?.totalPages}
              page={currentPage}
              onChange={(e, value) => handlePaginationChange(e, value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistTab;
