import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";

const VerifyDocument = dynamic(
  () => import("@/components/smile-verification/verify-document"),
  { loading: () => <div>Loading...</div>, ssr: false },
);
const Index = () => {
  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
      <div className="row">
        <VerifyDocument />
      </div>
    </DashboardLayoutWithSidebar>
  );
};

export default Index;
