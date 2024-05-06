import { Stack } from "@mui/material";
import React from "react";
import ArtistInformation from "./ArtistInformation";
import DealerInformation from "./DealerInformation";
import InstitutionInformation from "./InstitutionInformation";
import CollectorInformation from "./CollectorInformation";

interface Props {
  selectedInformationAdd: "artist" | "dealer" | "collector" | "institution";
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: any;
  artpieceId: string;
}
const ArtVerificationInformation: React.FC<Props> = ({
  setActiveIndex,
  selectedInformationAdd,
  defaultValues,
  artpieceId,
}) => {
  console.log("This is selectedInformationAdd", selectedInformationAdd);

  switch (selectedInformationAdd) {
    case "artist":
      return (
        <ArtistInformation
          artpieceId={artpieceId}
          setActiveIndex={setActiveIndex}
          defaultValues={defaultValues}
        />
      );
    case "dealer":
      return (
        <DealerInformation
          setActiveIndex={setActiveIndex}
          defaultValues={defaultValues}
        />
      );
    case "collector":
      return (
        <CollectorInformation
          setActiveIndex={setActiveIndex}
          defaultValues={defaultValues}
        />
      );
    case "institution":
      return (
        <InstitutionInformation
          setActiveIndex={setActiveIndex}
          defaultValues={defaultValues}
        />
      );
    default:
      return <></>;
  }
};

export default ArtVerificationInformation;
