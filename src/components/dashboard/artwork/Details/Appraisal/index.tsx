import React, { useState } from "react";
import ArtDetailsAccordionContainer from "../ArtDetailsAccordionContainer";

interface Props {
  appraisals: any[];
}
const ArtPieceAppraisal: React.FC<Props> = ({ appraisals }) => {
  const [open, setOpen] = useState(false);
  return (
    <ArtDetailsAccordionContainer onClick={() => {}} title={"Appraisals"}>
      <></>
    </ArtDetailsAccordionContainer>
  );
};

export default ArtPieceAppraisal;
