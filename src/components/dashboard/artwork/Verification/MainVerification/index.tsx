import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ArtVerificationAcquisition from "../Acquisition";
import ArtVerificationInformation from "../InformationAdd";
import ArtVerificationPreview from "../Preview";
import { artRoles } from "@/types/index";

interface Props {
  artPiece: any;
}

function MainVerification({ artPiece }: Props) {
  const [steps, setSteps] = useState(["acquisition", "information", "Preview"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isArtistBroker, setIsArtistBroker] = useState(false);
  const [selectedInformationAdd, setSelectedInformationAdd] = useState<
    "artist" | "broker" | "collector" | "institution"
  >("artist");
  const { id: artpieceId } = useRouter().query;

  const getInitialActiveIndex = (role: string) => {
    if (role) {
      return 1;
    } else {
      return 0;
    }
  };

  const handleAddDealerStep = useCallback(() => {
    setSteps(["acquisition", "information", "Broker Information", "Preview"]);
  }, []);

  const handleRemoveDealerStep = useCallback(() => {
    setSteps(["acquisition", "information", "Preview"]);
  }, []);

  const isArtistBrokerType = useMemo(
    () =>
      artPiece?.custodian?.role === artRoles.ARTIST &&
      artPiece?.custodian?.artist?.sellerType === "broker",
    [artPiece?.custodian?.role, artPiece?.custodian?.artist?.sellerType],
  );

  console.log(artPiece);

  useEffect(() => {
    if (!isArtistBroker) {
      handleRemoveDealerStep();
    }
  }, [isArtistBroker, handleRemoveDealerStep]);

  useEffect(() => {
    artPiece?.custodian?.role ??
      setSelectedInformationAdd(artPiece?.custodian?.role);
    setActiveIndex(getInitialActiveIndex(artPiece?.custodian?.role));

    if (isArtistBrokerType) {
      // handleAddDealerStep();
    }
  }, [isArtistBrokerType]);

  return (
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
              {item === "information"
                ? `${
                    isArtistBroker ? "artist" : selectedInformationAdd
                  } Information`
                : item}
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
            <ArtVerificationAcquisition
              key={0}
              setActiveIndex={setActiveIndex}
              isArtistBroker={isArtistBroker}
              setIsArtistBroker={setIsArtistBroker}
              selectedInformationAdd={selectedInformationAdd}
              setSelectedInformationAdd={setSelectedInformationAdd}
            />,
            <ArtVerificationInformation
              key={1}
              position={1}
              isArtistBroker={isArtistBroker}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              artPiece={artPiece}
              setSelectedInformationAdd={setSelectedInformationAdd}
              selectedInformationAdd={selectedInformationAdd}
              setIsArtistBroker={setIsArtistBroker}
              artpieceId={artpieceId as string}
              handleAddDealerStep={handleAddDealerStep}
              handleRemoveDealerStep={handleRemoveDealerStep}
            />,
            isArtistBroker && (
              <ArtVerificationInformation
                isArtistBroker={isArtistBroker}
                key={2}
                position={2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                artPiece={artPiece}
                setSelectedInformationAdd={setSelectedInformationAdd}
                selectedInformationAdd={selectedInformationAdd}
                setIsArtistBroker={setIsArtistBroker}
                artpieceId={artpieceId as string}
                handleAddDealerStep={handleAddDealerStep}
                handleRemoveDealerStep={handleRemoveDealerStep}
              />
            ),
            <ArtVerificationPreview
              key={isArtistBroker ? 3 : 2}
              setActiveIndex={setActiveIndex}
              defaultValues={{}}
              selectedInformationAdd={selectedInformationAdd}
              artpieceId={artpieceId as string}
            />,
          ][activeIndex]
        }
      </div>
    </Stack>
  );
}

export default MainVerification;
