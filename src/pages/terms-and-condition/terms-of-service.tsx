import UnprotectedPage from "@/HOC/Unprotected";
import DataPrivacyPolicy from "@/components/term_and_condition/DataPrivacy";
import TermsOfService from "@/components/term_and_condition/TermsOfService";
import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="page-container">
      <TermsOfService />
    </div>
  );
};

export default UnprotectedPage(TermsOfServicePage);
