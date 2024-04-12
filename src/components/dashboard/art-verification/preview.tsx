import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Link from "next/link";
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
            <StepLabel className="capitalize ">
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontSize: "2rem" }}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography sx={{ fontSize: "1.5rem" }} variant="h4">
                {step.description}
              </Typography>
              {index === 1 && (
                <Box>
                  <Typography>
                    While waiting for approval process, please make sure
                    you&apos;ve verified the following:
                  </Typography>
                  <List>
                    <ListItem
                      // @ts-ignore
                      component={Link}
                      underline="none"
                      href="/dashboard/security/verify-document"
                    >
                      <ListItemText>KYC Verification</ListItemText>
                    </ListItem>
                  </List>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Preview;
