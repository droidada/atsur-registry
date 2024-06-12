import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import OrganizationListView from "./OrganizationListView";

const MyOrganization = () => {
  const axiosAuth = useAxiosAuth();

  const {
    data: organizations,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery(
    ["MyOrganization"],
    () =>
      axiosAuth.get("/org/user").then((res) => {
        return res.data.data;
      }),
    {
      refetchOnWindowFocus: false,
    },
  );
  return (
    <OrganizationListView
      isFetching={isFetching}
      isError={isError}
      organizations={organizations}
      baseUrl="/dashboard/organizations"
    />
  );
};

export default MyOrganization;
