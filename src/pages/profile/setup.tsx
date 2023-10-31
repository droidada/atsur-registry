import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Grid,
  Typography,
  Paper,
  CssBaseline,
  Link,
  Avatar,
} from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import SignUpFlow from "@/components/signup/signup-flow";
import { useRouter } from "next/router";

const steps = ["Personal Information", "Company Information", "Invites"];

function ProfileSetUp() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      !completed[prevActiveStep - 1] ? prevActiveStep - 1 : prevActiveStep,
    );
  };

  const handleStep = (step: number) => () => {
    if (!completed[step]) setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    if (completedSteps() === totalSteps()) router.replace("/dashboard");
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function Copyright(props: any) {
    return (
      <Box variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Box>
    );
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 15,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Setup Your Profile
          </Typography>
          <Stepper sx={{ mt: 5 }} nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <>
                <Typography sx={{ mt: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                <Typography sx={{ mb: 1, py: 1 }}>
                  <SignUpFlow
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    setCompleted={setCompleted}
                  />
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0 || completed[activeStep - 1]}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </>
            )}
          </div>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Grid>
    </Grid>
  );
}

export default ProfileSetUp;
