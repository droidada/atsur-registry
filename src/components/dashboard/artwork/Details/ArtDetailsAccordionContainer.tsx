import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";

interface Props {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
}

const ArtDetailsAccordionContainer: React.FC<Props> = ({
  title,
  children,
  onClick,
}) => {
  return (
    <Accordion className=" bg-secondary-white px-4 divide-secondary  divide-y-[1px]">
      <AccordionSummary
        className=" border-b-[1px] border-primary   text-[20px] font-[600] leading-[16px] text-primary "
        expandIcon={<AiOutlineDown className="text-primary" />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails className="text-sm py-4">
        {children}
        <Button
          onClick={onClick}
          className="w-[94px] font-[600]  h-[39px] bg-primary text-[15px] leading-[16px] text-white"
        >
          Add
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default ArtDetailsAccordionContainer;
