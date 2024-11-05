import { ReactNode, useEffect, useState } from "react";
import { TourProvider, useTour } from "@reactour/tour";
import { useRouter } from "next/router";
import { pageTours } from "@/lib/helpers/driverObj";

interface TourWrapperProps {
  children: ReactNode;
}

const TourWrapper = ({ children }: TourWrapperProps) => {
  const router = useRouter();

  // Set up default tour state

  const { setIsOpen, setCurrentStep, steps, setSteps, currentStep } = useTour();

  useEffect(() => {
    console.log("Tour wrapper");
    const currentTour = pageTours[router.pathname];
    if (currentTour) {
      console.log("helloo", currentStep);
      setSteps(currentTour);
      // Small delay to ensure the DOM elements are mounted
      setTimeout(() => {
        console.log("hello");
        setIsOpen(true);
        setCurrentStep(0);
      }, 500);
    } else {
      setIsOpen(false);
    }
  }, [router.pathname]);

  return (
    <TourProvider
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    >
      {children}
    </TourProvider>
  );
};

export default TourWrapper;
