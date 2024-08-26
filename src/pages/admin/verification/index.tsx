import NoData from "@/components/dashboard/NoData";
import GridView from "@/components/dashboard/artwork/GridView";
import ListView from "@/components/dashboard/artwork/ListView";
import TableLoading from "@/components/dashboard/loadingComponents/TableLoading";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ReadyForVerification = () => {
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
        `/art-piece/verify/list?page=${currentPage}&limit=${limit}&filters=${JSON.stringify(
          filters,
        )}`,
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onSuccess: () => {
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

  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <h1 className="text-3xl font-bold">Artworks Ready For Verification</h1>

        {isFetching ? (
          <TableLoading isBlackHeader />
        ) : artworks?.data?.artPieces?.length == 0 ? (
          <NoData text="No artwork ready for verification" />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "550px" }}>
              <TableHead>
                <TableRow>
                  {["Artwork", "Role", "Custodian", "Date"].map((col) => (
                    <TableCell
                      key={`table-head-${col}`}
                      className="bg-primary text-white text-md font-[600]"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="bg-white text-black border-[1px] border-primary ">
                {artworks?.data?.artPieces?.map((item) => (
                  <TableRow
                    onClick={() =>
                      router.push(`/admin/verification/${item?.artPiece?._id}`)
                    }
                    className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
                    key={item?._id}
                  >
                    <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                      {item?.artPiece?.title}
                    </TableCell>
                    <TableCell className="py-2 text-base capitalize font-[300] border-b-[1px] border-primary">
                      {item?.custodian?.role}
                    </TableCell>
                    <TableCell className="py-2 text-base capitalize font-[300] border-b-[1px] border-primary">
                      {item?.artPiece?.custodian?.profile?.firstName}{" "}
                      {item?.artPiece?.custodian?.profile?.lastName}
                    </TableCell>
                    <TableCell className="py-2 text-base font-[300] border-b-[1px] border-primary">
                      {moment(item?.createdAt).format("Do MMM, YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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
      </Stack>
    </AdminDashboardLayout>
  );
};

export default ReadyForVerification;
