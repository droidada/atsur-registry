import { Stack } from "@mui/material";
import React from "react";
import ArtistInformation from "./ArtistInformation";
import DealerInformation from "./DealerInformation";
import InstitutionInformation from "./InstitutionInformation";
import CollectorInformation from "./CollectorInformation";

interface Props {
  selectedInformationAdd: "artist" | "dealer" | "collector" | "institution";
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  artPiece: any;
  artpieceId: string;
}
const ArtVerificationInformation: React.FC<Props> = ({
  setActiveIndex,
  selectedInformationAdd,
  artPiece,
  artpieceId,
}) => {
  console.log("-----------This is the based -------------", artPiece);

  switch (selectedInformationAdd) {
    case "artist":
      return (
        <ArtistInformation
          artpieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={artPiece?.custodian}
        />
      );
    case "dealer":
      return (
        <DealerInformation setActiveIndex={setActiveIndex} defaultValues={{}} />
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
