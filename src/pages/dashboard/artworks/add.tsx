import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepButton,
  Paper,
  CssBaseline,
  Link,
  Avatar,
} from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import WidgetSummary from "@/components/nav/widget-summary";
import NewsUpdate from "@/components/nav/news-updates";
import DashboardLayout from "@/components/dashboard-layout";
import { ArtistCard } from "@/components/artist-card";

const steps = ["Personal Information", "Company Information", "Invites"];

function AddArtwork() {
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
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <Grid
        container
        spacing={2}
        columnSpacing={3}
        rowSpacing={3}
        xs={12}
        sm={8}
        md={12}
        px={10}
      >
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
                  {/* <SignUpFlow
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    setCompleted={setCompleted}
                  /> */}
                  <h2>Metadata info here </h2>
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
      </Grid>
    </DashboardLayout>
  );
}

export default AddArtwork;