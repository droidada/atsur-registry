import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GrCheckmark } from "react-icons/gr";
import { useMutation } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  artPiece: any;
}

interface Step {
  title: string;
  link: string;
  description: string;
  noButton?: boolean;
}

const VerificationPending: React.FC<Props> = ({ artPiece }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const axiosAuth = useAxiosAuth();
  const toast = useToast();

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: (id: string) => axiosAuth.post(`/invite/resend/${id}`),
    onSuccess: () => {
      toast.success("Invitation resent successfully");
      handleClose();
    },
    onError: (error) => {
      toast.error("Failed to resend invitation");
    },
  });

  const handleResendInvite = (collaborator: any) => {
    mutate(collaborator);
    // setAnchorEl(null)

    // handleClose();
  };

  const verificationType = artPiece?.custodian?.institution?.acquisition?.type
    ? "institution"
    : artPiece?.custodian?.collector?.acquisition?.type
    ? "collector"
    : artPiece?.custodian?.broker?.collaborators?.length > 0
    ? "broker"
    : artPiece?.custodian?.artist?.brokerInfo?.collaborators?.length > 0
    ? "artist-broker"
    : null;

  const role = artPiece?.custodian.role;

  const collaborators =
    artPiece?.custodian?.artist?.brokerInfo?.collaborators.length > 0
      ? artPiece?.custodian?.artist?.brokerInfo?.collaborators
      : artPiece?.custodian?.broker?.collaborators || [];

  const checkStatus = ["institution", "collector"].includes(verificationType)
    ? !artPiece?.custodian?.collector?.artist?.invitation?.invitationAccepted
    : false;

  const getOrganizationId = () =>
    artPiece.custodian?.broker?.organization?._id ||
    artPiece?.custodian?.institution?.organization?._id ||
    artPiece?.custodian?.collector?.organization?._id;

  const steps: Step[] = [
    {
      title: "Personal KYC",
      link: `/dashboard/settings/security/kyc-verification`,
      description:
        "Your art piece cannot be verified unless you complete your KYC verification. Please click the button below to complete the verification.",
    },
    ...(verificationType
      ? [
          {
            title: "Artist Invitation Status",
            link: "#",
            noButton: true,
            description: ["institution", "collector"].includes(verificationType)
              ? `${
                  artPiece?.custodian?.collector?.artist?.artistInfo
                    ?.firstName || ""
                } ${
                  artPiece?.custodian?.collector?.artist?.artistInfo
                    ?.lastName || ""
                } has ${
                  !artPiece?.custodian?.collector?.artist?.invitation
                    ?.invitationAccepted
                    ? "not"
                    : ""
                } accepted your invite`
              : "",
          },
          {
            title: "Business KYC",
            link: `/dashboard/settings/security/kyb-verification/${getOrganizationId()}`,
            description:
              "Your art piece cannot be verified unless you complete your Business verification. Please click the button below to complete the verification.",
          },
        ]
      : []),

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

  useEffect(() => {
    const kycStatus =
      artPiece?.artPiece?.custodian?.profile?.kycVerification
        ?.verificationStatus;
    const kybStatus =
      artPiece.custodian?.broker?.organization?.kybVerification?.status ||
      artPiece?.custodian?.institution?.organization?.status ||
      artPiece?.custodian?.collector?.organization?.kybVerification?.status;

    if (kycStatus == "approved") {
      setCurrentStep(1);
    }
    if (verificationType && collaborators.length > 0) {
      console.log(collaborators);
      const allCollaboratorsAccepted = collaborators.every(
        (collab) => collab.invitation?.status === "accepted",
      );

      if (!allCollaboratorsAccepted) {
        setCurrentStep(1);
      } else {
        setCurrentStep(2);
      }
    }
    if (verificationType && kybStatus === "approved") {
      setCurrentStep(3);
    }
  }, [artPiece, verificationType, collaborators]);

  const getStepStyle = (index: number) => {
    if (index === currentStep)
      return "bg-white border-primary-green border-[1px]";
    if (currentStep > index) return "bg-primary-green";
    return "bg-secondary-white";
  };

  return (
    <div className="flex lg:flex-nowrap justify-center items-center mt-6 gap-5 flex-wrap-reverse md:gap-8">
      <div
        style={{ aspectRatio: "1/1" }}
        className="relative md:w-[230px] w-[250px] bg-secondary rounded-full overflow-hidden"
      >
        <Image
          src={artPiece?.artPiece?.assets[0]?.url}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="flex max-w-[266px] w-full flex-col gap-4">
        <h2 className="text-3xl text-center lg:text-left text-[#4C4C4C] md:text-[57px] font-bold">
          Pending
        </h2>
        {verificationType && collaborators.length > 0 && currentStep === 1 ? (
          <div className="w-full overflow-x-auto flex-col flex gap-4 mt-4">
            <table className="border-collapse w-full">
              <thead>
                <tr className="text-xs p-2 border-[.5px]">
                  <th className="px-[4px]">Username</th>
                  <th className="px-[4px]">Accepted</th>

                  <th className="px-[4px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {collaborators.map((collaborator, index) => (
                  <tr
                    className="text-sm border-[.5px]"
                    key={`collaborator_${index}`}
                  >
                    <td className="text-center">
                      {collaborator?.userInfo?.firstName}{" "}
                      {collaborator?.userInfo?.lastName[0]}.
                    </td>
                    <td className="text-center">
                      {collaborator?.invitation?.status == "accepted"
                        ? "Yes"
                        : collaborator?.invitation?.status !== "accepted"
                        ? "No"
                        : "Not Yet"}
                    </td>

                    <td className="text-center">
                      <IconButton aria-label="more" onClick={handleMoreClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() =>
                            handleResendInvite(collaborator?.invitation?._id)
                          }
                        >
                          {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                          ) : (
                            ""
                          )}{" "}
                          Resend Invite
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm">
              All members must accept the invite before you can move to the next
              step
            </p>
          </div>
        ) : (
          <p className="w-full text-justify text-[17px] leading-[20px] font-[300]">
            {steps[currentStep]?.description}
          </p>
        )}
        {!steps[currentStep]?.noButton && (
          <Button
            onClick={() => router.push(steps[currentStep]?.link)}
            variant="contained"
            className="w-full bg-primary"
          >
            Verify Now
          </Button>
        )}
      </div>

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-8">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-[35px] h-[35px] absolute left-[50%] translate-x-[-50%] rounded-full ${getStepStyle(
                  index,
                )} flex items-center justify-center`}
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
};

export default VerificationPending;
