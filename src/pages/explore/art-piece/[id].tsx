import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
// import Image from "@/components/common/image";
import BarChart from "@/open9/elements/BarChart";
import Layout from "@/open9/layout/Layout";
import FeaturedSlider1 from "@/open9/slider/FeaturedSlider1";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import { CollectionsOutlined } from "@mui/icons-material";
import Image from "next/image";
import {
  Avatar,
  Card,
  CardContent,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { ViewProps } from "@/pages/dashboard/artworks/[id]";
import ViewDetailsModal from "@/components/dashboard/view-details-modal";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(
      token ? `/art-piece/${id}` : `/art-piece/public/${id}`,
      { headers: { authorization: `Bearer ${token?.user?.accessToken}` } },
    );

    console.log(res?.data);

    return {
      props: {
        artPiece: res.data.artPiece,
        relatedArtPieces: res.data.relatedArtPieces || [],
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

const currentTime = new Date();

export default function ArtPiece({ artPiece, relatedArtPieces }) {
  const [openView, setOpenView] = useState<ViewProps>({
    open: false,
    type: "",
    data: {},
  });

  return (
    <>
      <Layout headerStyle={2} footerStyle={1}>
        <div>
          <div className="tf-section-2 product-detail">
            <div className="themesflat-container">
              <div className="row">
                <div data-wow-delay="0s" className="wow fadeInLeft col-md-8">
                  {artPiece?.assets?.length > 0 &&
                    artPiece?.assets?.map((asset) => (
                      <div
                        key={asset?._id}
                        className="tf-card-box style-5 mb-0"
                      >
                        <div className="card-media rounded-xl overflow-hidden mb-0">
                          <Image
                            width={454}
                            height={467}
                            src={asset?.url}
                            alt=""
                          />
                          <div className="flex w-full"></div>
                        </div>
                        <h6 className="price gem">
                          <i className="icon-gem" />
                        </h6>
                        <div className="wishlist-button">
                          10
                          <i className="icon-heart" />
                        </div>
                        <div className="featured-countdown">
                          {/* <Countdown endDateTime={currentTime.setDate(currentTime.getDate() + 2)} /> */}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-md-4">
                  <div
                    data-wow-delay="0s"
                    className="wow fadeInRight infor-product"
                  >
                    <div className="text"></div>
                    <div className="menu_card">
                      <Menu as="div" className="dropdown">
                        <div className="icon">
                          <Menu.Button
                            as="a"
                            className="btn-link"
                            aria-expanded="false"
                          >
                            <i className="icon-link-1" />
                          </Menu.Button>
                          <Menu.Items
                            as="div"
                            className="dropdown-menu show d-block"
                          >
                            <Link className="dropdown-item" href="#">
                              <i className="icon-link" />
                              Copy link
                            </Link>
                            <Link className="dropdown-item" href="#">
                              <i className="icon-facebook" />
                              Share on facebook
                            </Link>
                            <Link className="dropdown-item mb-0" href="#">
                              <i className="icon-twitter" />
                              Share on twitter
                            </Link>
                          </Menu.Items>
                        </div>
                      </Menu>
                      <Menu as="div" className="dropdown">
                        <div className="icon">
                          <Menu.Button
                            as="a"
                            className="btn-link"
                            aria-expanded="false"
                          >
                            <i className="icon-content" />
                          </Menu.Button>
                          <Menu.Items
                            as="div"
                            className="dropdown-menu show d-block"
                          >
                            <Link className="dropdown-item" href="#">
                              <i className="icon-refresh" />
                              Refresh metadata
                            </Link>
                            <Link className="dropdown-item mb-0" href="#">
                              <i className="icon-report" />
                              Report
                            </Link>
                          </Menu.Items>
                        </div>
                      </Menu>
                    </div>
                    <h2>{artPiece?.title}</h2>
                    <div className="author flex gap-2 items-center mb-30">
                      <Avatar src={artPiece.creator?.profile?.avatar} />

                      <div className="info">
                        <Typography variant="body2" component="span">
                          Created by:
                        </Typography>
                        <h6>
                          <Link
                            className="tf-color font-semibold"
                            href={`/artist/${artPiece?.creator?.profile?._id}`}
                          >{`${
                            artPiece?.custodian?.profile
                              ? `${artPiece?.custodian?.profile?.firstName} ${artPiece?.custodian?.profile?.lastName}`
                              : ""
                          }`}</Link>{" "}
                        </h6>
                      </div>
                    </div>
                    {/* <div className="meta mb-20">
                      <div className="meta-item view">
                        <i className="icon-show" />
                        208 view
                      </div>
                      <div className="meta-item rating">
                        <i className="icon-link-2" />
                        Top #2 trending
                      </div>
                      <div className="meta-item favorites">
                        <i className="icon-heart" />
                        10 favorites
                      </div>
                    </div> */}
                  </div>
                  {/* <div
                    data-wow-delay="0s"
                    className="wow fadeInRight product-item time-sales"
                  >
                    <h6 className=" ">
                      <i className="icon-clock" />
                      Sale ends May 22 at 9:39
                    </h6>
                    <div className="content">
                      <div className="text">Current price</div>
                      <div className="flex justify-between">
                        <p>
                          0,032 ETH <span>$58,11</span>
                        </p>
                        <Link href="#" className="tf-button style-1 h50 w216">
                          Place a bid
                          <i className="icon-arrow-up-right2" />
                        </Link>
                      </div>
                    </div>
                  </div> */}
                  {/* ------------- Artpiece Details --------- */}
                  <Card
                    data-wow-delay="0s"
                    className="wow fadeInRight product-item rounded-xl time-sales"
                  >
                    <Typography
                      variant="h3"
                      className="text-gray-800"
                      gutterBottom
                    >
                      Details
                    </Typography>
                    <CardContent
                      component={"div"}
                      className="grid grid-cols-2 gap-6 text-gray-800 text-lg"
                    >
                      <Typography className="text-xl font-semibold">
                        Subject Matter:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.subjectMatter}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Type:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.artType}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Medium:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.medium}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Ratity:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.rarity}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Verification Status:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.verificationStatus === "verified"
                          ? "Verified"
                          : "Unverified"}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Depth:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.depth}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Height:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.height}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Width:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.width}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Weight:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        {artPiece?.weight}
                      </Typography>
                      <Typography className="text-xl font-semibold">
                        Rating:
                      </Typography>
                      <Typography className="text-xl capitalize">
                        <Rating value={artPiece?.rating} readOnly />
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* ------------- Artpiece Description --------- */}
                  <Card
                    data-wow-delay="0s"
                    className="wow fadeInRight rounded-xl product-item description"
                  >
                    <Typography
                      variant="h3"
                      gutterBottom
                      className="text-gray-800 space-x-3"
                    >
                      <i className="icon-description" /> Description
                    </Typography>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <Typography variant="body2" className="text-gray-800">
                        {artPiece?.description}
                      </Typography>
                    </div>
                  </Card>
                  {/* <div
                    data-wow-delay="0s"
                    className="wow fadeInRight product-item history"
                  >
                    <h6 className=" ">
                      <i className="icon-description" />
                      Price History
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">

                      <BarChart />
                    </div>
                  </div> */}
                </div>

                {/* ----------- Verication Details --------- */}
                <div className="col-12 mt-8">
                  <div className="product-item rounded-xl details">
                    <h6 className=" ">
                      <i className="icon-description" />
                      Verification Details
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <div className="details-item">
                        <span>Contract Address</span>
                        <span className="tf-color">0x1984...c38f</span>
                      </div>
                      <div className="details-item">
                        <span>Token ID</span>
                        <span className="tf-color">0270</span>
                      </div>
                      <div className="details-item">
                        <span>Token Standard</span>
                        <span>ERC-721</span>
                      </div>
                      <div className="details-item">
                        <span>Chain</span>
                        <span>Ethereum</span>
                      </div>
                      <div className="details-item">
                        <span>Last Updated</span>
                        <span>8 months ago</span>
                      </div>
                      <div className="details-item mb-0">
                        <span>Creator Earnings</span>
                        <span>8%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ------------- Publications ---------  */}
                <div className="col-12">
                  <div className="product-item rounded-xl item-activity mb-6">
                    <h6 className=" ">
                      <i className="icon-two-arrow rotateZ90" />
                      Publications
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <div className="table-heading">
                        {/* <div className="column">Article Name</div> */}
                        <div className="column">Publication Name</div>
                        {/* <div className="column">Author</div>
                        <div className="column">Attachment</div>
                        <div className="column">Notes</div> */}
                      </div>
                      {artPiece?.publications?.map((publication) => (
                        <div
                          onClick={() =>
                            setOpenView({
                              open: true,
                              type: "publication",
                              data: publication,
                            })
                          }
                          key={publication?._id}
                          className="table-item hover:bg-gray-200 cursor-pointer p-2"
                        >
                          <div className="column">
                            {publication?.publicationName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ----------- Exhibition ----------- */}
                <div className="col-12 ">
                  <div className="product-item rounded-xl item-activity mb-6">
                    <h6 className=" ">
                      <i className="icon-description" />
                      Exhihibition
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <div className="table-heading">
                        <div className="column">Name</div>
                        <div className="column">Type</div>
                        <div className="column">Showing </div>
                      </div>
                      {artPiece?.exhibitions?.map((exhibition) => (
                        <div
                          onClick={() =>
                            setOpenView({
                              open: true,
                              data: exhibition,
                              type: "exhibition",
                            })
                          }
                          key={exhibition?._id}
                          className="table-item hover:bg-gray-200 cursor-pointer p-2"
                        >
                          <div className="column capitalize">
                            {exhibition?.name}
                          </div>
                          <div className="column capitalize">
                            {exhibition?.type}
                          </div>
                          <div className="column capitalize">
                            {exhibition?.showingType}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ---------- Provenance ---------- */}
                {/* <div className="col-12">
                  <div className="product-item offers">
                    <h6 className=" ">
                      <i className="icon-description" />
                      Provenance
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <div className="table-heading">
                        <div className="column">Price</div>
                        <div className="column">USD Price</div>
                        <div className="column">Quantity</div>
                        <div className="column">Floor Diference</div>
                        <div className="column">Expiration</div>
                        <div className="column">Form</div>
                      </div>
                      <div className="table-item">
                        <div className="column">
                          <h6 className="price gem">
                            <i className="icon-gem" />
                            0,0034
                          </h6>
                        </div>
                        <div className="column">$6,60</div>
                        <div className="column">3</div>
                        <div className="column">90% below</div>
                        <div className="column">In 26 day</div>
                        <div className="column">
                          <span className="tf-color">273E40</span>
                        </div>
                      </div>
                      <div className="table-item">
                        <div className="column">
                          <h6 className="price gem">
                            <i className="icon-gem" />
                            0,0034
                          </h6>
                        </div>
                        <div className="column">$6,60</div>
                        <div className="column">3</div>
                        <div className="column">90% below</div>
                        <div className="column">In 26 day</div>
                        <div className="column">
                          <span className="tf-color">273E40</span>
                        </div>
                      </div>
                      <div className="table-item">
                        <div className="column">
                          <h6 className="price gem">
                            <i className="icon-gem" />
                            0,0034
                          </h6>
                        </div>
                        <div className="column">$6,60</div>
                        <div className="column">3</div>
                        <div className="column">90% below</div>
                        <div className="column">In 26 day</div>
                        <div className="column">
                          <span className="tf-color">273E40</span>
                        </div>
                      </div>
                      <div className="table-item">
                        <div className="column">
                          <h6 className="price gem">
                            <i className="icon-gem" />
                            0,0034
                          </h6>
                        </div>
                        <div className="column">$6,60</div>
                        <div className="column">3</div>
                        <div className="column">90% below</div>
                        <div className="column">In 26 day</div>
                        <div className="column">
                          <span className="tf-color">273E40</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* ------- Appraisals ------- */}
                <div className="col-12">
                  <div className="product-item rounded-xl item-activity mb-6">
                    <h6 className=" ">
                      <i className="icon-two-arrow rotateZ90" />
                      Appraisals
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <div className="table-heading">
                        <div className="column">Appraiser Name</div>
                      </div>
                      {artPiece?.appraisals?.map((appraisal) => (
                        <div
                          onClick={() =>
                            setOpenView({
                              open: true,
                              type: "appraisal",
                              data: appraisal,
                            })
                          }
                          key={appraisal?._id}
                          className="table-item hover:bg-gray-200 cursor-pointer p-2"
                        >
                          <div className="column ">{appraisal?.appraiser}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ------- Locations ---------- */}
                <div className="col-12">
                  <div className="product-item rounded-xl item-activity mb-0">
                    <h6 className=" ">
                      <i className="icon-two-arrow rotateZ90" />
                      Locations
                    </h6>
                    <i className="icon-keyboard_arrow_down" />
                    <div className="content">
                      <div className="table-heading">
                        {/* <div className="column">Name</div>
                        <div className="column">Address</div>
                        <div className="column">Start Date</div>
                        <div className="column">End Date</div>
                        <div className="column">notes</div> */}
                      </div>
                      {artPiece?.locations?.map((location) => (
                        <div
                          key={location?._id}
                          onClick={() =>
                            setOpenView({
                              open: true,
                              type: "location",
                              data: location,
                            })
                          }
                          className="table-item hover:bg-gray-200 cursor-pointer p-2"
                        >
                          <div className="column flex items-center">
                            {/* <i className="icon-two-arrow" /> */}
                            {location?.name}
                          </div>
                          {/* <div className="column">{location?.address}</div> */}
                          {/* <div className="column">
                            <span className="tf-color">
                              {dayjs(location?.startDate).format(
                                "DD MMM, YYYY",
                              )}
                            </span>
                          </div>
                          <div className="column">
                            <span className="tf-color">
                              {dayjs(location?.endDate).format("DD MMM, YYYY")}
                            </span>
                          </div>
                          <div className="column">{location?.notes}</div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tf-section-2 featured-item style-bottom">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading-section pb-20">
                    <h2 className="tf-title">Related pieces</h2>
                    <Link href="/explore-3">
                      Discover more <i className="icon-arrow-right2" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <FeaturedSlider1
                    currentId={artPiece._id}
                    relatedArtPieces={relatedArtPieces}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ViewDetailsModal
          viewProps={openView}
          onClose={() =>
            setOpenView({
              open: false,
              data: null,
              type: "",
            })
          }
        />
      </Layout>
    </>
  );
}
