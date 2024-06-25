import { useEffect, useState } from "react";

import ProtectedPage from "@/HOC/Protected";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import HeroHeader from "@/components/dashboard/HeroHeader";

import { Stack } from "@mui/material";

import MyOrganization from "@/components/dashboard/organization/MyOrganization";
import InvitedOrganization from "@/components/dashboard/organization/InvitedOrganization";
import CreateOrganizationDialog from "@/components/dashboard/organization/CreateOrganizationDialog";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

export const getServerSideProps = async ({ req, query, params }) => {
  console.log(query);
  const { token } = query;
  console.log(token);
  if (token) {
    try {
      const res = await axios.post(`/invite/fetch`, {
        token,
      });

      console.log(res.data);

      return { props: { invitationData: res.data?.data } };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } else {
    return { props: {} };
  }
};

function Organizations({ invitationData }) {
  console.log(invitationData?.invitation?.token);
  const router = useRouter();

  const { query } = router;

  const { create } = query;

  const [currentTab, setCurrentTab] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  console.log(create);

  useEffect(() => {
    if (create === "true") {
      setOpenCreateDialog(true);
    }
  }, [invitationData]);

  return (
    <Stack spacing={2}>
      <SearchBar />
      <HeroHeader
        type="organizations"
        handleCreate={() => setOpenCreateDialog(true)}
        handleExplore={() => {}}
      />
      <div className="flex gap-4 border-b-[2px] mt-7 mb-4 w-full">
        {["Added", "Invited"].map((item, index) => (
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
        organization={
          invitationData
            ? {
                name: invitationData?.invitation?.invitee?.orgName,
                email: invitationData?.invitation?.invitee?.email,
              }
            : undefined
        }
        invitationToken={
          invitationData ? invitationData?.invitation?.token : undefined
        }
      />
    </Stack>
  );
}
Organizations.requireAuth = true;
export default ProtectedPage(Organizations);
