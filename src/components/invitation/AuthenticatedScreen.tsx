import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import MemberOrgInvite from "./invitationType/MemberOrgInvite";
import CollaboratorInvite from "./invitationType/CollaboratorInvite";
import OrgInvite from "./invitationType/OrgInvite";
import ArpieceArtistInvite from "./invitationType/ArpieceArtistInvite";
import InvalidToken from "./invitationType/InvalidToken";

interface Props {
  type: string;
  verificationData?: any;
  invitee: any;
  invitationData: any;
}

const AuthenticatedScreen = ({
  type,
  invitee,
  invitationData,
  verificationData,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [signatureImage, setSignatureImage] = useState("");

  const axiosFetch = useAxiosAuth();
  const router = useRouter();
  const { token } = router.query;
  const toast = useToast();

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => axiosFetch.get("user/me"),
    refetchOnWindowFocus: false,
  });

  const handleAccept = async () => {
    setAcceptLoading(true);

    try {
      if (!invitationData?.invitation?.object?.artPiece?.isAdminCreated) {
        if (
          type === "art-piece-artist" &&
          currentUser?.data?.user?.kycVerification?.verificationStatus !==
            "verified"
        ) {
          toast.error(
            "You need to do your KYC verification before you can accept this",
          );
          return;
        }
      }

      const inviteUrl =
        type === "org" && invitationData?.invitation?.object?.org
          ? `/dashboard/organizations/${invitationData.invitation.object.org._id}`
          : "/dashboard";

      const formData = new FormData();
      formData.append("token", token as string);
      formData.append("userResponse", "accepted");

      formData.append("signature", signatureImage);

      const { data } = await axiosFetch.post("/invite/accept", formData);

      // toast.success("Successfully accepted the invitation!");
      router.replace(inviteUrl);
    } catch (error) {
      toast.error("Error accepting the invitation!");
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);
    try {
      if (!invitationData?.invitation?.object?.artPiece?.isAdminCreated) {
        if (
          currentUser?.data?.kycVerification?.verificationStatus !== "verified"
        ) {
          toast.error(
            "You need to do your KYC verification before you can reject this",
          );
          return;
        }
      }

      const { data } = await axiosFetch.post("/invite/accept", {
        token,
        userResponse: "rejected",
      });

      // toast.success("Successfully rejected the invitation!");
    } catch (error) {
      toast.error("Error rejecting the invitation!");
    } finally {
      setRejectLoading(false);
    }
  };

  const commonProps = {
    isAuthenticated: true,
    handleAccept,
    handleReject,
    acceptLoading,
    rejectLoading,
    token: token as string,
    invitationData,
    kycVerificationStatus:
      currentUser?.data?.kycVerification?.verificationStatus,
    signatureImage,
    setSignatureImage,
    verificationData,
  };

  switch (type) {
    case "art-piece-collaborator":
      return <CollaboratorInvite {...commonProps} />;
    case "member-org":
      return <MemberOrgInvite {...commonProps} />;
    case "org":
      return <OrgInvite {...commonProps} />;
    case "art-piece-artist":
      return <ArpieceArtistInvite {...commonProps} />;
    default:
      return <InvalidToken />;
  }
};

export default AuthenticatedScreen;
