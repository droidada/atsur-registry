import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GrCheckmark } from "react-icons/gr";

interface Props {
  artPiece: any;
}

interface Step {
  title: string;
  link: string;
  description: string;
}

const VerificationPending: React.FC<Props> = ({ artPiece }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const verificationType = artPiece?.custodian?.institution?.acquisition?.type
    ? "institution"
    : artPiece?.custodian?.collector?.acquisition?.type
    ? "collector"
    : artPiece?.custodian?.broker?.collaborators?.length > 0
    ? "broker"
    : null;

  const checkStatus = ["institution", "collector"].includes(verificationType)
    ? !artPiece?.custodian?.collector?.artist?.invitation?.invitationAccepted ||
      !artPiece?.custodian?.collector?.artist?.invitation?.invitationAccepted
    : false;

  const steps: Step[] = verificationType
    ? [
        {
          title: "Personal KYC",
          link: `/dashboard/settings/security/kyc-verification`,
          description:
            "Your artpiece cannot be verified unless you complete your KYC verification. Please click the button below to complete the verification.",
        },
        {
          title: "Artist Invitation Status",
          link: "#",
          description: `${
            ["institution", "collector"].includes(verificationType)
              ? `${
                  artPiece?.custodian?.collector?.artist?.artistInfo
                    ?.firstName ||
                  artPiece?.custodian?.collector?.artist?.artistInfo?.firstName
                } ${
                  artPiece?.custodian?.collector?.artist?.artistInfo
                    ?.lastName ||
                  artPiece?.custodian?.collector?.artist?.artistInfo?.lastName
                } has ${
                  !artPiece?.custodian?.collector?.artist?.invitation
                    ?.invitationAccepted ||
                  !artPiece?.custodian?.collector?.artist?.invitation
                    ?.invitationAccepted
                    ? "not"
                    : ""
                } accepted your invite`
              : ``
          }`,
        },
        {
          title: "Business KYC",
          link: `/dashboard/settings/security/kyb-verification/${getOrganizationId()}`,
          description:
            "Your artpiece cannot be verified unless you complete your Business verification. Please click the button below to complete the verification.",
        },
        {
          title: "Physical Verification",
          link: `/dashboard/settings/security/kyc-verification`,
          description:
            "Someone from our team will reach out to you to carry out the physical verification.",
        },
        {
          title: "Complete",
          link: `/dashboard/settings/security/kyc-verification`,
          description: "",
        },
      ]
    : [
        {
          title: "Personal KYC",
          link: `/dashboard/settings/security/kyc-verification`,
          description:
            "Your artpiece cannot be verified unless you complete your KYC verification. Please click the button below to complete the verification.",
        },
        {
          title: "Business KYC",
          link: `/dashboard/settings/security/kyb-verification/${getOrganizationId()}`,
          description:
            "Your artpiece cannot be verified unless you complete your Business verification. Please click the button below to complete the verification.",
        },
        {
          title: "Physical Verification",
          link: `/dashboard/settings/security/kyc-verification`,
          description:
            "Someone from our team will reach out to you to carry out the physical verification.",
        },
        {
          title: "Complete",
          link: `/dashboard/settings/security/kyc-verification`,
          description: "",
        },
      ];

  function getOrganizationId() {
    return (
      artPiece.custodian?.broker?.organization?._id ||
      artPiece?.custodian?.institution?.custodianOrganization?._id ||
      artPiece?.custodian.collector?.custodianOrganization?._id
    );
  }

  useEffect(() => {
    const kycStatus =
      artPiece?.artPiece?.custodian?.profile?.kycVerification
        ?.verificationStatus;
    const kybStatus =
      artPiece.custodian?.broker?.organization?.kybVerification?.status ||
      artPiece?.custodian?.institution?.custodianOrganization?.status ||
      artPiece?.custodian?.collector?.custodianOrganization?.kybVerification
        ?.status;
    if (kycStatus !== "verified") {
      setCurrentStep(0);
    } else if (kycStatus === "verified" && kybStatus !== "verified") {
      setCurrentStep(1);
    } else if (kycStatus === "verified" && kybStatus === "verified") {
      setCurrentStep(2);
    }
  }, [artPiece]);

  return (
    <div className="flex lg:flex-nowrap justify-center items-center mt-6 flex-wrap md:gap-8">
      <div
        style={{ aspectRatio: "1/1" }}
        className="relative md:w-[330px] w-[250px] bg-secondary rounded-full overflow-hidden"
      >
        <Image
          src={artPiece?.artPiece?.assets[0]?.url}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="flex max-w-[266px] w-full flex-col gap-4">
        <h2 className="text-3xl text-[#4C4C4C] md:text-[57px] font-bold">
          Pending
        </h2>
        <p className="w-full text-justify text-[17px] leading-[20px] font-[300]">
          {steps[currentStep]?.description}
        </p>
        <Button
          onClick={() => router.push(steps[currentStep]?.link)}
          variant="contained"
          className="w-full bg-primary"
        >
          Verify Now
        </Button>
      </div>

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-8">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-[35px] h-[35px] absolute left-[50%] translate-x-[-50%] rounded-full
                ${getStepStyle(index)} flex items-center justify-center`}
              >
                {currentStep > index ? <GrCheckmark size={20} /> : index + 1}
              </span>
              <span className="h-[80px] w-[1px] bg-primary"></span>
            </div>
            {step.link ? (
              <Link href={step.link}>{step.title}</Link>
            ) : (
              <span>{step.title}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  function getStepStyle(index: number) {
    if (index === currentStep)
      return "bg-white border-primary-green border-[1px]";
    if (currentStep > index) return "bg-primary-green";
    return "bg-secondary-white";
  }
};

export default VerificationPending;
