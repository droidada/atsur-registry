import { useState } from "react";
import { axiosAuth as axios } from "@/lib/axios";
import {
  Button,
  CircularProgress,
  Pagination,
  Menu,
  MenuItem,
} from "@mui/material";
import ExploreLeft from "@/components/common/ExploreLeft";
import ArtPieceCard from "@/components/common/ArtPieceCard";
import ArtPieceLoading from "@/components/common/ArtPieceLoading";
import UnprotectedPage from "@/HOC/Unprotected";
import FilterComponent from "@/components/ExplorePage/FilterComponent";
import { IoGrid } from "react-icons/io5";
import { IoIosSearch, IoMdMenu } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { QueryClient, useQuery } from "@tanstack/react-query";
import ExploreArtPieceCard, {
  ExploreArtPieceCardLoading,
} from "@/components/ExploreArtPieceCard";
import NoData from "@/components/dashboard/NoData";
import useDebounce from "@/hooks/useDebounce";

function Explore() {
  const [filters, setFilters] = useState<{
    medium: string[];
    rarity: string[];
    priceRange: {
      min: number;
      max: number;
    };
    creationDecade: string[];
  }>({
    medium: [],
    rarity: [],
    priceRange: {
      min: 0,
      max: 0,
    },
    creationDecade: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [currentQuickView, setCurrentQuickView] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const debounce = useDebounce(search, 500);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: artpieces,
    isFetching,
    refetch,
  } = useQuery(
    ["artpiece", currentPage, filters, rating, debounce, sort],
    () =>
      axios.get(
        `/public/explore?page=${currentPage}&filter=${JSON.stringify(
          filters,
        )}&rating=${rating}&search=${debounce}&sort=${sort}`,
      ),
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );

  const handlePaginationChange = (e, value) => {
    setCurrentPage(value);
    refetch();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex md:flex-row flex-col gap-12">
        <FilterComponent
          rating={rating}
          setRating={setRating}
          filters={filters}
          setFilter={setFilters}
        />
        <div className="flex-1 page-container flex flex-col gap-5 ">
          <div className="flex items-center justify-end gap-4">
            <div className="flex-1">
              <div className="flex items-center overflow-hidden divide-x-[1px] divide-primary border-[1px] border-primary rounded-[47px] h-[34px]  gap-2">
                <input
                  name="search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 h-full outline-none focus:ring-0 px-3 border-none ring-none bg-transparent"
                  placeholder="Search"
                />
                <button className="px-2 h-full grid place-items-center">
                  <IoIosSearch />
                </button>
              </div>
            </div>
            <div className="hidden md:flex gap-2 h-[34px] border-primary border-[1px] rounded-[47px] px-2">
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
                onClick={handleClick}
              >
                Sort
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    setSort("price:desc");
                    handleClose();
                  }}
                >
                  High to Low
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSort("price:asc");
                    handleClose();
                  }}
                >
                  Low to High
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSort("newest");
                    handleClose();
                  }}
                >
                  Newest
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSort("oldest");
                    handleClose();
                  }}
                >
                  Oldest
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className="grid grid-cols-auto-fit items-stretch gap-2">
            {isFetching ? (
              <div
                className="flex justify-center items-center h-[250px]"
                data-aos="zoom-in" // Smooth zoom-in for loader
              >
                <CircularProgress color="inherit" size={30} />
              </div>
            ) : artpieces?.data?.artPieces?.length === 0 ? (
              <NoData text="No Art Pieces Found" />
            ) : (
              artpieces?.data?.artPieces?.map((artpiece) => (
                <>
                  <ExploreArtPieceCard
                    containerClassName="max-w-[350px]"
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
                </>
              ))
            )}
          </div>

          {artpieces?.data?.artPieces?.length > 0 && (
            <div className="flex justify-center mt-12">
              <Pagination
                count={artpieces?.data?.meta?.totalPages}
                page={currentPage}
                onChange={(e, value) => handlePaginationChange(e, value)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UnprotectedPage(Explore);
