import UnprotectedPage from "@/HOC/Unprotected";
import React from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import ArtistDetailsPage from "@/components/ExplorePage/ArtistDetails";
import { useSession } from "next-auth/react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;

    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const res = await axios.get(`/public/artist/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return {
      props: {
        artist: res.data?.artist,
      },
    };
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

const Artist = ({ artist }) => {
  return <ArtistDetailsPage artist={artist} />;
};

export default UnprotectedPage(Artist);
