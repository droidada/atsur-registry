import { Stack } from "@mui/material";
import React from "react";
import ArtistInformation from "./ArtistInformation";
import DealerInformation from "./DealerInformation";
import InstitutionInformation from "./InstitutionInformation";
import CollectorInformation from "./CollectorInformation";

interface Props {
  selectedInformationAdd: "artist" | "broker" | "collector" | "institution";
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  artPiece: any;
  artpieceId: string;
  handleAddDealerStep: () => void;
  handleRemoveDealerStep: () => void;
}
const ArtVerificationInformation: React.FC<Props> = ({
  setActiveIndex,
  selectedInformationAdd,
  artPiece,
  artpieceId,
  handleAddDealerStep,
  handleRemoveDealerStep,
}) => {
  switch (selectedInformationAdd) {
    case "artist":
      return (
        <ArtistInformation
          handleAddDealerStep={handleAddDealerStep}
          handleRemoveDealerStep={handleRemoveDealerStep}
          artpieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={artPiece?.custodian}
        />
      );
    case "broker":
      return (
        <DealerInformation
          artPieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={{}}
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
