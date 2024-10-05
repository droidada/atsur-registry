import UnprotectedPage from "@/HOC/Unprotected";
import DataPrivacyPolicy from "@/components/term_and_condition/DataPrivacy";
import React from "react";

const DataPrivacy = () => {
  return (
    <div className="page-container">
      <DataPrivacyPolicy />
    </div>
  );
};

export default UnprotectedPage(DataPrivacy);
