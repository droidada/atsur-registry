import React, { useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";

interface Props {
  publications: any[];
}
const ArtPiecePublications: React.FC<Props> = ({ publications }) => {
  const [open, setOpen] = useState(false);
  return (
    <ArtDetailsAccordionContainer onClick={() => {}} title={"Publications"}>
      <></>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPiecePublications;
