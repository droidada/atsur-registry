import NoData from "@/components/dashboard/NoData";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import axios from "@/lib/axios";
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
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = async ({ req, query, param }) => {
  try {
    let { page, limit } = query;
    console.log(page);
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const { data } = await axios.get(`/order?page=${page}&limit=${limit}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(data);

    return { props: { orders: data?.data, meta: data?.meta } };
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

const Orders = ({ orders, meta }) => {
  const tableHeading = ["Order ID", "User", "Email", "Art Piece", "Status"];

  const { totalDocs, totalPages, page, limit } = meta;
  const router = useRouter();

  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <Stack
          justifyContent={"space-between"}
          direction="row"
          spacing={4}
          alignItems={"center"}
        >
          <h1 className="text-3xl font-bold">Orders</h1>
        </Stack>

        <Stack>
          {orders?.length === 0 ? (
            <NoData text="No orders yet" />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "550px" }}>
                <TableHead>
                  <TableRow>
                    {tableHeading?.map((col) => (
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
                  {orders.map((order) => (
                    <TableRow
                      onClick={() => router.push(`/admin/orders/${order._id}`)}
                      className="bg-white text-black cursor-pointer   px-3 hover:bg-secondary"
                      key={order._id}
                    >
                      <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                        {order._id}
                      </TableCell>
                      <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                        {order.user.firstName} {order.user.lastName}
                      </TableCell>
                      <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                        {order.user.email}
                      </TableCell>
                      <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                        {order.artPiece.title}
                      </TableCell>
                      <TableCell className="py-2 text-base font-[300] ml-2  border-b-[1px] border-primary">
                        {order.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
        <div className="flex justify-between items-center">
          <div>
            Page {page} of {totalPages}
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => {
              router.push({
                pathname: "/admin/orders",
                query: { page: value, limit },
              });
            }}
          />
        </div>
      </Stack>
    </AdminDashboardLayout>
  );
};

export default Orders;
