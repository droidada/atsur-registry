import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArtVerificationAquisition from "../Aquisition";
import ArtVerificationInformation from "../InformationAdd";
import ArtVerificationPreview from "../Preview";

interface Props {
  artPiece: any;
}
function MainVerification({ artPiece }: Props) {
  console.log(artPiece);
  const [steps, setSteps] = useState([
    "aquistion",
    "information add",
    "Preview",
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedInformationAdd, setSelectedInformationAdd] = useState<
    "artist" | "broker" | "collector" | "institution"
  >("artist");
  const { id: artpieceId } = useRouter().query;

  const handleAddDealerStep = () => {
    setSteps(["aquistion", "information add", "Broker Info", "Preview"]);
  };

  const handleRemoveDealerStep = () => {
    setSteps(["aquistion", "information add", "Preview"]);
  };

  useEffect(() => {
    if (artPiece?.acquisition) {
      setSelectedInformationAdd("collector");
    } else if (artPiece?.custodian?.broker) {
      setSelectedInformationAdd("broker");
    } else if (artPiece?.institution) {
      setSelectedInformationAdd("institution");
    } else {
      setSelectedInformationAdd("artist");
    }
    if (
      artPiece?.acquisition ||
      artPiece?.custodian ||
      artPiece?.institution ||
      artPiece?.dealer
    ) {
      setActiveIndex(2);
    } else {
      setActiveIndex(0);
    }
  }, [artPiece]);

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
                {item === "information add" ? selectedInformationAdd : item}
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
                artPiece={artPiece}
                selectedInformationAdd={selectedInformationAdd}
                artpieceId={artpieceId as string}
                handleAddDealerStep={handleAddDealerStep}
                handleRemoveDealerStep={handleRemoveDealerStep}
                // setSelectedInformationAdd={setSelectedInformationAdd}
              />,
              <ArtVerificationPreview
                key={2}
                setActiveIndex={setActiveIndex}
                defaultValues={{}}
                selectedInformationAdd={selectedInformationAdd}
                artpieceId={artpieceId as string}
              />,
            ][activeIndex]
          }
        </div>
      </Stack>
    </>
  );
}
export default MainVerification;
