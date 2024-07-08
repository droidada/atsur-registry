import { useEffect, useState } from "react";
import ProtectedPage from "@/HOC/Protected";

const steps = ["Metadata", "Assets", "Series", "Artists", "Agreements"];

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
    <></>
    // <DashboardLayout>
    //   <Grid
    //     container
    //     spacing={2}
    //     columnSpacing={3}
    //     rowSpacing={3}
    //     xs={12}
    //     sm={8}
    //     md={12}
    //     px={10}
    //   >
    //     <Box
    //       sx={{

    //         mx: 4,
    //         display: "flex",
    //         flexDirection: "column",

    //       }}
    //     >
    //       <Typography component="h1" variant="h5">
    //         Add Artwork
    //       </Typography>
    //       <p>Add an artwork to your organization</p>
    //       <Stepper sx={{ mt: 5 }} nonLinear activeStep={activeStep}>
    //         {steps.map((label, index) => (
    //           <Step key={label} completed={completed[index]}>
    //             <StepButton color="inherit" onClick={handleStep(index)}>
    //               {label}
    //             </StepButton>
    //           </Step>
    //         ))}
    //       </Stepper>
    //       <div>
    //         {allStepsCompleted() ? (
    //           <>
    //             <Typography sx={{ mt: 1 }}>
    //               All steps completed - you&apos;re finished
    //             </Typography>
    //             <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
    //               <Box sx={{ flex: "1 1 auto" }} />
    //               <Button onClick={handleReset}>Reset</Button>
    //             </Box>
    //           </>
    //         ) : (
    //           <>
    //             <div style={{ padding: "0, 1px" }}>
    //               <AddArtworkFlow
    //                 activeStep={activeStep}
    //                 setActiveStep={setActiveStep}
    //                 setCompleted={setCompleted}
    //               />
    //             </div>
    //             <Box
    //               sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 4 }}
    //             >
    //               <Button
    //                 color="inherit"
    //                 disabled={activeStep === 0 || completed[activeStep - 1]}
    //                 onClick={handleBack}
    //                 sx={{ mr: 1 }}
    //               >
    //                 Back
    //               </Button>
    //               <Box sx={{ flex: "1 1 auto" }} />
    //               <Button onClick={handleNext} sx={{ mr: 1 }}>
    //                 Next
    //               </Button>
    //               {activeStep !== steps.length &&
    //                 (completed[activeStep] ? (
    //                   <Typography
    //                     variant="caption"
    //                     sx={{ display: "inline-block" }}
    //                   >
    //                     Step {activeStep + 1} already completed
    //                   </Typography>
    //                 ) : (
    //                   <Button onClick={handleComplete}>
    //                     {completedSteps() === totalSteps() - 1
    //                       ? "Finish"
    //                       : "Complete Step"}
    //                   </Button>
    //                 ))}
    //             </Box>
    //           </>
    //         )}
    //       </div>
    //     </Box>
    //   </Grid>
    // </DashboardLayout>
  );
}

export default ProtectedPage(AddArtwork);
