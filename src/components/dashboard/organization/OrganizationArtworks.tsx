import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface Props {
  organizationId: string;
}
const OrganizationArtworks: React.FC<Props> = ({ organizationId }) => {
  const axiosAuth = useAxiosAuth();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useQuery({
    queryKey: ["organizationArtworks", organizationId],
    queryFn: () => axiosAuth.get(`/org/art-pieces/${organizationId}`),
  });

  console.log(data);

  return <Stack className="my-4">OrganizationArtworks</Stack>;
};

export default OrganizationArtworks;
