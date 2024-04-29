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

function Artworks() {
  const axiosAuth = useAxiosAuth();
  const [view, setView] = useState<"list" | "grid">("grid");
  const {
    isFetching,
    data: artworks,
    isError,
  } = useQuery(["artworks"], () =>
    axiosAuth.get(`/art-piece/creator`).then((res) => res.data.artPieces),
  );
  // console.log(artworks);

  console.log(artworks);

  return (
    <Stack spacing={2}>
      <SearchBar />
      <HeroHeader
        type="artworks"
        handleCreate={() => {}}
        handleExplore={() => {}}
      />
      <FilterLine view={view} setView={setView} title="My Artworks" />
      <div className="mt-4">
        {view == "grid" ? (
          <GridView
            artworks={artworks}
            isFetching={isFetching}
            isError={isError}
            baseUrl="/dashboard/artworks"
          />
        ) : (
          <ListView
            isFetching={isFetching}
            isError={isError}
            artworks={artworks}
            baseUrl="/dashboard/artworks"
          />
        )}
      </div>
    </Stack>
  );
}
Artworks.requireAuth = true;
export default ProtectedPage(Artworks);
