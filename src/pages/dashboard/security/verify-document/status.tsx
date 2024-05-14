import axios from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import { useRouter } from "next/router";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { LoadingButton } from "@mui/lab";
export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return;

    const res = await axios.get(`/smile-verification/status`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { status: res.data?.kyc } };
  } catch (error) {
    throw new Error(error);
  }
};
const Status = ({ status }) => {
  console.log(status);
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [loading, setLoading] = useState(false);

  const handleReenroll = async () => {
    try {
      setLoading(true);
      const { data } = await axiosAuth.post("/smile-verification/re-enrol");
      router.push("/dashboard/security/verify-document");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
      <h1>KYC Verification Status</h1>
      <div className="container mx-auto grid gap-4 mt-6 px-4 sm:px-6 lg:px-8">
        <div>
          Status: <h4 className=" font-bold">{status?.verificationStatus}</h4>
        </div>
        <div>
          {status.verificationStatus === "rejected" ? "Reason" : "Message"}:{" "}
          <h4 className=" font-bold">{status?.resultText}</h4>
        </div>
        {status.verificationStatus !== "verified" && (
          <LoadingButton
            loading={loading}
            className="style-1"
            onClick={handleReenroll}
          >
            Redo Verification
          </LoadingButton>
        )}
      </div>
    </DashboardLayoutWithSidebar>
  );
};

export default Status;
