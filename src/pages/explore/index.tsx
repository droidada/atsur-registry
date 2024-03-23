import { useEffect, useState } from "react";
import Link from "next/link";

import axios from "@/lib/axios";
import { Menu } from "@headlessui/react";
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

  const generateQuery = () => {
    let q = "";
    for (let key in query) {
      if (key === "filter") {
        q += `filter=${JSON.stringify(query[key])}`;
      } else {
        q += `${key}=${query[key]}`;
      }
    }
    return q;
  };

  const filterPieces = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/public/explore?page=${currentPage}&${generateQuery()}`,
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
                <div className="col-2"></div>
                <div className="col-8">
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
                <div className="col-2"></div>
              </div>
            </div>
          </div>
          <div className="flex container mx-auto py-6 flex-col  md:flex-row gap-6">
            <div>
              <ExploreLeft setQuery={setQuery} />
            </div>
            <div className="grid gap-6 flex-1">
              <div className="flex flex-wrap min-h-screen  items-stretch gap-4">
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
          </div>
          {/* <div className="tf-section-2 discover-item loadmore-12-item">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <div className="widget-tabs relative">
                    <div className="tf-soft">
                      <div className="soft-right">
                        <Menu as="div" className="dropdown">
                          <Menu.Button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton4"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 5V15M7.5 12.6517L8.2325 13.2008C9.20833 13.9333 10.7908 13.9333 11.7675 13.2008C12.7442 12.4683 12.7442 11.2817 11.7675 10.5492C11.28 10.1825 10.64 10 10 10C9.39583 10 8.79167 9.81667 8.33083 9.45083C7.40917 8.71833 7.40917 7.53167 8.33083 6.79917C9.2525 6.06667 10.7475 6.06667 11.6692 6.79917L12.015 7.07417M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z"
                                stroke="#161616"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>Sort by: recently added</span>
                          </Menu.Button>
                          <Menu.Items
                            as="div"
                            className="dropdown-menu d-block"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <h6>Sort by</h6>
                            <Link href="#" className="dropdown-item">
                              <div className="sort-filter">
                                <span>Recently added</span>
                                <span className="icon-tick">
                                  <span className="path2" />
                                </span>
                              </div>
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <div className="sort-filter active">
                                <span>Price: Low to High</span>
                                <span className="icon-tick">
                                  <span className="path2" />
                                </span>
                              </div>
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <div className="sort-filter">
                                <span>Price: High to Low</span>
                                <span className="icon-tick">
                                  <span className="path2" />
                                </span>
                              </div>
                            </Link>
                            <h6>Options</h6>
                            <Link href="#" className="dropdown-item">
                              <div className="sort-filter">
                                <span>For Sale</span>
                                <input
                                  className="check"
                                  type="checkbox"
                                  name="check"
                                />
                              </div>
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <div className="flex gap-2">
                                <span>Verified</span>

                                <input
                                  className="check"
                                  type="checkbox"
                                  name="check"
                                  onChange={handleVerifyOnChange}
                                />
                              </div>
                            </Link>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>
                    <ul className="widget-menu-tab">
                      <li
                        className={
                          activeIndex === 1 ? "item-title active" : "item-title"
                        }
                        onClick={() => handleOnClick(1)}
                      >
                        <span className="inner">Contemporary</span>
                      </li>
                      <li
                        className={
                          activeIndex === 2 ? "item-title active" : "item-title"
                        }
                        onClick={() => handleOnClick(2)}
                      >
                        <span className="inner">Historical</span>
                      </li>
                      <li
                        className={
                          activeIndex === 3 ? "item-title active" : "item-title"
                        }
                        onClick={() => handleOnClick(3)}
                      >
                        <span className="inner">Verified</span>
                      </li>
                    </ul>
                    <div className="widget-content-tab pt-10">
                      <div
                        className="widget-content-inner"
                        style={{
                          display: `${activeIndex === 1 ? "block" : "none"}`,
                        }}
                      >
                        <div className="row">
                          {loading
                            ? [...Array(10)].map((_, index) => (
                                <Card
                                  key={index}
                                  className="fl-item col-xl-3 col-lg-4 m-2 col-md-8 col-sm-6 col-xs-12"
                                >
                                  <div className="tf-card-box style-1 ">
                                    <Skeleton
                                      animation="wave"
                                      height="250px"
                                      width="100%"
                                      variant="rectangular"
                                    />
                                    <Skeleton
                                      height="10px"
                                      width="30%"
                                      variant="rectangular"
                                      className="mt-3"
                                    />
                                    <div className="flex gap-2 mt-3  items-center">
                                      <Skeleton
                                        variant="circular"
                                        height="20px"
                                        width="20px"
                                      />
                                      <Skeleton
                                        variant="rectangular"
                                        height="10px"
                                        width="40%"
                                      />
                                    </div>
                                  </div>
                                </Card>
                              ))
                            : pieces?.map((artPiece, idx) => (
                                <div
                                  key={idx}
                                  className="fl-item col-xl-3 col-lg-4 m-2 col-md-6 col-sm-6"
                                >
                                  <div className="tf-card-box style-1 ">
                                    <div className="card-media  h-[250px] relative">
                                      <Image
                                        fill
                                        className="object-cover"
                                        src={artPiece.assets[0].url}
                                        alt=""
                                      />

                                      <span className="wishlist-button icon-heart" />
                                      <div className="button-place-bid">
                                        <Link
                                          href={`/explore/art-piece/${artPiece._id}`}
                                          className="tf-button"
                                        >
                                          <span>View</span>
                                        </Link>
                                      </div>
                                    </div>
                                    <h5 className="name">
                                      <Link href="#">{artPiece.title}</Link>
                                    </h5>
                                    <div className="author flex items-center">
                                      <div className="avatar">
                                        {artPiece?.creator?.profile?.avatar ? (
                                          <Image
                                            width={100}
                                            height={100}
                                            src={
                                              artPiece?.creator?.profile?.avatar
                                            }
                                            alt="Image"
                                          />
                                        ) : (
                                          <div className="w-full h-full grid place-items-center rounded-full bg-gray-300">
                                            <FaUser />
                                          </div>
                                        )}
                                      </div>
                                      <div className="info">
                                        <span className="tf-color">
                                          Created by:
                                        </span>
                                        <h6>
                                          <Link href="/author-2">
                                            {
                                              artPiece?.creator?.profile
                                                ?.firstName
                                            }{" "}
                                            {
                                              artPiece?.creator?.profile
                                                ?.lastName
                                            }
                                          </Link>{" "}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="divider" />
                                    <div className="meta-info flex items-center justify-between">
                                      <span className="text-bid">Price</span>
                                      <h6 className="price gem to-white">
                                        <i className="icon-gem" />
                                        0,34
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                      <div
                        className="widget-content-inner"
                        style={{
                          display: `${activeIndex === 2 ? "block" : "none"}`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 flex justify-center items-center load-more">
                  <Pagination
                    count={totalPages}
                    onChange={(event, value) => {
                      setCurrentPage(value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} />
      </Layout>
    </>
  );
}
