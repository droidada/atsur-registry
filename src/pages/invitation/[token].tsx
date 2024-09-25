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
  const { token: verificationToken } = params;
  try {
    console.log(verificationToken);

    const res = await axios.get(`/invite/fetch/${verificationToken}`);
    return { props: { invitationData: res.data?.data } };
  } catch (error) {
    console.error(error?.response?.data?.message || error?.message);
    return {
      props: {
        invitationData: null,
        error: error?.response?.data?.message || error?.message,
        verificationToken,
      },
    };
  }
};

const Invitation = ({ invitationData, error, verificationToken }) => {
  const { status, data: sessionData } = useSession();
  const router = useRouter();

  console.log("This is the verification token", verificationToken);

  console.log("This is the invitation data", invitationData);

  const isAuthenticated = status === "authenticated";
  const isInvitee =
    invitationData?.invitation.invitee?.user?.email ===
    sessionData?.user?.email;

  const { data: verification, error: verificationError } = useQuery({
    queryKey: ["verification"],
    queryFn: () =>
      axios.get(
        `/verify-artpiece/${invitationData?.invitation?.object?.artPiece?.verification}`,
      ),
    refetchOnWindowFocus: false,
  });

  console.log("This is the error", error);

  useEffect(() => {
    if (isAuthenticated && invitationData && invitationData.invitation) {
      const { type, invitee } = invitationData.invitation;
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

  if (error) {
    return (
      <div className="page-container min-h-[450px] py-10">
        <div className="max-w-[1200px] p-4 rounded w-full mx-auto shadow-md border">
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>Invitation is invalid. It's probably expired.</p>
          </div>
        </div>
      </div>
    );
  }

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
