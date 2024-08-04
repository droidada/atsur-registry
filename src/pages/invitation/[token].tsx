import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import AuthenticatedScreen from "@/components/invitation/AuthenticatedScreen";
import NotAuthScreen from "@/components/invitation/NotAuthScreen";
import UnprotectedPage from "@/HOC/Unprotected";

export const getServerSideProps = async ({ req, query, params }) => {
  try {
    const { token: verificationToken } = params;
    const res = await axios.get(`/invite/fetch/${verificationToken}`);
    return { props: { invitationData: res.data?.data } };
  } catch (error) {
    console.error(error?.response?.data?.message || error?.message);
    throw new Error(error);
  }
};

const Invitation = ({ invitationData }) => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const isInvitee =
    invitationData?.invitation.invitee?.email === sessionData?.user?.email;

  const { data: verification, error } = useQuery({
    queryKey: ["verification"],
    queryFn: () =>
      axios.get(
        `/verify-artpiece/${invitationData?.invitation?.object?.artPiece?.verification}`,
      ),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      const { type, invitee } = invitationData?.invitation;

      if (type === "org") {
        const isOrgCreator =
          invitee?.org?.creator?.email === sessionData?.user?.email;
        if (!isOrgCreator && !isInvitee) {
          signOut();
        }
      } else if (!isInvitee) {
        signOut();
      }
    }
  }, [isAuthenticated, invitationData, sessionData]);

  const authScreenProps = {
    type: invitationData?.invitation?.type,
    invitee: invitationData?.invitation?.invitee,
    invitationData,
    verificationData: verification?.data?.data,
  };

  const notAuthScreenProps = {
    token: invitationData?.invitation?.token,
    type: invitationData?.invitation?.type,
    inviter: invitationData?.invitation?.inviter,
    userIsRegistered: invitationData?.userIsRegistered,
    invitationData,
    verificationData: verification?.data?.data,
  };

  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedScreen {...authScreenProps} />
      ) : (
        <NotAuthScreen {...notAuthScreenProps} />
      )}
    </>
  );
};

export default UnprotectedPage(Invitation);
