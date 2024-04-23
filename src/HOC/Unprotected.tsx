import LandingPageLayout from "@/components/layout/LandingPage";
import React from "react";

function UnprotectedPage<P>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithLayout(props: P) {
    return (
      <LandingPageLayout>
        <WrappedComponent {...props} />
      </LandingPageLayout>
    );
  };
}
export default UnprotectedPage;
