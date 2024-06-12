import ProtectedPage from "@/HOC/Protected";
import { Stack, Switch, Typography } from "@mui/material";
import React, { useState } from "react";

const views = ["All", "Invitations"];
const Notification = () => {
  const [currentView, setCurrentView] = useState(0);

  return (
    <Stack justifyContent={"space-between"} spacing={"35px"}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={4}
        alignItems="center"
      >
        <Typography
          variant="h1"
          className="font-[600] text-2xl lg:text-[40px] lg:leading-[40px]"
        >
          Notifications
        </Typography>
        <div className="flex gap-2 items-center divide-x-[1px] text-[16px] leading-[20px] h-fit  divide-primary">
          <span className="mr-2">Mark all as read</span>
          <div className="flex items-center pl-2 gap-2">
            <span>Only show unread</span>
            <Switch />
          </div>
        </div>
      </Stack>
      <Stack spacing={2}>
        <div className="flex gap-2 border-b-[1px]  h-fit ">
          {views.map((view, index) => (
            <div
              onClick={() => setCurrentView(index)}
              key={view}
              className="relative font-[300] cursor-pointer text-[16px] pb-2 leading-[20px]"
            >
              <span>{view}</span>
              {index == currentView && (
                <span className="absolute top-full left-0 h-[2px] w-full bg-primary" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <span className="text-[12px] cursor-pointer leading-[12px] font-[300]">
            Mark all as read
          </span>
        </div>
      </Stack>
    </Stack>
  );
};

export default ProtectedPage(Notification);
