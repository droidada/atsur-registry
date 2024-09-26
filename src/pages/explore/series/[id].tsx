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

    console.log(res.data);
    return { props: { series: res?.data?.data } };
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

  console.log(artPiece);

  const handlePaginationChange = (e, value) => {
    setCurrentPage(value);
    refetch();
    window.scrollTo(0, 0);
  };

  return (
    <LandingPageLayout>
      <div className="min-h-screen page-container">
        <div className="flex flex-wrap gap-6 ">
          <Image
            className="rounded-lg"
            src={series?.image}
            width={500}
            height={500}
            alt={series?.title}
          />
          <div className="flex flex-col gap-4">
            {" "}
            <h1 className="text-3xl font-semibold">{series?.title}</h1>
            <div className="mt-4 gap-4">
              <h5 className="text-xl font-semibold">Description</h5>
              <p className="text-sm">{series?.description}</p>
            </div>
            <div className="mt-4 gap-4">
              <h5 className="text-xl font-semibold">Creator</h5>
              <Link
                href={`/explore/artist/${series?.author?._id}`}
                className="flex gap-2 items-center group"
              >
                <Avatar
                  className="w-8 h-8"
                  src={series?.author?.avatar}
                  alt={series?.author?.firstName}
                />
                <p className="text-sm group-hover:underline font-semibold">
                  {series?.author?.firstName} {series?.author?.lastName}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex mt-5 flex-col gap-6">
          <h2 className="text-3xl font-semibold">Artworks</h2>

          <div className="flex flex-wrap gap-4 items-stretch ">
            {isFetching ? (
              <div
                className="flex justify-center items-center h-[250px]"
                data-aos="zoom-in"
              >
                <CircularProgress color="inherit" size={30} />
              </div>
            ) : artPiece?.data?.data?.length === 0 ? (
              <NoData text="No Artworks Found" />
            ) : (
              artPiece?.data?.data?.map((item) => (
                <>
                  <ExploreArtPieceCard
                    containerClassName="max-w-[350px]"
                    link={`/explore/art-piece/${item?._id}`}
                    rating={item?.rating}
                    creator={{
                      name: `${item?.custodian?.profile?.firstName} ${item?.custodian?.profile?.lastName}`,
                      image: item?.custodian?.profile?.avatar,
                    }}
                    image={item?.assets && item?.assets[0]?.url}
                    key={item?.id}
                    title={item?.title}
                  />
                </>
              ))
            )}
          </div>

          {artPiece?.data?.data?.length > 0 && (
            <div className="flex justify-center mt-12 mb-6">
              <Pagination
                count={artPiece?.data?.meta?.totalPages}
                page={currentPage}
                onChange={(e, value) => handlePaginationChange(e, value)}
              />
            </div>
          )}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default SeriesDetails;
