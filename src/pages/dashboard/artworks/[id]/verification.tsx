import Link from "next/link";
import Image from "@/components/common/image";
import { useEffect, useState } from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import { ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import { artRoles } from "@/types";
import {
  PhotoLibrary,
  Portrait,
  Domain,
  Palette,
  PhotoAlbum,
  PhotoSizeSelectActual,
} from "@mui/icons-material";
import ArtistInfo from "@/components/dashboard/art-verification/artist-info";
import DealerInfo from "@/components/dashboard/art-verification/dealer-info";
import CollectorInfo from "@/components/dashboard/art-verification/collector-info";
import InstitutionInfo from "@/components/dashboard/art-verification/institution-info";
import { useRouter } from "next/router";
import Preview from "@/components/dashboard/art-verification/preview";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import ProtectedPage from "@/HOC/Protected";
import ArtVerificationAquisition from "@/components/dashboard/artwork/Verification/Aquisition";
import ArtVerificationInformation from "@/components/dashboard/artwork/Verification/InformationAdd";

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

    console.log(res.data);

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

function Verification({ artPiece }) {
  const [steps, setSteps] = useState([
    "aquistion",
    "information add",
    "Preview",
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedInformationAdd, setSelectedInformationAdd] = useState<
    "artist" | "dealer" | "collector" | "institution"
  >("artist");
  const { id: artpieceId } = useRouter().query;

  const handleAddDealerStep = () => {
    setSteps(["aquistion", "information add", "Dealer Info", "Preview"]);
  };

  const handleRemoveDealerStep = () => {
    setSteps(["aquistion", "information add", "Preview"]);
  };

  return (
    <>
      <Stack spacing={4}>
        <h1 className="font-semibold text-2xl lg:text-[30px] lg:leading-[40px]">
          Art Verification
        </h1>
        <Stack direction={"row"} className="overflow-x-auto " spacing={2}>
          {steps.map((item, index) => (
            <div
              key={`active-bar-${item}`}
              className="flex-shrink-0 lg:flex-shrink flex flex-col max-w-[312px] w-full gap-2"
            >
              <span
                className={`text-[20px] capitalize leading-[20px] ${
                  activeIndex === index ? "font-bold" : ""
                }`}
              >
                {item}
              </span>
              <span
                className={`h-[7px] w-full rounded-[23px]  ${
                  activeIndex >= index
                    ? activeIndex == 2 && index == 2
                      ? "bg-[#00FF94]"
                      : "bg-primary"
                    : "bg-secondary"
                }`}
              />
            </div>
          ))}
        </Stack>

        <div>
          {
            [
              <ArtVerificationAquisition
                key={0}
                setActiveIndex={setActiveIndex}
                selectedInformationAdd={selectedInformationAdd}
                setSelectedInformationAdd={setSelectedInformationAdd}
              />,
              <ArtVerificationInformation
                key={1}
                setActiveIndex={setActiveIndex}
                defaultValues={{}}
                selectedInformationAdd={selectedInformationAdd}
                artpieceId={artpieceId as string}
                // setSelectedInformationAdd={setSelectedInformationAdd}
              />,
            ][activeIndex]
          }
        </div>
      </Stack>
      {/* <DashboardLayoutWithSidebar
        activePage={DashboardPages.ART}
        hideSidebar={true}
      >
        <div id="create">
          <div className="wrapper-content-create">
            <div className="heading-section">
              <h2 className="tf-title pb-30">Art Verification</h2>
            </div>
            <div className="widget-tabs relative">
              <ul className="widget-menu-tab">
                {allSteps.map((item, index) =>
                  item.component(
                    index + 1,
                    activeIndex,
                    checkVerificationStatus,
                  ),
                )}
              </ul>
              <div className="widget-content-tab">
                <div
                  className={`
                  items-center justify-center
                    ${activeIndex === 11 ? "active" : ""}
                  `}
                  style={{
                    display: `${activeIndex == 11 ? "" : "none"}`,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <h3 className="p-10">Acquisition</h3>
                  <p>How did you come about this piece?</p>
                  <ToggleButtonGroup
                    color="primary"
                    value={artRole}
                    exclusive
                    onChange={(e, v) => setArtRole(v)}
                    aria-label="Platform"
                    className="p-20 w-full"
                  >
                    <ToggleButton
                      value={artRoles.ARTIST}
                      sx={{
                        height: "25rem",
                        display: "block",
                        overflow: "hidden",
                      }}
                    >
                      <Palette
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Artist</p>
                    </ToggleButton>
                    <ToggleButton
                      value={artRoles.DEALER}
                      sx={{
                        height: "25rem",
                        display: "block",
                        overflow: "hidden",
                      }}
                    >
                      <PhotoAlbum
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Dealer</p>
                    </ToggleButton>
                    <ToggleButton
                      value={artRoles.COLLECTOR}
                      sx={{
                        height: "25rem",
                        display: "block",
                        overflow: "hidden",
                      }}
                    >
                      <PhotoLibrary
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Collector</p>
                    </ToggleButton>
                    <ToggleButton
                      value={artRoles.CUSTODIAN}
                      sx={{
                        height: "25rem",
                        display: "block",
                        overflow: "hidden",
                      }}
                    >
                      <Domain
                        sx={{
                          fill: "#3e7aa2",
                          width: "100%",
                          height: "90%",
                          mt: 0.375,
                        }}
                      />
                      <p>Institution</p>
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {artRole === artRoles.ARTIST ? (
                    <p>I created this art piece.</p>
                  ) : artRole === artRoles.DEALER ? (
                    <p>I am selling this piece on behalf of the Artist.</p>
                  ) : artRole === artRoles.COLLECTOR ? (
                    <p>I purchased this piece.</p>
                  ) : artRole === artRoles.CUSTODIAN ? (
                    <p>
                      I am holding this piece for exhibition or other purose{" "}
                    </p>
                  ) : (
                    <></>
                  )}
                  <div className="grid place-items-center">
                    <button
                      className="tf-button style-3"
                      onClick={() => handleOnClick(12)}
                      disabled={!artRole}
                      style={{
                        alignItems: "center",
                        textAlign: "center",
                        justifySelf: "center",
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div
                  className={`
                      items-center justify-center widget-content-inner upload
                      ${activeIndex === 12 ? "active" : ""}
                  `}
                  style={{ display: `${activeIndex == 12 ? "" : "none"}` }}
                >
                  {artRole === artRoles.ARTIST ? (
                    <ArtistInfo
                      setActiveIndex={setActiveIndex}
                      removeDealerFromSteps={removeDealerFromSteps}
                      addDealerToSteps={addDealerToSteps}
                      defaultValues={verificationData?.custodian?.artist}
                    />
                  ) : artRole === artRoles.DEALER ? (
                    <DealerInfo
                      defaultValues={verificationData?.custodian?.broker}
                      setActiveIndex={setActiveIndex}
                    />
                  ) : artRole === artRoles.COLLECTOR ? (
                    <CollectorInfo
                      defaultValues={verificationData?.acquisition}
                      setActiveIndex={setActiveIndex}
                    />
                  ) : artRole === artRoles.CUSTODIAN ? (
                    <InstitutionInfo
                      defaultValues={verificationData?.institution}
                      setActiveIndex={setActiveIndex}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {allSteps.length > 3 && (
                  <div
                    className={
                      allSteps.length > 3 && activeIndex === 13
                        ? "widget-content-inner submit active"
                        : "widget-content-inner submit"
                    }
                    style={{ display: `${activeIndex == 13 ? "" : "none"}` }}
                  >
                    <DealerInfo
                      defaultValues={verificationData?.custodian?.broker}
                      setActiveIndex={setActiveIndex}
                    />
                  </div>
                )}

                <div
                  className={
                    (allSteps.length === 4 && activeIndex === 14) ||
                    (allSteps.length === 3 && activeIndex === 13)
                      ? "widget-content-inner submit active"
                      : "widget-content-inner submit"
                  }
                  style={{
                    display: `${
                      (allSteps.length === 4 && activeIndex === 14) ||
                      (allSteps.length === 3 && activeIndex === 13)
                        ? ""
                        : "none"
                    }`,
                  }}
                >
                  <Preview activeIndex={activeIndex} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayoutWithSidebar> */}
    </>
  );
}

export default ProtectedPage(Verification);
