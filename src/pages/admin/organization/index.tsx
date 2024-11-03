import CreateOrganizationModal from "@/components/admin/organization/NewOrgModal";
import OrganizationTable from "@/components/admin/organization/organizationTable";
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { GridView } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Organization = () => {
  const axiosFetch = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();

  const [filters, setFilters] = useState({});

  const {
    data: organizations,
    isLoading: isFetching,
    isError,
    refetch,
  } = useQuery(
    ["artworks", { currentPage, limit, filters }],
    () =>
      axiosFetch.get(
        `/org/admin?page=${currentPage}&limit=${limit}&filters=${JSON.stringify(
          filters,
        )}`,
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };
  return (
    <AdminDashboardLayout>
      <Stack spacing={4}>
        <Stack
          justifyContent={"space-between"}
          direction="row"
          spacing={4}
          alignItems={"center"}
        >
          <h1 className="text-3xl font-bold">Organizations</h1>

          <Button
            aria-haspopup="true"
            onClick={handleCreate}
            startIcon={<FaPlus />}
            variant="text"
            className="text-[14px] leading-[16px] text-primary"
          >
            New
          </Button>
        </Stack>

        <OrganizationTable
          organizations={organizations?.data?.data}
          isFetching={isFetching}
          isError={isError}
        />

        <CreateOrganizationModal
          refetch={refetch}
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Stack>
    </AdminDashboardLayout>
  );
};

export default Organization;
