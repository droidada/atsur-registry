import React, { useEffect } from "react";
import ArtistInformation from "./ArtistInformation";
import DealerInformation from "./DealerInformation";
import InstitutionInformation from "./InstitutionInformation";
import CollectorInformation from "./CollectorInformation";

interface Props {
  selectedInformationAdd: "artist" | "broker" | "collector" | "institution";
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex?: number;
  position?: number;
  artPiece: any;
  artpieceId: string;
  isArtistBroker: boolean;
  setIsArtistBroker: (arg: boolean) => void;

  setSelectedInformationAdd: (
    arg: "artist" | "broker" | "collector" | "institution",
  ) => void;
  handleAddDealerStep: () => void;
  handleRemoveDealerStep: () => void;
  isArtistBroker: boolean;
}
const ArtVerificationInformation: React.FC<Props> = ({
  setActiveIndex,
  activeIndex = 1,
  position,
  selectedInformationAdd,
  artPiece,
  artpieceId,
  isArtistBroker,
  setSelectedInformationAdd,
  setIsArtistBroker,
  handleAddDealerStep,
  handleRemoveDealerStep,
}) => {
  console.log("artPiece:", artPiece);

  useEffect(() => {
    console.log("key here is ", position);
    if (activeIndex === 2 && position === 2) {
      setIsArtistBroker(true);
      setSelectedInformationAdd("broker");
    }
  }, [activeIndex, position, setIsArtistBroker]);

  console.log(artPiece);

  switch (selectedInformationAdd) {
    case "artist":
      return (
        <ArtistInformation
          handleAddDealerStep={handleAddDealerStep}
          handleRemoveDealerStep={handleRemoveDealerStep}
          setIsArtistBroker={setIsArtistBroker}
          artpieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={artPiece?.custodian}
        />
      );
    case "broker":
      return (
        <DealerInformation
          isArtistBroker={isArtistBroker}
          artPieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={artPiece?.custodian?.broker}
        />
      );
    case "collector":
      return (
        <CollectorInformation
          artpieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={artPiece?.acquisition}
        />
      );
    case "institution":
      return (
        <InstitutionInformation
          artpieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={artPiece?.institution}
        />
      );
    default:
      return <></>;
  }
};

export default ArtVerificationInformation;
