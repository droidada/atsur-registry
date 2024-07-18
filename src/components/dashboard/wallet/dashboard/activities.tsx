import { Button, Stack } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  activities: any[];
}
const WalletActivitiesSection: React.FC<Props> = ({ activities }) => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Stack spacing={4}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <h2 className="text-2xl font-bold">Wallet Activities</h2>
        <div className="flex gap-4">
          {["Inflow", "Outflow"].map((tab, index) => (
            <Button
              key={index}
              onClick={() => setCurrentTab(index)}
              variant="text"
              className={`${
                currentTab === index ? "font-bold" : "font-normal"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </Stack>

      <Stack spacing={2}>
        {activities.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-5">
            <Image
              src={"/images/empty-wallet.svg"}
              width={150}
              height={150}
              alt="empty"
            />
            <p className="italic font-[300] text-center">
              Your Wallet is empty
            </p>
          </div>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default WalletActivitiesSection;
