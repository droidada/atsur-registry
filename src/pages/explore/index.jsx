import { useEffect, useState } from "react";
import { axiosAuth as axios } from "@/lib/axios";
import { useLoadingContext } from "@/providers/loading.context";
import UnprotectedPage from "@/HOC/Unprotected";
import HomePage from "@/components/HomePage";
import { getToken } from "next-auth/jwt";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/hero-images`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { heroImages: res.data.heroImages } };
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
function Home({ heroImages }) {
  return <HomePage heroImages={heroImages} />;
}

export default UnprotectedPage(Home);
