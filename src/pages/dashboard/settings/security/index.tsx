import React, { useState } from "react";
import SettingsPages from "@/HOC/SettingPages";
import { Avatar, Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { HiChevronRight } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/user/me`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });
    console.log(res.data);

    return { props: { user: res.data } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const SecurityPage = ({ user }) => {
  const { data } = useSession();
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const router = useRouter();

  console.log(user);

  return (
    <Stack spacing={2} className="divide-y-[1px] divide-secondary ">
      <h2 className="pb-3 text-[17px] leading-[16px] font-[600] b">Security</h2>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        className="p-4"
      >
        <div className="flex items-center gap-4">
          <Avatar
            //  @ts-ignore
            src={user?.avatar}
            //  @ts-ignore
            alt={user?.firstName}
            className="w-[96px] h-[96px]"
          />
          <h3 className="font-[600] text-[19px] leading-[16px]">
            {/* @ts-ignore */}
            {user?.firstName} {user?.lastName}
          </h3>
        </div>
      </Stack>
      <Stack className="py-4" spacing={4}>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-[400]" htmlFor="reset-password">
            Password
          </label>
          <div className="py-2 w-full border-[1px] border-primary px-4 flex items-center justify-between gap-5">
            <span>*******</span>
            <Button
              variant="contained"
              onClick={() => setOpenResetPasswordDialog(true)}
              className="bg-secondary text-primary font-[400] text-xs rounded-[22px]"
            >
              Change Password
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-[400]" htmlFor="reset-password">
            Linked Accounts
          </label>
          <div className="flex gap-4">
            <div className="h-[90px] max-w-[50%] w-full border-[1px] border-primary"></div>
            <div className="h-[90px] max-w-[50%] w-full border-[1px] border-primary"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-[400]" htmlFor="reset-password">
            KYC Verification Status
          </label>
          <div className="py-2 w-full border-[1px] border-primary px-4 flex items-center justify-between gap-5">
            <div className="flex gap-4 items-center">
              <span className="font-[500] capitalize text-[14px] leading-[16px]">
                {user?.kycVerification?.verificationStatus}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <Button
                variant="contained"
                onClick={() =>
                  router.push("/dashboard/settings/security/kyc-verification")
                }
                className="bg-secondary text-primary font-[400] text-xs rounded-[22px]"
              >
                {user?.kycVerification?.verificationStatus === "not-verified"
                  ? "Verify Now"
                  : user?.kycVerification?.verificationStatus === "approved"
                  ? "Continue"
                  : user?.kycVerification?.verificationStatus === "pending"
                  ? "Check"
                  : "Redo"}
              </Button>
              <BsChevronRight />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-[400]" htmlFor="reset-password">
            County
          </label>
          <div className="py-2 w-full border-[1px] border-primary px-4 flex items-center justify-between gap-5">
            <span className="font-[500] capitalize text-[14px] leading-[16px]">
              {user?.country?.name || "Not Set"}
            </span>
            <Button
              variant="contained"
              onClick={() => {}}
              className="bg-secondary text-primary font-[400] text-xs rounded-[22px]"
            >
              Change Country
            </Button>
          </div>
        </div>
      </Stack>
    </Stack>
  );
};

export default SettingsPages(SecurityPage);
