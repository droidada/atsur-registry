import LoadingButton from "@/components/Form/LoadingButton";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  userIsRegistered?: boolean;
  token: string;
  invitationData: any;
  isAuthenticated: boolean;
  handleAccept?: () => void;
  handleReject?: () => void;
  acceptLoading?: boolean;
  rejectLoading?: boolean;
}

const CollaboratorInvite: React.FC<Props> = ({
  userIsRegistered,
  token,
  invitationData,
  isAuthenticated,
  handleAccept,
  handleReject,
  acceptLoading,
  rejectLoading,
}) => {
  const router = useRouter();

  console.log(invitationData?.artPiece);
  return (
    <div className="flex flex-col gap-4 divide-y-[1px] divide-primary ">
      <div className="flex justify-between pb-4 gap-5">
        <div className="flex flex-col gap-6">
          <h1 className="font-[600] text-[50px] leading-[60px]">Invitations</h1>
          <div className="md:px-3 flex gap-4">
            <Avatar
              className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[154px] lg:h-[154px] "
              alt={invitationData?.invitation?.inviter?.firstName}
              src={invitationData?.invitation?.inviter?.avatar}
            />
            <div className="max-w-[414px] w-full flex flex-col gap-4">
              <h2 className="font-[500] text-lg  lg:text-2xl">
                {invitationData?.invitation?.inviter?.firstName}{" "}
                {invitationData?.invitation?.inviter?.lastName} has invited you
              </h2>
              <p className="">
                You have been invited to be a collaborator of
                <span className="font-[600]">
                  {" "}
                  {invitationData?.artPiece?.title}
                </span>{" "}
                Artpiece
              </p>
            </div>
          </div>
        </div>
        <div className="w-[240px] h-[300px] relative">
          <Image
            src={
              invitationData?.artPiece?.assets &&
              invitationData?.artPiece?.assets[0]?.url
            }
            fill
            alt={invitationData?.artPiece?.title}
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-5 flex items-center justify-between gap-5">
        <div className="flex-col flex justify-between gap-4">
          <h3 className="font-[600] text-[25px] ">Description</h3>

          <p className="max-w-[512px] text-xs w-full">
            {invitationData?.artPiece?.description}
          </p>
        </div>
        <div className=" ">
          {isAuthenticated ? (
            <div className="flex gap-4">
              <LoadingButton
                loading={acceptLoading}
                onClick={handleAccept}
                variant="contained"
                className=" text-[15px] leading-[16px] font-[600] h-[46px] bg-primary "
              >
                Accept
              </LoadingButton>
              <LoadingButton
                onClick={handleReject}
                loading={rejectLoading}
                variant="outlined"
                className=" text-[15px] leading-[16px] font-[600] h-[46px]  "
              >
                Reject
              </LoadingButton>
            </div>
          ) : (
            <LoadingButton
              variant="contained"
              className=" text-[15px] leading-[16px] font-[600] h-[46px] bg-primary "
              loading={false}
              onClick={() => {
                if (userIsRegistered) {
                  router.push(`/login?token=${token}`);
                } else {
                  router.push(`/signup?token=${token}`);
                }
              }}
            >
              {!userIsRegistered
                ? "Register to take action"
                : "Login to take action"}
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorInvite;