import ProtectedPage from "@/HOC/Protected";
import ArtPieceCertificate from "@/components/Certificate";
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
  return (
    <Stack spacing={4}>
      <h2 className="text-[30px] font-[600]">
        Order Certificate Of Authenticity
      </h2>
      <Stack className="" direction={["column"]} spacing={4}>
        <div>
          <ArtPieceCertificate
            artistName={`${artPiece?.custodian?.profile?.firstName} ${artPiece?.custodian?.profile?.lastName}`}
            title={artPiece?.title}
            type={artPiece?.artType}
            yearOfCreation={new Date(artPiece?.createdAt)
              .getFullYear()
              .toString()}
            medium={artPiece?.medium}
            image={artPiece?.assets[0]?.url}
            size={`${artPiece?.width} x ${artPiece?.height} CM`}
            // signatureImage={signatureImage}
            // qrCodeImage={qrImage}
          />
        </div>
        <Stack spacing={2}>
          <div>
            <p className="font-[300] text-[16px]">Shipping Address</p>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProtectedPage(OrderRFID);
