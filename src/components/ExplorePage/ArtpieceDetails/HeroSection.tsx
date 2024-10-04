import IArtPieceDetails from "@/types/models/exploreArtpieceDetails";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Rating,
  Stack,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  MdArrowBack,
  MdArrowForward,
  MdClose,
  MdOutlineExpandMore,
} from "react-icons/md";

interface Props {
  artpiece: IArtPieceDetails;
}

const HeroSection: React.FC<Props> = ({ artpiece }) => {
  const [assets, setAssets] = useState(artpiece?.assets);
  const [currentAsset, setCurrentAsset] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const checkUser = artpiece.custodian?.profile?.id == session?.user?._id;

  useEffect(() => {
    setAssets(artpiece?.assets);
  }, [artpiece]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentAsset((prev) => (prev === 0 ? assets.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentAsset((prev) => (prev === assets.length - 1 ? 0 : prev + 1));
  };

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignContent={{ xs: "center", md: "stretch" }}
        spacing={4}
      >
        <Stack
          spacing={2}
          className=" w-full max-w-[590px] relative cursor-pointer group"
          direction={"column"}
          onClick={handleOpenModal}
        >
          <div className="w-full absolute top-0 left-0 z-10 text-white hidden   h-full bg-black/50 group-hover:grid place-items-center">
            View
          </div>
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
            <div className="flex  w-full font-[600] text-[17px] justify-between leading-[16px] gap-2 text-justify items-center">
              <div className="flex gap-2 items-center">
                <span
                  className={`w-[25px] h-[25px] rounded-full ${
                    artpiece?.verification?.status == "verified"
                      ? "bg-[#18BAFF]"
                      : "bg-secondary"
                  }`}
                />

                <span
                  className={
                    artpiece?.verification?.status == "verified"
                      ? "text-[#18BAFF]"
                      : "text-secondary"
                  }
                >
                  {artpiece?.verification?.status == "verified"
                    ? "Verified"
                    : "Unverified"}
                </span>
              </div>

              {checkUser && (
                <Button
                  variant="contained"
                  className="bg-primary text-white"
                  onClick={() =>
                    router.push(`/dashboard/artworks/${artpiece?._id}/edit`)
                  }
                >
                  Edit
                </Button>
              )}
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
              {artpiece?.dimensions?.depth > 0 && (
                <>
                  <span className="font-[600]">Depth</span>
                  <span className="font-[400]">
                    {artpiece?.dimensions?.depth}
                  </span>
                </>
              )}
              <span className="font-[600]  ">Height</span>
              <span className="font-[400]">
                {artpiece.dimensions?.height} &quot; inches
              </span>
              <span className="font-[600]  ">Width</span>
              <span className="font-[400]">
                {artpiece?.dimensions?.width} &quot; inches{" "}
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

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        PaperProps={{
          className: "py-8 max-w-[550px] w-full px-6 relative",
        }}
      >
        <DialogContent className="relative">
          <IconButton
            onClick={handleCloseModal}
            className="absolute top-0 grid place-items-center rounded-full bg-white  right-2 z-[30]"
          >
            <MdClose />
          </IconButton>
          <IconButton
            onClick={handlePrevImage}
            className={`absolute top-1/2 left-0 ${
              assets.length === 1 ? "hidden" : ""
            } transform  grid place-items-center rounded-full bg-white z-10 -translate-y-1/2`}
          >
            <MdArrowBack />
          </IconButton>
          <div className="relative">
            <Image
              src={assets[currentAsset]?.url}
              alt={artpiece.title}
              width={450}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </DialogContent>
        <IconButton
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 grid place-items-center rounded-full bg-white z-10  transform -translate-y-1/2"
        >
          <MdArrowForward />
        </IconButton>
      </Dialog>
    </Stack>
  );
};

export default HeroSection;
