import React, { useState } from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
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
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import { GiAlarmClock } from "react-icons/gi";
import moment from "moment";
import { MdOutlineExpandMore } from "react-icons/md";
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
const AdminArtPieceDetails = ({ artPiece }) => {
  const [currentAsset, setCurrentAsset] = useState(0);
  console.log("artPiece", artPiece);
  return (
    <AdminDashboardLayout>
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
                <span>Added on</span>
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
          </Stack>
        </Stack>
      </Stack>
    </AdminDashboardLayout>
  );
};

export default AdminArtPieceDetails;
