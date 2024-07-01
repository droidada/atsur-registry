import IArtPieceDetails from "@/types/models/exploreArtpieceDetails";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Rating,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

interface Props {
  artpiece: IArtPieceDetails;
}

const HeroSection: React.FC<Props> = ({ artpiece }) => {
  const [assets, setAssets] = useState(artpiece?.assets);
  const [currentAsset, setCurrentAsset] = useState(0);

  useEffect(() => {
    setAssets(artpiece?.assets);
  }, [artpiece]);

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignContent={{ xs: "center", md: "stretch" }}
        spacing={4}
      >
        <Stack
          spacing={2}
          className=" w-full max-w-[590px]"
          direction={"column"}
        >
          <Image
            src={assets[currentAsset]?.url}
            alt={artpiece.title}
            width={590}
            height={665}
            className="h-full w-full max-w-[590px]  object-cover"
          />
        </Stack>
        <Stack className="flex-1 py-8" spacing={4} direction={"column"}>
          <Stack spacing={2} direction={"row"} className="">
            <div className="flex font-[600] text-[17px] leading-[16px] gap-2 text-justify items-center">
              <span
                className={`w-[25px] h-[25px] rounded-full ${
                  artpiece?.verification?.status == "verified"
                    ? "bg-[#18BAFF]"
                    : "bg-secondary"
                }`}
              />

              <span>
                {artpiece?.verification?.status == "verified"
                  ? "Verified"
                  : "Unverified"}
              </span>
            </div>
          </Stack>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl  capitalize text-primary lg:text-[90px] lg:leading-[70px] md:text-[60px] md:leading-[50px]">
              {artpiece?.title}
            </h1>
            <p className="w-full text-sm text-justify text-primary">
              {artpiece?.description}
            </p>
          </div>

          <Stack spacing={2} alignItems={"center"} direction={"row"}>
            {/* @ts-ignore */}
            <Stack
              component={Link}
              href={`/explore/artist/${artpiece.custodian?.profile?.id}`}
              direction={"row"}
              spacing={1}
            >
              <Avatar
                alt={artpiece?.custodian?.profile?.firstName}
                className="w-[23px] h-[23px] bg-primary"
                src={artpiece.custodian?.profile?.avatar}
              />
              <span className="text-sm font-[600]">
                Created by {artpiece?.custodian?.profile?.firstName}{" "}
                {artpiece?.custodian?.profile?.lastName}{" "}
              </span>
            </Stack>
            {/* <Rating
              name="rating"
              className="bg-secondary px-2 py-1 rounded-[16px]"
              value={artpiece.rating}
              readOnly
              size="small"
            /> */}
          </Stack>

          <Accordion className="bg-white" defaultExpanded={true}>
            <AccordionSummary
              className="bg-primary px-2 text-[20px] font-[600] leading-[16px] py-2 text-white "
              expandIcon={<MdOutlineExpandMore />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Details
            </AccordionSummary>
            <AccordionDetails className="grid grid-cols-2 capitalize gap-x-10 gap-y-4 justify-between text-sm">
              <span className="font-[600]  ">Subject Matter</span>
              <span className="font-[400]">{artpiece.subjectMatter}</span>
              <span className="font-[600]  ">Type</span>
              <span className="font-[400]">{artpiece.artType}</span>
              <span className="font-[600]  ">Medium</span>
              <span className="font-[400]">{artpiece.medium}</span>
              <span className="font-[600]  ">Rarity</span>
              <span className="font-[400]">{artpiece.rarity}</span>
              {artpiece.depth > 0 && (
                <>
                  <span className="font-[600]">Depth</span>
                  <span className="font-[400]">{artpiece.depth}</span>
                </>
              )}
              <span className="font-[600]  ">Height</span>
              <span className="font-[400]">
                {artpiece.height} &quot; inches
              </span>
              <span className="font-[600]  ">Width</span>
              <span className="font-[400]">
                {artpiece.width} &quot; inches{" "}
              </span>
              {artpiece.weight > 0 && (
                <>
                  <span className="font-[600]  ">Weight</span>
                  <span className="font-[400]">{artpiece.weight} kg</span>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
      {assets.length > 1 && (
        <Stack direction={"row"} spacing={1}>
          {assets.map((img, index) => (
            <div
              key={img._id}
              className={`${
                currentAsset === index ? "border-2 border-primary" : ""
              } p-3 w-[200px] h-[200px]`}
            >
              <Image
                src={img.url}
                alt={artpiece.title}
                width={200}
                height={200}
                className="w-full h-full object-cover"
                onClick={() => setCurrentAsset(index)}
              />
            </div>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default HeroSection;
