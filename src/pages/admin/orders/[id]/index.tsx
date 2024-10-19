import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import axios from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import Image from "next/image";

import moment from "moment";
import { useToast } from "@/providers/ToastProvider";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import LoadingButton from "@/components/Form/LoadingButton";
import Link from "next/link";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;

    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const { data } = await axios.get(`/order/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { order: data?.data } };
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

const SingleOrder = ({ order }) => {
  console.log(order);
  const [status, setStatus] = useState(order.status || "pending");
  const axiosAuth = useAxiosAuth();

  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: (newStatus: string) =>
      axiosAuth.put(`/order/${order._id}`, {
        status: newStatus,
      }),
    onSuccess: () => {
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    mutate(newStatus);
  };

  return (
    <AdminDashboardLayout>
      <Stack spacing={4} className="pb-6">
        <Typography variant="h4" className="text-white font-semibold">
          Order Details
        </Typography>

        {/* User Information */}
        <Card className="border border-gray-300 shadow-sm">
          <CardContent className="">
            <Typography variant="h6" className="font-bold mb-2">
              User Information
            </Typography>
            <Typography variant="body1" className="text-gray-600 text-sm">
              <span className="font-semibold ">Name:</span>{" "}
              {order?.user?.firstName} {order?.user?.lastName}
            </Typography>
            <Typography variant="body2" className="text-gray-500 text-sm">
              <span className="font-semibold ">Email:</span>{" "}
              {order?.user?.email}
            </Typography>
            <Typography variant="body2" className="text-gray-500 text-sm">
              <span className="font-semibold ">Available Time:</span>{" "}
              {moment(order.availableTime).format("hh:mm A")}
            </Typography>
          </CardContent>
        </Card>

        {/* Art Piece Information */}
        <Card className="border border-gray-300 shadow-sm">
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4">
              Art Piece Information
            </Typography>
            <Typography className=" text-sm font-semibold mb-2">
              {order.artPiece.title}
            </Typography>
            <Typography variant="body2" className="text-gray-600 text-sm mb-4">
              {order.artPiece.description}
            </Typography>

            {/* Art Piece Images */}
            <Grid container spacing={2}>
              {order.artPiece.assets.map((asset) => (
                <Grid item xs={6} md={3} key={asset._id}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <Image
                      src={asset.url}
                      alt={asset.caption || "Art Piece Image"}
                      width={200}
                      height={200}
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  </div>
                </Grid>
              ))}
            </Grid>

            <Link
              className="text-blue-500 hover:underline mt-4 block"
              href={order.artPiece?.signedCOA}
              download
              target="_blank"
            >
              Download Certificate
            </Link>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="border border-gray-300 shadow-sm">
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4">
              Update Order Status
            </Typography>
            <Select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-white text-black"
              fullWidth
              variant="outlined"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>

            <LoadingButton
              loading={isLoading}
              variant="contained"
              className="bg-black text-white mt-4 hover:bg-gray-800"
              onClick={() => handleStatusChange(status)}
              fullWidth
            >
              Update Status
            </LoadingButton>
          </CardContent>
        </Card>
      </Stack>
    </AdminDashboardLayout>
  );
};

export default SingleOrder;
