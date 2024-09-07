import { axiosAuth as axios } from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import useAxiosAuth from "@/hooks/useAxiosAuth";

import ProtectedPage from "@/HOC/Protected";
import Image from "next/image";
import { Button } from "@mui/material";
import LoadingButton from "@/components/Form/LoadingButton";
export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return;

    const res = await axios.get(
      `/smile-verification/status?type=kyb&organizationId=${query.orgId}`,
      {
        headers: { authorization: `Bearer ${token?.accessToken}` },
      },
    );

    return { props: { status: res.data?.data } };
  } catch (error) {
    throw new Error(error);
  }
};
const Status = ({ status }) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  const orgId = router.query.orgId;

  console.log(status);

  const handleReenroll = async () => {
    router.replace("/dashboard/settings/security/kyb-verification/" + orgId);
  };

  return (
    // <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-semibold">KYC Verification Status</h1>
      <Image
        src={
          status?.status == "accepted"
            ? "/images/verification-success.png"
            : status?.status === "pending"
            ? "/images/verification-pending.png"
            : "/images/verification-rejected.png"
        }
        width={204}
        height={202}
        alt="verification status"
      />
      <h2 className="font-[500] text-2xl text-center">
        {status?.status === "accepted"
          ? "Great! Your credentials have been successfully verified"
          : status?.status === "pending"
          ? "Great! Your credentials are being processed for verification"
          : "Sorry! Your verification has been rejected"}
      </h2>
      <p className="text-center text-xs max-w-[594px] w-full">
        {status?.status === "accepted"
          ? "We are pleased to inform you that your Organization verification has been successfully completed. You can now continue using our system without any interruptions."
          : status?.status === "pending"
          ? `We wanted to inform you that your Organization verification is currently pending as our team is in the process of reviewing your submitted credentials.
Please rest assured that we are working diligently to complete the verification as soon as possible`
          : status?.resultText}
      </p>
      <div className="mt-5 flex gap-4">
        <Button
          variant="contained"
          className="bg-primary px-4 h-[46px] font-semibold text-white"
          onClick={() => router.push("/explore")}
        >
          Explore Artworks
        </Button>
        {status?.status !== "accepted" && (
          <LoadingButton
            loading={loading}
            variant="outlined"
            className="px-4 h-[46px]  font-semibold "
            onClick={handleReenroll}
          >
            Reapply
          </LoadingButton>
        )}
      </div>
      {/* <div className="container mx-auto grid gap-4 mt-6 px-4 sm:px-6 lg:px-8">
        <div>
          Status: <h4 className=" font-bold">{status?.verificationStatus}</h4>
        </div>
        <div>
          {status.status=== "rejected" ? "Reason" : "Message"}:{" "}
          <h4 className=" font-bold">{status?.resultText}</h4>
        </div>
        {status.status!== "verified" && (
          <LoadingButton
            loading={loading}
            className="style-1"
            onClick={handleReenroll}
          >
            Redo Verification
          </LoadingButton>
        )}
      </div> */}
    </div>
    // </DashboardLayoutWithSidebar>
  );
};

export default ProtectedPage(Status);
