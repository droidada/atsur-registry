import axios from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import useAxiosAuth from "@/hooks/useAxiosAuth";

import ProtectedPage from "@/HOC/Protected";
import Image from "next/image";
import { Button } from "@mui/material";
import LoadingButton from "@/components/Form/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return;

    const res = await axios.get(`/smile-verification/status?type=kyc`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { status: res.data?.data } };
  } catch (error) {
    throw new Error(error);
  }
};
const Status = ({ status }) => {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const toast = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => axiosAuth.post("/smile-verification/re-enrol"),
    onSuccess: () =>
      router.push(`/dashboard/settings/security/kyc-verification`),
    onError: (error: any) => {
      toast.error(
        error.response.data.message || error.message || "Something went wrong",
      );
    },
  });

  const handleReenroll = async () => {
    mutate();
  };

  return (
    // <DashboardLayoutWithSidebar activePage={DashboardPages.SECURITY}>
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-semibold">KYC Verification Status</h1>
      <Image
        src={
          status?.verificationStatus == "accepted"
            ? "/images/verification-success.png"
            : status?.verificationStatus === "pending"
            ? "/images/verification-pending.png"
            : "/images/verification-rejected.png"
        }
        width={204}
        height={202}
        alt="verification status"
      />
      <h2 className="font-[500] text-2xl text-center">
        {status?.verificationStatus === "accepted"
          ? "Great! Your credentials have been successfully verified"
          : status?.verificationStatus === "pending"
          ? "Great! Your credentials are being processed for verification"
          : "Sorry! Your verification has been rejected"}
      </h2>
      <p className="text-center text-xs max-w-[594px] w-full">
        {status?.verificationStatus === "accepted"
          ? "We are pleased to inform you that your Know Your Customer (KYC) verification has been successfully completed. You can now continue using our system without any interruptions."
          : status?.verificationStatus === "pending"
          ? `We wanted to inform you that your Know Your Customer (KYC) verification is currently pending as our team is in the process of reviewing your submitted credentials.
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
        {status?.verificationStatus !== "accepted" && (
          <LoadingButton
            loading={isLoading}
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
      </div> */}
    </div>
    // </DashboardLayoutWithSidebar>
  );
};

export default ProtectedPage(Status);
