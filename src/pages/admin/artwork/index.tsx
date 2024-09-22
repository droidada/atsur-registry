import GridView from "@/components/dashboard/artwork/GridView";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Button, Pagination, Stack } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AdminAllArtworks = () => {
  const queryClient = useQueryClient();
  const axiosFetch = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

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
        `/art-piece/list?page=${currentPage}&limit=${limit}&filters=${JSON.stringify(
          filters,
        )}`,
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
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

  const handleCreate = () => {
    router.push("/admin/artwork/create");
  };

  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <Stack
          justifyContent={"space-between"}
          direction="row"
          spacing={4}
          alignItems={"center"}
        >
          <h1 className="text-3xl font-bold">Artworks</h1>

          <Button
            aria-haspopup="true"
            onClick={handleCreate}
            startIcon={<FaPlus />}
            variant="text"
            className="text-[14px] leading-[16px] text-primary"
          >
            New
          </Button>
        </Stack>

        <GridView
          artworks={artworks?.data?.artPieces}
          isFetching={isFetching}
          isError={isError}
          baseUrl="/admin/artwork"
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

export default AdminAllArtworks;
