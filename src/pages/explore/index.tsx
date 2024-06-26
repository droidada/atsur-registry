import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import BidModal from "@/open9/elements/BidModal";
import Layout from "@/open9/layout/Layout";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import {
  Button,
  Card,
  Pagination,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import ExploreLeft from "@/components/common/ExploreLeft";
import ArtPieceCard from "@/components/common/ArtPieceCard";
import ArtPieceLoading from "@/components/common/ArtPieceLoading";
import UnprotectedPage from "@/HOC/Unprotected";
import FilterComponent from "@/components/ExplorePage/FilterComponent";
import { IoGrid } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { QueryClient, useQuery } from "@tanstack/react-query";
import ExploreArtPieceCard, {
  ExploreArtPieceCardLoading,
} from "@/components/ExploreArtPieceCard";

function Explore() {
  const [filters, setFilters] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuickView, setCurrentQuickView] = useState("all");

  const {
    data: artpieces,
    isFetching,
    refetch,
  } = useQuery(
    ["artpiece", currentPage, filters],
    () => axios.get(`/public/explore?page=${currentPage}`),
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  console.log(artpieces);

  return (
    <>
      <div className="flex items-center relative border-b-[1px]  ">
        <div className="page-container flex  items-center gap-5 pb-6">
          {["all", "trending", "collectibles", "art", "photography"].map(
            (item, index) => (
              <p
                onClick={() => setCurrentQuickView(item)}
                key={`quick-view-${index}`}
                className={`text-[15px] capitalize relative cursor-pointer duration-700 leading-[15px] text-center ${
                  item === currentQuickView ? "font-bold" : "font-[300]"
                }`}
              >
                {item}
                {item === currentQuickView && (
                  <span className="w-full z-10 h-[2px] bg-primary absolute -bottom-[180%] left-0"></span>
                )}
              </p>
            ),
          )}
        </div>
      </div>
      <div className="flex gap-12">
        <FilterComponent filters={filters} setFilter={setFilters} />
        <div className="flex-1 page-container flex flex-col gap-5 pt-12">
          <div className="flex items-center justify-end gap-4">
            <div className="flex gap-2 h-[34px] border-primary border-[1px] rounded-[47px] px-2">
              <Button
                startIcon={<IoGrid />}
                variant="text"
                className="text-xs font-[300] leading-[15px]"
              >
                Grid
              </Button>
              <span className="h-full w-[1px] bg-primary" />
              <Button
                startIcon={<IoMdMenu />}
                variant="text"
                className="text-xs font-[300] leading-[15px]"
              >
                List
              </Button>
            </div>
            <div className="flex gap-2 h-[34px] border-primary border-[1px] rounded-[47px] px-2">
              <Button
                className="text-xs font-[300] leading-[15px]"
                startIcon={<BiMenuAltLeft />}
              >
                High to Low
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-auto-fit gap-4">
            {isFetching ? (
              Array(10)
                .fill(null)
                .map((item, index) => (
                  <ExploreArtPieceCardLoading key={index} />
                ))
            ) : artpieces?.data?.artpieces?.length === 0 ? (
              <div className="w-full col-span-full"> No Data Found</div>
            ) : (
              artpieces?.data?.artPieces?.map((artpiece) => (
                <ExploreArtPieceCard
                  link={`/explore/art-piece/${artpiece?._id}`}
                  rating={artpiece?.rating}
                  creator={{
                    name: `${artpiece?.custodian?.profile?.firstName} ${artpiece?.custodian?.profile?.lastName}`,
                    image: artpiece?.custodian?.profile?.avatar,
                  }}
                  image={artpiece?.assets && artpiece?.assets[0]?.url}
                  key={artpiece?.id}
                  title={artpiece?.title}
                />
              ))
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Pagination
              count={artpieces?.data?.meta?.totalPages}
              page={currentPage}
              onChange={(e, value) => {
                setCurrentPage(value);
                refetch();
                window.scrollTo(0, 0);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UnprotectedPage(Explore);

//
