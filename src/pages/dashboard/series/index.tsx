import ProtectedPage from "@/HOC/Protected";
import FilterLine from "@/components/dashboard/FilterLine";
import HeroHeader from "@/components/dashboard/HeroHeader";
import NoData from "@/components/dashboard/NoData";
import CreateSeriesModal from "@/components/dashboard/series/CreateSeriesModal";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Series = () => {
  const [view, setView] = useState<"list" | "grid">("grid");
  const axiosFetch = useAxiosAuth();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: series,
    isFetching,
    isError,
  } = useQuery(
    ["art-series", currentPage],
    () => axiosFetch.get(`/art-series?page=${currentPage}&limit=20`),
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Stack spacing={2}>
      {/* <SearchBar /> */}
      <HeroHeader
        type="series"
        handleCreate={() => setOpenCreateModal(true)}
        handleExplore={() => {}}
      />
      <FilterLine
        handleCreate={() => setOpenCreateModal(true)}
        view={view}
        setView={setView}
        title="My Series"
      />
      <div className="mt-4">
        {view == "grid" ? (
          <div>
            {isFetching ? (
              <div className="grid place-items-center min-h-[450px]">
                <CircularProgress color="inherit" size={40} />
              </div>
            ) : series?.data?.data?.length > 0 ? (
              <div className="grid grid-cols-auto-fit gap-2">
                {series?.data?.data?.map((item) => (
                  <Link
                    href={`/dashboard/series/${item?._id}`}
                    className={`w-full ${
                      series?.data?.data?.length < 2 ? "max-w-[250px]" : ""
                    }`}
                    key={item?._id}
                  >
                    <div className=" w-full border-[1px] p-2">
                      <Image
                        src={item?.image}
                        alt={item?.title}
                        width={250}
                        height={250}
                        className="w-full"
                      />
                    </div>
                    <p className="text-center ">{item?.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <NoData text="No series found" />
            )}
          </div>
        ) : (
          <div>
            {isFetching ? (
              <div></div>
            ) : series?.data?.data?.length > 0 ? (
              <></>
            ) : (
              <NoData text="No series found" />
            )}
          </div>
        )}
      </div>
      <CreateSeriesModal
        open={openCreateModal}
        handleClose={() => setOpenCreateModal(false)}
      />
    </Stack>
  );
};

export default ProtectedPage(Series);
