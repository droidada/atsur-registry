import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import { set } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import MemberOrgInvite from "./invitationType/MemberOrgInvite";
import CollaboratorInvite from "./invitationType/CollaboratorInvite";
import OrgInvite from "./invitationType/OrgInvite";
import ArpieceArtistInvite from "./invitationType/ArpieceArtistInvite";
import { useQuery } from "@tanstack/react-query";
import SignatureCanvas from "react-signature-canvas";

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

  const { data: currentUser } = useQuery({
    queryFn: () => axiosFetch.get("user/me"),
    refetchOnWindowFocus: false,
  });

  console.log(currentUser?.data);

  console.log(type);

  const toast = useToast();

  const handleAccept = async () => {
    try {
      setAcceptLoading(true);

      // If the user has not done their KYC don't allow them to verify
      if (
        currentUser?.data?.kycVerification?.verificationStatus !== "verified"
      ) {
        return toast.error(
          "You need to do your KYC verification before you can accept this",
        );
      }
      if (["art-piece-artist", "art-piece-collaborator"].includes(type)) {
        return setOpen(true);
      }
      if (type !== "org") {
        const { data } = await axiosFetch.post("/invite/accept", {
          token,
          userResponse: "accepted",
        });
        toast.success("Successfully accepted the invitation!");
        router.replace("/dashboard");
      } else {
        if (invitee?.org) {
          const { data } = await axiosFetch.post("/invite/accept", {
            token,
            userResponse: "accepted",
          });
          toast.success("Successfully accepted the invitation!");
          router.replace(`/dashboard/organizations/${invitee?.org}`);
        }
        router.replace(`/dashboard/organizations?create=true&token=${token}`);
      }
    } catch (error) {
      toast.error("Error accepting the invitation!");
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejectLoading(true);
      if (
        currentUser?.data?.kycVerification?.verificationStatus !== "verified"
      ) {
        return toast.error(
          "You need to do your KYC verification before you can reject this",
        );
      }
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
          kycVerificationStatus={
            currentUser?.data?.kycVerification?.verificationStatus
          }
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
          kycVerificationStatus={
            currentUser?.data?.kycVerification?.verificationStatus
          }
        />
      );
    case "org":
      return (
        <OrgInvite
          isAuthenticated={true}
          handleAccept={handleAccept}
          handleReject={handleReject}
          acceptLoading={acceptLoading}
          rejectLoading={rejectLoading}
          token={token as string}
          invitationData={invitationData}
        />
      );
    case "art-piece-artist":
      return (
        <ArpieceArtistInvite
          isAuthenticated={true}
          handleAccept={handleAccept}
          handleReject={handleReject}
          acceptLoading={acceptLoading}
          rejectLoading={rejectLoading}
          token={token as string}
          invitationData={invitationData}
          kycVerificationStatus={
            currentUser?.data?.kycVerification?.verificationStatus
          }
        />
      );
    default:
      return <></>;
  }
};

export default AuthenticatedScreen;

// interface ModalProps {
//   open: boolean;
//   onClose: () => void;
//   handleAccept: () => void;
// }

// const ArtistModal: React.FC<ModalProps> = ({ open, onClose, handleAccept }) => {
//   const canvasRef = useRef<any>(null);

//   const clearSignature = () => {
//     canvasRef.current.clear();
//   };

//   // const saveSignature = () => {
//   //   const signatureImage = canvasRef.current.toDataURL();
//   //   setSignatureImage(signatureImage);
//   //   handleClose();
//   // };
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Invitation Acceptance</DialogTitle>
//       <DialogContent dividers>
//         <SignatureCanvas
//           penColor="black"
//           ref={canvasRef}
//           canvasProps={{ className: "w-full h-[80px] bg-white" }}
//         />
//         <FormControlLabel
//           control={<Checkbox defaultChecked />}
//           labelPlacement="end"
//           label="Label"
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };
