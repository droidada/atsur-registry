import ExploreArtPieceCard from "@/components/ExploreArtPieceCard";
import NoData from "@/components/dashboard/NoData";
import LandingPageLayout from "@/components/layout/LandingPage";
import axios from "@/lib/axios";
import { Avatar, CircularProgress, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-series/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { series: res?.data?.data } };
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const SeriesDetails = ({ series }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const id = router.query.id;

  const {
    data: artPiece,
    isFetching,
    refetch,
  } = useQuery(
    ["artPiece", currentPage],
    () => axios.get(`/art-series/${id}/art-pieces?page=${currentPage}`),
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  const handlePaginationChange = (e, value) => {
    setCurrentPage(value);
    refetch();
    window.scrollTo(0, 0);
  };

  return (
    <LandingPageLayout>
      <div className="min-h-screen page-container">
        {/* Series Header */}
        <div className="flex flex-wrap gap-8 py-8 border-b border-gray-300">
          <Image
            className="rounded-lg"
            src={series?.image}
            width={500}
            height={500}
            alt={series?.title}
          />
          <div className="flex flex-col gap-4 max-w-lg">
            <h1 className="text-4xl font-bold text-black">{series?.title}</h1>
            <div className="mt-4">
              <h5 className="text-lg font-semibold text-gray-700">
                Description
              </h5>
              <p className="text-base text-gray-600">{series?.description}</p>
            </div>
            <div className="mt-4">
              <h5 className="text-lg font-semibold text-gray-700">Creator</h5>
              <Link
                href={`/explore/artist/${series?.author?._id}`}
                className="flex items-center gap-2 group"
              >
                <Avatar
                  className="w-10 h-10"
                  src={series?.author?.avatar}
                  alt={series?.author?.firstName}
                />
                <p className="text-sm font-semibold text-black group-hover:underline">
                  {series?.author?.firstName} {series?.author?.lastName}
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Artworks Section */}
        <div className="flex flex-col gap-6 mt-8">
          <h2 className="text-3xl font-semibold text-black">Artworks</h2>

          <div className="flex flex-wrap gap-4">
            {isFetching ? (
              <div
                className="flex justify-center w-full items-center h-[250px]"
                data-aos="zoom-in"
              >
                <CircularProgress color="inherit" size={30} />
              </div>
            ) : artPiece?.data?.data?.length === 0 ? (
              <div className="flex justify-center w-full items-center ">
                <NoData text="No Artworks Found" />
              </div>
            ) : (
              artPiece?.data?.data?.map((item) => (
                <ExploreArtPieceCard
                  containerClassName="w-full max-w-xs"
                  link={`/explore/art-piece/${item?._id}`}
                  rating={item?.rating}
                  creator={{
                    name: `${item?.custodian?.profile?.firstName} ${item?.custodian?.profile?.lastName}`,
                    image: item?.custodian?.profile?.avatar,
                  }}
                  image={item?.assets && item?.assets[0]?.url}
                  key={item?._id}
                  title={item?.title}
                />
              ))
            )}
          </div>

          {artPiece?.data?.data?.length > 0 && (
            <div className="flex justify-center mt-12 mb-6">
              <Pagination
                count={artPiece?.data?.meta?.totalPages}
                page={currentPage}
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default SeriesDetails;
