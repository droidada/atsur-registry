import GridView from "@/components/dashboard/artwork/GridView";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Pagination, Stack } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const ReadyForVerification = () => {
  const queryClient = useQueryClient();
  const axiosFetch = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [filters, setFilters] = useState({});

  const {
    data: artworks,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ["artworks", { currentPage, limit, filters }],
    () =>
      axiosFetch.get(
        `/art-piece/verify/list?page=${currentPage}&limit=${limit}&filters=${JSON.stringify(
          filters,
        )}`,
      ),
    {
      keepPreviousData: true,
      onSuccess: () => {
        console.log(artworks?.data?.meta?.totalPages);
        if (currentPage < artworks?.data?.meta?.totalPages) {
          queryClient.prefetchQuery([
            "artworks",
            {
              currentPage: currentPage + 1,
              limit,
              filters,
            },
          ]);
        }
      },
    },
  );

  console.log(artworks);

  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <h1 className="text-3xl font-bold">Artpieces Ready For Verifcation</h1>

        <GridView
          artworks={artworks?.data?.artPieces?.map(
            (artwork) => artwork?.artPiece,
          )}
          isFetching={isFetching}
          isError={isError}
          baseUrl="/admin/verification"
        />
      </Stack>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-sm ">
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              refetch();
              window.scrollTo(0, 0);
            }}
            id="per-page"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <label className="text-sm font-medium" htmlFor="per-page">
            Per page
          </label>
        </div>
        <Pagination
          count={artworks?.data?.meta?.totalPages}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value);
            refetch();
            window.scrollTo(0, 0);
          }}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default ReadyForVerification;
