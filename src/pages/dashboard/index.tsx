import { useState } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import ProtectedPage from "@/HOC/Protected";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import HeroHeader from "@/components/dashboard/HeroHeader";
import { Stack } from "@mui/material";
import FilterLine from "@/components/dashboard/FilterLine";
import GridView from "@/components/dashboard/artwork/GridView";
import ListView from "@/components/dashboard/artwork/ListView";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useFCM from "@/hooks/useFCM";

function Artworks() {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { messages, fcmToken } = useFCM();
  console.log("we have fcm token here ", fcmToken);
  const [view, setView] = useState<"list" | "grid">("grid");
  const {
    isFetching,
    data: artworks,
    refetch,
    isError,
  } = useQuery(
    ["artworks", currentPage, limit],
    () =>
      axiosAuth.get(`/art-piece/creator?page=${currentPage}&limit=${limit}`),

    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Stack spacing={2}>
      <HeroHeader
        type="artworks"
        handleCreate={() => router.push("/dashboard/artworks/create")}
        handleExplore={() => router.push("/explore")}
      />
      <FilterLine
        handleCreate={() => router.push("/dashboard/artworks/create")}
        view={view}
        setView={setView}
        title="My Artworks"
      />
      <div className="mt-4">
        {view == "grid" ? (
          <GridView
            artworks={artworks?.data?.artPieces}
            isFetching={isFetching}
            isError={isError}
            baseUrl="/dashboard/artworks"
            meta={artworks?.data?.meta}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
            refetch={refetch}
            currentPage={currentPage}
            limit={limit}
          />
        ) : (
          <ListView
            isFetching={isFetching}
            isError={isError}
            artworks={artworks?.data?.artPieces}
            baseUrl="/dashboard/artworks"
            meta={artworks?.data?.meta}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
          />
        )}
      </div>
    </Stack>
  );
}
Artworks.requireAuth = true;
export default ProtectedPage(Artworks);
