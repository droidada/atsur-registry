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

export default function Explore() {
  const [isBidModal, setBidModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleBidModal = () => setBidModal(!isBidModal);
  const [activeIndex, setActiveIndex] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [pieces, setPieces] = useState([]);
  const [query, setQuery] = useState({});
  const [verified, setVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const [openSortedMenu, setOpenSortedMenu] = useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (!searchTerm || searchTerm === "") return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem) {
      setCurrentPage(1);
      setQuery((prev) => ({
        ...prev,
        search: searchItem,
      }));
    }
    return;
  };

  console.log(pieces);

  const generateQuery = () => {
    let q = "";
    for (let key in query) {
      if (key === "filter") {
        q += `&filter=${JSON.stringify(query[key])}`;
      } else {
        q += `&${key}=${query[key]}`;
      }
    }
    return q;
  };

  const filterPieces = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/public/explore?page=${currentPage}${generateQuery()}`,
      );

      setCurrentPage(res?.data?.meta?.currentPage);
      setTotalPages(res?.data?.meta?.totalPages);
      // setPieces((prev) =>
      //   removeDuplicates([...prev, res?.data?.artPieces], "_id").flat(),
      // );
      setPieces(res?.data?.artPieces);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterPieces();
  }, [JSON.stringify(query), currentPage]);

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} currentMenuItem={"explore"}>
        <div>
          <div className="flat-title-page">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading text-center tf-color">
                    Explore Art Pieces
                  </h1>
                  <ul className="breadcrumbs flex justify-center">
                    <li className="icon-keyboard_arrow_right">
                      <Link className="to-black" href="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="to-black" href="#">
                        Explore
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12">
                  <div
                    data-wow-delay="0.2s"
                    className="wow fadeInUp widget-search"
                    style={{ marginTop: "20px" }}
                  >
                    <form
                      onSubmit={handleSubmit}
                      action="#"
                      method="get"
                      role="search"
                      className="search-form relative"
                    >
                      <input
                        type="search"
                        id="search"
                        className="search-field style-2"
                        placeholder="Search..."
                        name="s"
                        title="Search for"
                        value={searchItem}
                        onChange={handleSearch}
                      />
                      <button
                        className="search search-submit"
                        type="submit"
                        title="Search"
                      >
                        <i className="icon-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tf-section-2 artwork loadmore-12-item-1">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-3">
                  <ExploreLeft setQuery={setQuery} />
                </div>
                <div className="col-md-9">
                  <div className="grid grid-cols-3 gap-4">
                    {loading
                      ? [...Array(4)].map((_, i) => <ArtPieceLoading key={i} />)
                      : pieces?.map((piece) => (
                          <ArtPieceCard
                            key={piece._id}
                            image={piece?.assets[0].url}
                            title={piece?.title}
                            link={`/explore/art-piece/${piece._id}`}
                            rating={piece?.rating}
                            user={{
                              firstName: piece?.custodian?.profile?.firstName,
                              lastName: piece?.custodian?.profile?.lastName,
                              avatar: piece?.custodian?.profile?.avatar,
                              id: piece?.creator?._id,
                            }}
                          />
                        ))}
                    {!loading && pieces?.length === 0 && (
                      <div className="h-full grid w-full place-items-center">
                        <Typography variant="h3" component="div">
                          No art pieces found
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <Pagination
              count={totalPages}
              onChange={(event, value) => {
                setCurrentPage(value);
              }}
            />
          </div>
          {/* <div className="flex container mx-auto py-6 flex-col  md:flex-row gap-6">
            <div>
              <ExploreLeft setQuery={setQuery} />
            </div>
            <div className="grid gap-6 flex-1">
              <div className="flex flex-wrap gap-4">
                {loading
                  ? [...Array(4)].map((_, i) => <ArtPieceLoading key={i} />)
                  : pieces?.map((piece) => (
                      <ArtPieceCard
                        key={piece._id}
                        image={piece?.assets[0].url}
                        title={piece?.title}
                        link={`/explore/art-piece/${piece._id}`}
                        user={{
                          firstName: piece?.creator?.profile?.firstName,
                          lastName: piece?.creator?.profile?.lastName,
                          avatar: piece?.creator?.profile?.avatar,
                          id: piece?.creator?._id,
                        }}
                      />
                    ))}

                {!loading && pieces?.length === 0 && (
                  <div className="h-full grid w-full place-items-center">
                    <Typography variant="h3" component="div">
                      No art pieces found
                    </Typography>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <Pagination
                  count={totalPages}
                  onChange={(event, value) => {
                    setCurrentPage(value);
                  }}
                />
              </div>
            </div>
          </div> */}
        </div>
        <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} />
      </Layout>
    </>
  );
}
