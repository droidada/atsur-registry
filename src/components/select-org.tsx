import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import axios from "@/lib/axios";
import { Menu } from "@headlessui/react";
import BidModal from "@/open9/elements/BidModal";
import Layout from "@/open9/layout/Layout";

export default function SelectOrg() {
  const [searchItem, setSearchItem] = useState("");
  const [pieces, setPieces] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (!searchTerm || searchTerm === "") return;
  };
  const filterPieces = async () => {
    const res = await axios.get("/public/explore");
    console.log("res here is ", res);
    setPieces(res.data?.artPieces);
  };

  useEffect(() => {
    filterPieces();
  }, []);

  return (
    <>
      <div>
        <div className="flat-title-page">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                <h1 className="heading text-center tf-color">
                  Explore Art Pieces
                </h1>
              </div>
              <div className="col-2"></div>
              <div className="col-8">
                <div
                  data-wow-delay="0.2s"
                  className="wow fadeInUp widget-search"
                  style={{ marginTop: "20px" }}
                >
                  <form
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
        <div className="tf-section-2 discover-item loadmore-12-item">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-12">
                <div className="widget-tabs relative">
                  <div className="widget-content-tab pt-10">
                    <div className="row">
                      {pieces?.map((artPiece, idx) => (
                        <div
                          key={idx}
                          className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6"
                        >
                          <div className="tf-card-box style-1">
                            <div className="card-media">
                              <Link href="#">
                                <Image src={artPiece.assets[0].url} alt="" />
                              </Link>
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
                                <Image
                                  src={
                                    artPiece?.author?.avatar
                                      ? artPiece?.author?.avatar
                                      : "/assets/images/avatar/avatar-box-03.jpg"
                                  }
                                  alt="Image"
                                />
                              </div>
                              <div className="info">
                                <span className="tf-color">Created by:</span>
                                <h6>
                                  <Link href="/author-2">{`${
                                    artPiece?.author
                                      ? `${artPiece?.author?.firstName} ${artPiece?.author?.lastName}`
                                      : "Kathryn Murphy"
                                  }`}</Link>{" "}
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
                </div>
              </div>
              <div className="col-md-12 load-more">
                <a id="button-loadmore" className="tf-button-loadmore">
                  <span>Load More</span>
                  <i className="icon-loading-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
