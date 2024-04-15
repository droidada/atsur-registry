import axios from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import React from "react";
import dynamic from "next/dynamic";

import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import { useRouter } from "next/router";
export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("token here is ", token);
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
  return (
    <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
      <h1>KYC Verification Status</h1>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          Status: <h3 className=" font-bold">{status?.verificationStatus}</h3>
        </div>
        <div>
          {status.verificationStatus === "rejected" ? "Reason" : "Message"}:{" "}
          <h3 className=" font-bold">{status?.resultText}</h3>
        </div>
        {status.verificationStatus === "rejected" && (
          <button
            onClick={() => router.push("/dashboard/security/verify-document")}
          >
            Redo Verification
          </button>
        )}
      </div>
    </DashboardLayoutWithSidebar>
  );
};

export default Status;
