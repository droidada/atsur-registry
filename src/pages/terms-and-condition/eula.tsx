import UnprotectedPage from "@/HOC/Unprotected";
import EULA from "@/components/term_and_condition/EULA";
import React from "react";

const EULA_Agreement = () => {
  return (
    <div className="page-container ">
      <EULA />
    </div>
  );
};

export default UnprotectedPage(EULA_Agreement);
