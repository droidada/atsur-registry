import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

function ProtectedPage<P>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithLayout(props: P) {
    return (
      <DashboardLayout>
        <WrappedComponent {...props} />
      </DashboardLayout>
    );
  };
}

export default ProtectedPage;
