import React from "react";
import SettingsPages from "@/HOC/SettingPages";
import { Stack } from "@mui/material";

const Billing = () => {
  return (
    <Stack spacing={2} className="divide-y-[1px] divide-secondary ">
      <h2 className=" text-[17px] leading-[16px] font-[600] b">
        Payment Method
      </h2>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
        className="p-2"
      >
        <div className="flex gap-4 items-center">
          <div className="w-[92px] h-[91px] bg-secondary "></div>
          <div className="flex flex-col"></div>
        </div>
      </Stack>
    </Stack>
  );
};

export default SettingsPages(Billing);
