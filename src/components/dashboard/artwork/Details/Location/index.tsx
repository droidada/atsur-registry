import React, { useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";

interface Props {
  locations: any[];
}
const ArtPieceLocation: React.FC<Props> = ({ locations }) => {
  const [open, setOpen] = useState(false);
  return (
    <ArtDetailsAccordionContainer onClick={() => {}} title={"Locations"}>
      <></>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPieceLocation;
