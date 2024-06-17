import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { set } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MemberOrgInvite from "./invitationType/MemberOrgInvite";
import CollaboratorInvite from "./invitationType/CollaboratorInvite";

interface Props {
  type: string;

  invitee: any;
  invitationData: any;
}
const AuthenticatedScreen = ({ type, invitee, invitationData }: Props) => {
  const [open, setOpen] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const axiosFetch = useAxiosAuth();
  const router = useRouter();
  const { token } = router.query;

  const toast = useToast();

  const handleAccept = async () => {
    try {
      setAcceptLoading(true);
      if (type !== "org") {
        const { data } = await axiosFetch.post("/invite/accept", {
          token,
          userResponse: "accepted",
        });
        toast.success("Successfully accepted the invitation!");
        router.push("/dashboard");
      } else {
        if (invitee?.org) {
          const { data } = await axiosFetch.post("/invite/accept", {
            token,
            userResponse: "accepted",
          });
          toast.success("Successfully accepted the invitation!");
          router.push(`/dashboard/organizations/${invitee?.org}`);
        }
        router.push(`/dashboard/organizations/create?token=${token}`);
      }
    } catch (error) {
      toast.error("Error accepting the invitation!");
      console.log(error);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejectLoading(true);
      const { data } = await axiosFetch.post("/invite/accept", {
        token,
        userResponse: "rejected",
      });
      toast.success("Successfully rejected the invitation!");
      // router.push("/dashboard");
    } catch (error) {
      toast.error("Error accepting the invitation!");
      console.log(error);
    } finally {
      setRejectLoading(false);
    }
  };

  switch (type) {
    case "art-piece-collaborator":
      return (
        <CollaboratorInvite
          isAuthenticated={true}
          handleAccept={handleAccept}
          handleReject={handleReject}
          acceptLoading={acceptLoading}
          rejectLoading={rejectLoading}
          token={token as string}
          invitationData={invitationData}
        />
      );
    case "member-org":
      return (
        <MemberOrgInvite
          isAuthenticated={true}
          handleAccept={handleAccept}
          handleReject={handleReject}
          acceptLoading={acceptLoading}
          rejectLoading={rejectLoading}
          token={token as string}
          invitationData={invitationData}
        />
      );
    default:
      return <></>;
  }
};

export default AuthenticatedScreen;
