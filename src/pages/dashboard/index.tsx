import { useEffect, useState } from "react";
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
import { pageTours } from "@/lib/helpers/driverObj";

function Artworks() {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [driverObj, setDriverObj] = useState(null);
  const [shouldStartTour, setShouldStartTour] = useState(false);
  const { messages, fcmToken } = useFCM();

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
    <Stack className="beginning" spacing={2}>
      <HeroHeader
        type="artworks"
        handleCreate={() => router.push("/dashboard/artworks/create")}
        handleExplore={() => router.push("/explore")}
      />
      <div id="artwork-filters">
        <FilterLine
          handleCreate={() => router.push("/dashboard/artworks/create")}
          view={view}
          setView={setView}
          title="My Artworks"
        />
      </div>
      <div id="artwork-list" className="mt-4">
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
