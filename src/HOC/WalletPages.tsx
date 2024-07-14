import WalletLayout from "@/components/layout/WalletLayout";
import React from "react";

export default function WalletPages<P>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WalletPagesWrapper(props: P) {
    return (
      <WalletLayout>
        <WrappedComponent {...props} />
      </WalletLayout>
    );
  };
}
