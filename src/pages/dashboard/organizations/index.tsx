import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/image";
import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import OrgCard from "@/components/common/OrgCard";
import ProtectedPage from "@/HOC/Protected";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import HeroHeader from "@/components/dashboard/HeroHeader";
import FilterLine from "@/components/dashboard/FilterLine";
import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";

import MyOrganization from "@/components/dashboard/organization/MyOrganization";
import InvitedOrganization from "@/components/dashboard/organization/InvitedOrganization";
import CreateOrganizationDialog from "@/components/dashboard/organization/CreateOrganizationDialog";

function Organizations() {
  const [currentTab, setCurrentTab] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <Stack spacing={2}>
      <SearchBar />
      <HeroHeader
        type="organizations"
        handleCreate={() => setOpenCreateDialog(true)}
        handleExplore={() => {}}
      />
      <div className="flex gap-4 border-b-[2px] mt-7 mb-4 w-full">
        {["My Organizations", "Invited Orgainization"].map((item, index) => (
          <div
            key={item}
            onClick={() => setCurrentTab(index)}
            className="relative texxt-[19px] cursor-pointer  leading-[19px] pb-3"
          >
            {item}
            {index === currentTab && (
              <span
                className={`absolute -bottom-1  left-0 w-full h-[5px] bg-primary`}
              />
            )}
          </div>
        ))}
      </div>
      {/* <FilterLine view={view} setView={setView} title="My Organizations" /> */}
      <div className="mt-4">
        {
          [
            <MyOrganization key={`MyOrganization`} />,
            <InvitedOrganization key={`OrgCard`} />,
          ][currentTab]
        }
        {/* {view == "grid" ? (
          <OrganizationGridView
            organizations={organizations}
            isFetching={isFetching}
            isError={isError}
            baseUrl="/dashboard/organizations"
          />
        ) : (
          <OrganizationListView
            isFetching={isFetching}
            isError={isError}
            organizations={organizations}
            baseUrl="/dashboard/organizations"
          />
        )} */}
      </div>
      <CreateOrganizationDialog
        openCreateDialog={openCreateDialog}
        setOpenCreateDialog={setOpenCreateDialog}
      />
    </Stack>
  );
}
Organizations.requireAuth = true;
export default ProtectedPage(Organizations);
