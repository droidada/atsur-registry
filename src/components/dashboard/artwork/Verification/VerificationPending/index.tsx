import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GrCheckmark } from "react-icons/gr";

interface Props {
  artPiece: any;
}
const VerificationPending: React.FC<Props> = ({ artPiece }) => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Personal KYC",
      link: `/dashboard/settings/security/kyc-verification`,
      description: `Your arpiece cannot be verified unless you do your KYC verifcation.
        Please click the button below to complete the verification`,
    },
    {
      title: "Business KYC",
      link: `/dashboard/settings/security/kyb-verification/${
        artPiece.custodian?.broker?.organization?._id ||
        artPiece?.institution?.myOrganization?._id ||
        artPiece?.acquisition?.organization?._id
      }`,
      description: `Your arpiece cannot be verified unless you do your Business verifcation.
        Please click the button below to complete the verification`,
    },
    {
      title: "Physical Verification",
      link: `/dashboard/settings/security/kyc-verification`,
      description: `Someone from our team will reachout to you to carryout the physical verification`,
    },
    {
      title: "Complete",
      link: `/dashboard/settings/security/kyc-verification`,
      description: ``,
    },
  ];

  useEffect(() => {
    if (
      artPiece?.artPiece?.custodian?.profile?.kycVerification
        ?.verificationStatus !== "verified"
    ) {
      setCurrentStep(0);
    } else if (
      (artPiece?.artPiece?.custodian?.profile?.kycVerification
        ?.verificationStatus == "verified" &&
        (artPiece.custodian?.broker?.organization?.kybVerification?.status !==
          "verified" ||
          artPiece?.institution?.myOrganization?.status !== "verified")) ||
      artPiece?.acquisition?.organization?.kybVerification?.status !==
        "verified"
    ) {
      setCurrentStep(1);
    }
  }, [artPiece]);

  console.log(artPiece);

  return (
    <div className="flex lg:flex-nowrap justify-center  items-center mt-6 flex-wrap md:gap-8">
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
      {/* <div className="flex items-center  gap-8"> */}
      <div className="flex max-w-[266px] w-full  flex-col gap-4">
        <h2 className="text-3xl text-[#4C4C4C] md:text-[57px] font-bold">
          Pending
        </h2>
        <p className="w-full   text-justify text-[17px] leading-[20px] font-[300]">
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
      <div className=" flex flex-col  ">
        {steps.map((step, index) => (
          <div key={step?.title} className={`flex items-center gap-8 `}>
            <div className="relative flex items-center justify-center">
              <span
                className={`w-[35px] h-[35px] absolute left-[50%] translate-x-[-50%] rounded-full ${
                  step.title === steps[currentStep].title
                    ? "bg-white border-primary-green border-[1px]"
                    : currentStep > index
                    ? "bg-primary-green"
                    : "bg-secondary-white"
                }   flex items-center justify-center`}
              >
                {currentStep > index ? <GrCheckmark /> : index + 1}
              </span>
              <span className="h-[80px] w-[1px] bg-primary  "></span>
            </div>
            {step.link ? (
              <Link href={step.link}>{step?.title}</Link>
            ) : (
              <span>{step?.title}</span>
            )}
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default VerificationPending;
