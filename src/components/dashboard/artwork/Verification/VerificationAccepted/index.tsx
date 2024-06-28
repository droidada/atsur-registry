import ArtPieceCertificate from "@/components/Certificate";
import verification from "@/pages/dashboard/artworks/[id]/verification";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import VerificationConfirmSteps from "./Steps";

interface Props {
  artPiece: any;
}
const VerificationAccepted: React.FC<Props> = ({ artPiece }) => {
  return <VerificationConfirmSteps artPiece={artPiece} />;
};

export default VerificationAccepted;
