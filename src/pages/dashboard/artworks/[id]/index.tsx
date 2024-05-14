import { useEffect, useState } from "react";

import Image from "@/components/common/image";

import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";

import {
  Avatar,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  FormControlLabel,
  Button,
} from "@mui/material";

import { useRouter } from "next/router";
import ProtectedPage from "@/HOC/Protected";
import { FaCircle } from "react-icons/fa";
import { MdOutlineChevronRight, MdOutlineExpandMore } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";
import moment from "moment";
import ArtPieceExhibition from "@/components/dashboard/artwork/Details/Exhibition";
import ArtPieceAppraisal from "@/components/dashboard/artwork/Details/Appraisal";
import ArtPiecePublications from "@/components/dashboard/artwork/Details/Publications";
import ArtPieceLocation from "@/components/dashboard/artwork/Details/Location";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { artPiece: res.data.artPiece } };
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

export type ViewProps = {
  open: boolean;
  type:
    | "publication"
    | "appraisal"
    | "publication"
    | "location"
    | "exhibition"
    | "";
  data: any;
};

function ArtPiece({ artPiece }) {
  const router = useRouter();
  const [currentAsset, setCurrentAsset] = useState(0);
  const [openViewDiaglog, setOpenViewDialog] = useState<ViewProps>({
    open: false,
    type: "",
    data: {},
  });

  return (
    <Stack
      spacing={4}
      className=" divide-y-[1px]  divide-secondary"
      direction={{ xs: "column" }}
    >
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          className="text-[17px] leading-[16px]"
          spacing={4}
          alignContent={{ xs: "start", md: "center" }}
          justifyContent="space-between"
        >
          <div className="flex gap-4 ">
            <div
              className={`flex gap-2 items-center  ${
                artPiece?.verification?.status === "verified"
                  ? "text-[#18BAFF] font-[600]"
                  : "text-secondary"
              }`}
            >
              <FaCircle /> <span>Verified</span>
            </div>
            <div
              className={`flex gap-2 items-center  ${
                artPiece?.verification?.status !== "verified"
                  ? "text-[#18BAFF] font-[600]"
                  : "text-secondary"
              }`}
            >
              <FaCircle /> <span>Unverified</span>
            </div>
          </div>
          <div>
            <FormControlLabel
              className=""
              labelPlacement="start"
              control={<Switch size="small" />}
              label="Publish"
            />
          </div>
        </Stack>

        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <h1 className=" text-3xl md:text-4xl lg:text-6xl font-[400]">
            {artPiece?.title}
          </h1>
          <Button
            endIcon={<MdOutlineChevronRight />}
            className="bg-secondary text-[13px] flex-shrink-0 leading-[16px] font-[400] text-primary max-w-[138px] h-[39px]"
          >
            View Requests
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={4} className="flex-1 w-full">
        <Stack spacing={2} className="py-6">
          <Stack direction="row" alignItems={"center"} spacing={4}>
            <div className="flex items-center gap-2">
              <Avatar
                className="w-[36.37px] h-[39.46px]"
                src={artPiece?.custodian?.profile?.avatar}
              />
              <p className="text-[19px] leading-[16px] font-[600] ">
                {artPiece?.custodian?.profile?.firstName}{" "}
                {artPiece?.custodian?.profile?.lastName[0]}.
              </p>
            </div>
            <div className="flex gap-2 items-center text-xs font-[300]">
              <GiAlarmClock />
              <span>Created</span>
              <span>{moment(artPiece?.createdAt).format("DD/MM/YYYY")}</span>
            </div>
          </Stack>
          <div className="w-full">
            <Image
              src={artPiece?.assets[currentAsset]?.url}
              alt="art piece image"
              width={700}
              height={404}
              className="flex-1 w-full md:h-[404px]  object-full "
            />
          </div>
          <div className="flex flex-wrap-reverse items-stretch gap-4">
            <Accordion
              className=" bg-secondary-white px-4 divide-secondary w-full  divide-y-[1px]"
              defaultExpanded={true}
            >
              <AccordionSummary
                className=" border-b-[1px] border-primary    text-[20px] font-[600] leading-[16px] text-primary "
                expandIcon={<MdOutlineExpandMore className="text-primary" />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Description
              </AccordionSummary>
              <AccordionDetails className="text-sm py-4">
                {artPiece?.description}
              </AccordionDetails>
            </Accordion>
            <div className="flex flex-shrink-0 gap-4">
              {artPiece?.assets?.map((asset, index) => (
                <Image
                  src={asset?.url}
                  alt=""
                  width={210.35}
                  height={210.35}
                  className={`flex-1 w-full max-w-[210px] cursor-pointer  h-full object-full ${
                    currentAsset == index ? "border-2 border-black p-2" : ""
                  }`}
                  key={index}
                  onClick={() => setCurrentAsset(index)}
                />
              ))}
            </div>
          </div>
          <ArtPieceExhibition
            artPieceId={artPiece?._id}
            exhibitions={artPiece?.exhibitions}
          />
          <ArtPieceAppraisal
            artpieceId={artPiece?._id}
            appraisals={artPiece?.appraisals}
          />
          <ArtPiecePublications
            artpieceId={artPiece?._id}
            publications={artPiece?.publications}
          />
          <ArtPieceLocation
            artpieceId={artPiece?._id}
            locations={artPiece?.locations}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
ArtPiece.requireAuth = true;
export default ProtectedPage(ArtPiece);
