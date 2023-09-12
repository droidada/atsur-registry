/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-typos */
import CuratorsPick from "@/components/curatorsPick";
import Layout from "@/components/layout";
import React, { use, useEffect, useState } from "react";
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
import directus from "@/lib/directus";
import { readItem, readItems } from "@directus/sdk";
import RequestInfo from "@/components/artwork/RequestInfo";
import ContactGallery from "@/components/artwork/ContactGallery";

const Artwork = ({ data }) => {
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
  return (
    <Layout>
      <div className="p-10 flex flex-col gap-6">
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full px-[50px] py-0">
            <CarouselProvider
              naturalSlideWidth={90}
              naturalSlideHeight={90}
              totalSlides={totalSlides}
              interval={3000}
              isPlaying={true}
              currentSlide={activeSlide}
              playDirection="forward"
              //   onChange={handleSlideChange}
            >
              <Slider className="w-full">
                {data.assets.map((asset) => (
                  <Slide key={asset.id} index={asset.id}>
                    <Image
                      alt={data.entry.artwork_title}
                      width={600}
                      priority={true}
                      height={600}
                      className="w-full h-[90%]"
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}assets/${asset.directus_files_id}?width=600`}
                    />
                  </Slide>
                ))}
              </Slider>

              <DotGroup className="custom-dots-container flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
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
            <h3 className="text-[24px] font-normal">
              {data.entry.artwork_title}
            </h3>
            <h3 className="text-[24px] font-normal">
              {data?.entry?.series_title}
            </h3>
            <p className="text-[16px] font-normal mt-5">
              {data?.entry?.subject_matter}
            </p>
            <p className="text-[16px] font-normal">
              {decimalToMixedNumber(data?.entry?.height)} ×{" "}
              {decimalToMixedNumber(data?.entry?.width)} ×{" "}
              {decimalToMixedNumber(data?.entry?.weight)} in |{" "}
              {inchesToCentimetersAndRoundUp(data?.entry?.height)} ×{" "}
              {inchesToCentimetersAndRoundUp(data?.entry?.width)} ×
              {inchesToCentimetersAndRoundUp(data?.entry?.weight)}
              cm
            </p>
            <p className="text-[16px] font-normal">Frame included</p>
            <div className="flex items-center gap-3 mt-5 mb-2">
              <WorkOutlineIcon />
              <p className="underline">{data?.entry?.rarity}</p>
            </div>
            <div className="flex items-center gap-3">
              <CardMembershipIcon />
              <p>Includes a</p>
              <p className="underline">Certificate of authenticity</p>
            </div>
            <div className="text-[16px] font-normal mt-5">
              <div
                dangerouslySetInnerHTML={{ __html: data.entry.description }}
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
            </div>
          </div>
        </div>
        <CuratorsPick title={"Other works from Minne Atairu"} length={4} />
        <CuratorsPick
          title={"Other works from Bartha Contemporary"}
          length={4}
        />
      </div>
      <RequestInfo
        open={openRequestInfo}
        handleClose={handleCloseRequestInfo}
      />
      <ContactGallery
        open={openContactGallery}
        handleClose={handleCloseContactGallery}
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
export const getServerSideProps = async (ctx) => {
  const entry = await directus.request(readItem("entry", ctx.params.index));
  const assets = await directus.request(
    readItems("assets_files", {
      filter: {
        assets_id: {
          _eq: entry.primary_image.key,
        },
      },
    }),
  );

  return {
    props: {
      data: {
        assets,
        entry,
      },
    },
  };
};

export default Artwork;
