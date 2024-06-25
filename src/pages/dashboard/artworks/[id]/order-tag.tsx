import ProtectedPage from "@/HOC/Protected";
import axios from "@/lib/axios";
import { Stack } from "@mui/material";
import { getToken } from "next-auth/jwt";
import React from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    return { props: { artPiece: res.data?.artPiece } };
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

const OrderRFID = ({ artPiece }) => {
  return <Stack>OrderRFID</Stack>;
};

export default ProtectedPage(OrderRFID);
