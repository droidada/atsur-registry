import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSettingLayout from "@/components/layout/DashboardLayout/DashboardSettingLayout";

function SettingPages<P>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithLayout(props: P) {
    return (
      <DashboardLayout>
        <DashboardSettingLayout>
          <WrappedComponent {...props} />
        </DashboardSettingLayout>
      </DashboardLayout>
    );
  };
}

export default SettingPages;
