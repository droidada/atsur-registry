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
    // throw new Error(error);
    return {
      props: { invitationData: null },
    };
  }
};

const Invitation = ({ invitationData }) => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();

  console.log(invitationData);

  const isAuthenticated = status === "authenticated";
  const isInvitee =
    invitationData?.invitation.invitee?.user?.email ===
    sessionData?.user?.email;

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
        console.log("logout ");
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
    <div className="page-container min-h-screen py-10">
      <div className="max-w-[1200px] p-4 rounded w-full mx-auto shadow-md border">
        {isAuthenticated ? (
          <AuthenticatedScreen {...authScreenProps} />
        ) : (
          <NotAuthScreen {...notAuthScreenProps} />
        )}
      </div>
    </div>
  );
};

export default UnprotectedPage(Invitation);
