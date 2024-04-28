import { useEffect, useState } from "react";
import Link from "next/link";

import DashboardLayoutWithSidebar, {
  DashboardPages,
} from "@/components/open9/layout/DashboardLayoutWithSidebar";
import AutoSlider1 from "@/open9/slider/AutoSlider1";
import AutoSlider2 from "@/open9/slider/AutoSlider2";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import { ArtistCard } from "@/components/artist-card";
import ArtPieceCard from "@/components/common/ArtPieceCard";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import ProtectedPage from "@/HOC/Protected";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import HeroHeader from "@/components/dashboard/HeroHeader";
import { Stack } from "@mui/material";
import FilterLine from "@/components/dashboard/FilterLine";
import GridView from "@/components/dashboard/artwork/GridView";
import ListView from "@/components/dashboard/artwork/ListView";
import { useQuery } from "@tanstack/react-query";

// export const getServerSideProps = async ({ req, query }) => {
//   try {
//     const token: any = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//     });
//     console.log("token here is ", token);
//     if (!token) return;

//     const res = await axios.get(`/art-piece/creator`, {
//       headers: { authorization: `Bearer ${token?.accessToken}` },
//     });

//     return { props: { artworks: res.data.artPieces } };
//   } catch (error) {
//     console.error("error here looks like ", error);
//     if (error?.response?.status === 404) {
//       return {
//         notFound: true,
//       };
//     }
//     throw new Error(error);
//   }
// };

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
