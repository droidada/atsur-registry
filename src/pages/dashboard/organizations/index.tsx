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
import { Stack } from "@mui/material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import OrganizationListView from "@/components/dashboard/organization/OrganizationListView";
import OrganizationGridView from "@/components/dashboard/organization/OrganizationGridView";

function Organizations() {
  const [view, setView] = useState<"list" | "grid">("grid");
  const axiosFetch = useAxiosAuth();
  const {
    data: organizations,
    isFetching,
    isError,
  } = useQuery(["organizations"], () =>
    axiosFetch.get("/org/user").then((res) => {
      console.log(res.data);
      return res.data.data;
    }),
  );

  console.log(organizations);

  return (
    <Stack spacing={2}>
      <SearchBar />
      <HeroHeader
        type="artworks"
        handleCreate={() => {}}
        handleExplore={() => {}}
      />
      <FilterLine view={view} setView={setView} title="My Organizations" />
      <div className="mt-4">
        {view == "grid" ? (
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
        )}
      </div>
    </Stack>
  );
}
Organizations.requireAuth = true;
export default ProtectedPage(Organizations);
