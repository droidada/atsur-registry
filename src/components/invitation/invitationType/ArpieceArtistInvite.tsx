import LoadingButton from "@/components/Form/LoadingButton";
import { SignatureDialog } from "@/components/dashboard/artwork/Verification/VerificationAccepted/Steps/sign-certificate";
import { useToast } from "@/providers/ToastProvider";
import { InviteTypeProps } from "@/types/models/invitationType";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props extends InviteTypeProps {
  signatureImage?: string;
  setSignatureImage?: React.Dispatch<React.SetStateAction<string>>;
}

const ArpieceArtistInvite: React.FC<Props> = ({
  userIsRegistered,
  token,
  invitationData,
  isAuthenticated,
  handleAccept,
  handleReject,
  acceptLoading,
  rejectLoading,
  kycVerificationStatus,
  signatureImage,
  setSignatureImage,
}) => {
  const router = useRouter();
  const toast = useToast();

  const [openSignature, setOpenSignature] = useState(false);
  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(false);
  const [termAndConditionError, setTermsAndConditionError] = useState(false);
  const { status } = useSession();

  const handleAcceptArtpiece = () => {
    if (!acceptTermsAndCondition) {
      setTermsAndConditionError(true);
      return;
    }
    if (!signatureImage) {
      toast.error("Please sign your signature");
      return;
    }

    handleAccept();
  };

  return (
    <div className="flex flex-col gap-4 divide-y-[1px] divide-primary ">
      <div className="flex justify-between flex-wrap pb-4 gap-5">
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
                You have been invited as the Artist of
                <span className="font-[600]">
                  {" "}
                  {invitationData?.artPiece?.title}
                </span>{" "}
                Artpiece
              </p>
            </div>
          </div>
        </div>
        <div className="w-[240px] h-[300px] bg-secondary-white relative">
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
      <div className="py-5 flex flex-col flex-wrap  items-center gap-5">
        <div className="flex flex-col flex-wrap items-center max-w-[550px] gap-7 w-full ">
          <div className="flex-col flex justify-between gap-4">
            <h3 className="font-[600] text-[25px] ">Description</h3>

            <p className="max-w-[512px] text-xs w-full">
              {invitationData?.artPiece?.description}
            </p>
          </div>
          {status === "authenticated" && (
            <div className="flex flex-col items-center gap-4">
              <div
                onClick={() => setOpenSignature(true)}
                className="max-w-[250px]  w-full h-[100px] grid place-items-center relative"
              >
                {signatureImage && <Image fill src={signatureImage} alt="" />}
                <div
                  className={`bg-black/50 text-sm absolute backdrop-blur-sm w-full h-full flex justify-center items-center hover:bg-black/20 cursor-pointer text-center`}
                >
                  <span>Click to sign your signature</span>
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <input
                    onChange={(e) =>
                      setAcceptTermsAndCondition(e.target.checked)
                    }
                    onBlur={(e) => setTermsAndConditionError(false)}
                    checked={acceptTermsAndCondition}
                    type="checkbox"
                    id="confirm"
                    className="focus:ring-0"
                  />
                  <label className="text-sm" htmlFor="confirm">
                    By signing this, I agree with the{" "}
                    <Link href={"#"} className="underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
                {termAndConditionError && (
                  <p className="text-red-500 text-xs">This field is required</p>
                )}
              </div>
            </div>
          )}
          <div className=" ">
            {isAuthenticated ? (
              <div className="flex gap-4">
                <LoadingButton
                  loading={acceptLoading}
                  onClick={handleAcceptArtpiece}
                  variant="contained"
                  className=" text-[15px] leading-[16px] font-[600] h-[46px] px-4 bg-primary "
                >
                  Accept
                </LoadingButton>
                <LoadingButton
                  onClick={handleReject}
                  loading={rejectLoading}
                  variant="outlined"
                  className=" text-[15px] leading-[16px] font-[600] h-[46px] px-4  "
                >
                  Reject
                </LoadingButton>
              </div>
            ) : (
              <LoadingButton
                variant="contained"
                className=" text-[15px] leading-[16px] font-[600] h-[46px] px-4 bg-primary "
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
      <SignatureDialog
        open={openSignature}
        handleClose={() => setOpenSignature(false)}
        setSignatureImage={setSignatureImage}
      />
    </div>
  );
};

export default ArpieceArtistInvite;
