import React from "react";
import { Tooltip } from "react-tooltip";

interface Props {
  children?: React.ReactNode;
  place?: "top" | "bottom" | "left" | "right";
  id?: string;
  content?: string;
}

const CustomTooltip: React.FC<Props> = ({ children, place, content, id }) => {
  return (
    <Tooltip content={content} id={id} place={place}>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
