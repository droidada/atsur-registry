/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-typos */
import React, { use, useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import CuratorsPick from "@/components/curatorsPick";
import Layout from "@/components/layout/layout";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import RequestInfo from "@/components/artwork/RequestInfo";
import ContactGallery from "@/components/artwork/ContactGallery";
import { TransakConfig, Transak } from "@transak/transak-sdk";
import { defaultTransakConfig } from "@/lib/utils/transkConfig";
import { useAuthContext } from "@/providers/auth.context";
import { useRouter } from "next/router";
import { Dialog } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ConfirmPurchase from "@/components/artwork/ConfirmPurchase";
import ConfirmSuccess from "@/components/artwork/ConfirmSuccess";

const Artwork = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const axiosAuth = useAxiosAuth();
  // useEffect(() => {

  //   async () => {
  //     const res = await axiosAuth.get("/items/entry/2");
  //     setData(res.data.data);
  //     console.log("we have data here ", data)
  //   };
  // },[])

  const { user } = useAuthContext();
  const router = useRouter();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    //  connect();
  }, []);

  useEffect(() => {
    // Cleanup code
    return () => {
      // transak.close();
    };
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);
  const [openRequestInfo, setOpenRequestInfo] = useState(false);
  const [openContactGallery, setOpenContactGallery] = useState(false);
  const handleOpenRequestInfo = () => {
    setOpenRequestInfo(true);
  };
  const handleCloseRequestInfo = () => {
    setOpenRequestInfo(false);
  };
  const handleOpenContactGallery = () => {
    setOpenContactGallery(true);
  };
  const handleCloseContactGallery = () => {
    setOpenContactGallery(false);
  };
  const handleDotClick = (index) => {
    setActiveSlide(index);
  };
  const handleSlideChange = (newSlide) => {
    setActiveSlide(newSlide);
    handleDotClick(newSlide); // Call handleDotClick when slide changes
  };

  const totalSlides = 3;

  const buy = async () => {
    try {
      if (!user) {
        alert("you need to be logged in to buy. Please login.");
        return;
      }
      setOpen(true);
      // const transakConfig: TransakConfig = {
      //   ...defaultTransakConfig,
      //   // .....
      //   fiatAmount: 130,
      //   partnerCustomerId: user.id,
      //   email: user.email,
      // };

      // const transak = new Transak(transakConfig);
      // transak.init();
      // alert("transk onboading and on-ramping stuff here...");
      // router.push("/wallet/74899349834938");
    } catch (error) {
      console.log("error activating metamask ", error);
    }
  };

  const simulateLoading = () => {
    // Set loading state to true
    setLoading(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      // After 2 seconds, set loading state to false and show success modal
      setOpen(false);
      setLoading(false);
      setShowModal(true);

      // Reset modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }, 2000);
  };
  return (
    <Layout>
      <div className="p-10 flex flex-col gap-6">
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full px-[50px] py-0">
            <CarouselProvider
              naturalSlideWidth={90}
              naturalSlideHeight={90}
              totalSlides={data?.assets.length}
              interval={3000}
              isPlaying={true}
              currentSlide={activeSlide}
              playDirection="forward"
              //   onChange={handleSlideChange}
            >
              <Slider className="w-full h-[100%]">
                {data?.assets.map((asset, idx) => (
                  <Slide key={idx} index={asset}>
                    <Image
                      alt={data?.artwork_title || "title"}
                      width={600}
                      priority={true}
                      height={600}
                      className="w-full h-[100%]"
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}assets/${asset?.directus_files_id}?width=600`}
                    />
                  </Slide>
                ))}
              </Slider>

              <DotGroup className="custom-dots-container flex justify-center gap-2">
                {Array.from({ length: data?.assets.length }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-20 m-2 h-[2px] ${
                      activeSlide === index ? "bg-black" : "bg-gray-300"
                    }`}
                    onClick={() => handleDotClick(index)}
                  ></div>
                ))}
              </DotGroup>
            </CarouselProvider>
          </div>

          <div>
            <h3 className="text-[24px] font-normal">{data?.artwork_title}</h3>
            <h3 className="text-[24px] font-normal">{data?.series_title}</h3>
            <p className="text-[16px] font-normal mt-5">
              {data?.subject_matter}
            </p>
            <p className="text-[16px] font-normal">
              {decimalToMixedNumber(data?.height)} ×{" "}
              {decimalToMixedNumber(data?.width)} ×{" "}
              {decimalToMixedNumber(data?.weight)} in |{" "}
              {inchesToCentimetersAndRoundUp(data?.height)} ×{" "}
              {inchesToCentimetersAndRoundUp(data?.width)} ×
              {inchesToCentimetersAndRoundUp(data?.weight)}
              cm
            </p>
            <p className="text-[16px] font-normal">Frame included</p>
            <div className="flex items-center gap-3 mt-5 mb-2">
              <WorkOutlineIcon />
              <p className="underline">{data?.rarity}</p>
            </div>
            <div className="flex items-center gap-3">
              <CardMembershipIcon />
              <p>Includes a</p>
              <p className="underline">Certificate of authenticity</p>
            </div>
            <div className="text-[16px] font-normal mt-5">
              <div
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></div>
            </div>
            <p className="text-[16px] font-normal mt-5">Bartha Contemporary</p>
            <p className="text-[12px] font-normal">London</p>
            <div className="flex flex-wrap gap-8 mt-10">
              <button
                className="border border-solid border-black px-12 py-5"
                onClick={handleOpenRequestInfo}
              >
                Request Info
              </button>
              <button
                className="border border-solid border-black px-12 py-5"
                onClick={handleOpenContactGallery}
              >
                Contact Gallery
              </button>
              <button
                className="border border-solid border-black px-12 py-5"
                onClick={buy}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
        {data?.artists &&
          data?.artists.map((artist: any, idx) => (
            <CuratorsPick
              key={idx}
              artist_id={data.id}
              data={artist}
              title={`Other works from ${artist?.directus_users_id?.first_name} ${artist?.directus_users_id?.last_name}`}
              length={6}
            />
          ))}
        {/* <CuratorsPick title={"Other works from Minne Atairu"} length={4} /> */}
      </div>
      <RequestInfo
        open={openRequestInfo}
        handleClose={handleCloseRequestInfo}
      />
      <ContactGallery
        open={openContactGallery}
        handleClose={handleCloseContactGallery}
      />
      <ConfirmPurchase
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={simulateLoading}
        name={data?.artwork_title}
        loading={loading}
      />
      <ConfirmSuccess
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
    </Layout>
  );
};
const decimalToMixedNumber = (decimal) => {
  const tolerance = 1e-8; // A small value to account for floating-point precision
  let wholePart = Math.floor(decimal);
  let fractionalPart = decimal - wholePart;

  let numerator = 0;
  let denominator = 1;

  while (Math.abs(fractionalPart - Math.round(fractionalPart)) > tolerance) {
    fractionalPart *= 10;
    numerator = Math.round(fractionalPart);
    denominator *= 10;
    fractionalPart -= numerator;
  }

  if (numerator === 0) {
    return wholePart.toString();
  }

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const commonDivisor = gcd(numerator, denominator);

  numerator /= commonDivisor;
  denominator /= commonDivisor;

  return `${wholePart} ${numerator}/${denominator}`;
};
const inchesToCentimetersAndRoundUp = (inches: number) => {
  const centimeters = inches * 2.54; // Convert inches to centimeters
  const roundedCentimeters = Math.ceil(centimeters); // Round up to the nearest whole number
  return roundedCentimeters;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps = async (ctx) => {
  try {
    const res = await fetch(
      `https://admin.atsur.art/items/entry/${ctx.params.index}?fields=*,assets.*,asset_files.*,artists.directus_users_id.first_name,artists.directus_users_id.last_name,artists.directus_users_id.avatar,artists.directus_users_id.artworks.entry_id.id,artists.directus_users_id.artworks.entry_id.artwork_title,artists.directus_users_id.artworks.entry_id.year_created,artists.directus_users_id.artworks.entry_id.series_title,artists.directus_users_id.artworks.entry_id.assets.*`,
      // `https://admin.atsur.art/items/entry/${ctx.params.index}?fields=*,assets.*, asset_files.*`,
    );
    const data = await res.json();
    console.log(" we have data here ", data.data);
    return {
      props: {
        data: data.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
  // return notFound()
};

export default Artwork;
