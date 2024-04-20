import React, { useEffect } from "react";
import Layout from "@/open9/layout/Layout";
import { useSession } from "next-auth/react";
import AuthenticatedScreen from "@/components/invitation/AuthenticatedScreen";
import NotAuthScreen from "@/components/invitation/NotAuthScreen";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";

export const getServerSideProps = async ({ req, query, params }) => {
  try {
    const { token: verificationToken } = params;

    const res = await axios.post(`/invite/fetch`, { token: verificationToken });

    console.log(res.data);

    return { props: { invitationData: res.data?.data } };
  } catch (error) {
    console.log(error?.response.data?.message || error?.message);
    throw new Error(error);
  }
};

const Invitation = ({ invitationData }) => {
  console.log(invitationData);
  const { status, data } = useSession();
  const check =
    status === "authenticated" &&
    invitationData?.invitee?.email === data?.user.email;
  const router = useRouter();

  useEffect(() => {
    if (
      status == "authenticated" &&
      invitationData?.invitation?.invitee?.email !== data?.user.email
    ) {
      signOut();
    }
  }, [status]);

  return (
    <Layout headerStyle={2} footerStyle={1} currentMenuItem={"Invitation"}>
      {status == "authenticated" ? (
        <AuthenticatedScreen
          type={invitationData?.invitation?.type}
          inviter={invitationData?.invitation?.inviter}
          data={invitationData?.artPiece || invitationData?.org}
          objectType={invitationData?.invitation?.object}
        />
      ) : (
        <NotAuthScreen
          token={invitationData?.invitation?.token}
          type={invitationData?.invitation?.type}
          inviter={invitationData?.invitation?.inviter}
          userIsRegistered={invitationData?.userIsRegistered}
        />
      )}
    </Layout>
  );
};

export default Invitation;
