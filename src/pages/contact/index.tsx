import UnprotectedPage from "@/HOC/Unprotected";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen bg-secondary w-[50%]"></div>
    </div>
  );
};

export default UnprotectedPage(ContactPage);
