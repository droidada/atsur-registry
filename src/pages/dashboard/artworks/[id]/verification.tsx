import { getToken } from "next-auth/jwt";
import { axiosAuth as axios } from "@/lib/axios";
import ProtectedPage from "@/HOC/Protected";
import MainVerification from "@/components/dashboard/artwork/Verification/MainVerification";
import VerificationAccepted from "@/components/dashboard/artwork/Verification/VerificationAccepted";
import VerificationRejected from "@/components/dashboard/artwork/Verification/VerificationRejected";
import VerificationPending from "@/components/dashboard/artwork/Verification/VerificationPending";
import VerificationDrafted from "@/components/dashboard/artwork/Verification/VerificationDrafted";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/verify-artpiece/saved/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return { props: { artPiece: res.data?.data } };
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

function Verification({ artPiece }) {
  console.log(artPiece);
  return (
    <>
      {artPiece?.status === "not-started" ? (
        <MainVerification artPiece={artPiece} />
      ) : artPiece?.status === "draft" ? (
        <MainVerification artPiece={artPiece} />
      ) : artPiece?.status === "verified" ? (
        <VerificationAccepted artPiece={artPiece} />
      ) : artPiece?.status === "pending" ? (
        <VerificationPending artPiece={artPiece} />
      ) : (
        <VerificationRejected artPiece={artPiece} />
      )}
    </>
  );
}

export default ProtectedPage(Verification);
