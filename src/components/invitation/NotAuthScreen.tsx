import { useRouter } from "next/router";
import React from "react";
import { Avatar, Stack } from "@mui/material";
import Image from "next/image";
import LoadingButton from "../Form/LoadingButton";
import MemberOrgInvite from "./invitationType/MemberOrgInvite";
import CollaboratorInvite from "./invitationType/CollaboratorInvite";
import OrgInvite from "./invitationType/OrgInvite";
import ArpieceArtistInvite from "./invitationType/ArpieceArtistInvite";
interface Props {
  userIsRegistered: boolean;
  type: string;
  inviter: { firstName: string; lastName: string };
  token: string;
  invitationData: any;
  verificationData?: any;
}
const NotAuthScreen = ({
  userIsRegistered,
  type,
  inviter,
  token,
  invitationData,
  verificationData,
}: Props) => {
  const router = useRouter();
  console.log(userIsRegistered);

  switch (type) {
    case "art-piece-collaborator":
      return (
        <CollaboratorInvite
          isAuthenticated={false}
          userIsRegistered={userIsRegistered}
          token={token}
          invitationData={invitationData}
          verificationData={verificationData}
        />
      );
    case "member-org":
      return (
        <MemberOrgInvite
          isAuthenticated={false}
          userIsRegistered={userIsRegistered}
          token={token}
          invitationData={invitationData}
        />
      );
    case "org":
      return (
        <OrgInvite
          isAuthenticated={false}
          userIsRegistered={userIsRegistered}
          token={token}
          invitationData={invitationData}
        />
      );
    case "art-piece-artist":
      return (
        <ArpieceArtistInvite
          isAuthenticated={false}
          userIsRegistered={userIsRegistered}
          token={token}
          invitationData={invitationData}
        />
      );
    default:
      return <>Hello</>;
  }
};

export default NotAuthScreen;
