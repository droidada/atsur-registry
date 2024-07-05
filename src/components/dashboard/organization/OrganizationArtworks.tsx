import ExploreArtPieceCard, {
  ExploreArtPieceCardLoading,
} from "@/components/ExploreArtPieceCard";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Pagination, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface Props {
  organizationId: string;
}
const OrganizationArtworks: React.FC<Props> = ({ organizationId }) => {
  const axiosAuth = useAxiosAuth();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: artpieces,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["organizationArtworks", organizationId, search, currentPage],
    queryFn: () =>
      axiosAuth.get(
        `/org/art-pieces/${organizationId}?search=${search}&page=${currentPage}`,
      ),
    refetchOnWindowFocus: false,
  });

  return (
    <Stack className="my-4">
      <div className="grid grid-cols-auto-fit items-stretch gap-4">
        {isLoading ? (
          Array(10)
            .fill(null)
            .map((item, index) => <ExploreArtPieceCardLoading key={index} />)
        ) : artpieces?.data?.artpieces?.length === 0 ? (
          <div className="w-full col-span-full"> No Data Found</div>
        ) : (
          artpieces?.data?.artpieces?.map((artpiece) => (
            <ExploreArtPieceCard
              link={`/explore/art-piece/${artpiece?._id}`}
              rating={artpiece?.rating}
              creator={{
                name: `${artpiece?.custodian?.profile?.firstName} ${artpiece?.custodian?.profile?.lastName}`,
                image: artpiece?.custodian?.profile?.avatar,
              }}
              image={artpiece?.assets && artpiece?.assets[0]?.url}
              key={artpiece?.id}
              title={artpiece?.title}
            />
          ))
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          count={artpieces?.data?.meta?.totalPages}
          page={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value);
            refetch();
            window.scrollTo(0, 0);
          }}
        />
      </div>
    </Stack>
  );
};

export default OrganizationArtworks;
