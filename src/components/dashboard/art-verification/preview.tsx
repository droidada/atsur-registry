import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const steps = [
  {
    label: "draft",
    description: "Started verification process but not completed yet",
  },
  {
    label: "pending",
    description: "Awaiting approval",
  },
  {
    label: "verified",
    description: "Verified and approved",
  },
  //   {
  //     label: "in-dispute",
  //     description: "Verification in dispute",
  //   },
];
const Preview = ({ activeIndex }) => {
  const [currentVerificationStatus, setCurrentVerificationStatus] =
    useState("draft");
  const [activeStep, setActiveStep] = React.useState(
    steps.findIndex((step) => step.label === currentVerificationStatus),
  );
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const artPieceId = router.query.id;

  console.log(activeStep);

  const fetchStatus = async () => {
    try {
      const { data: resp } = await axiosAuth.get(
        `/verify-artpiece/status/${artPieceId}`,
      );

      setCurrentVerificationStatus(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [activeIndex]);

  useEffect(() => {
    const step = steps.findIndex(
      (step) => step.label === currentVerificationStatus,
    );
    setActiveStep(step);
  }, [currentVerificationStatus]);

  console.log(
    steps.findIndex((step) => step.label === currentVerificationStatus),
  );
  console.log(currentVerificationStatus);
  return (
    <Box sx={{ maxWidth: "500px", margin: "auto", mt: "5rem" }}>
      <Stepper orientation="vertical" activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
              className="capitalize "
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Preview;
