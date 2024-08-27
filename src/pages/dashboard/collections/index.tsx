import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import CollectionCard from "@/components/common/CollectionCard";
import ProtectedPage from "@/HOC/Protected";
import { Stack } from "@mui/material";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import HeroHeader from "@/components/dashboard/HeroHeader";
import FilterLine from "@/components/dashboard/FilterLine";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import CollectionGridView from "@/components/dashboard/collection/CollectionGridView";
import CollectionListView from "@/components/dashboard/collection/CollectionListView";

// export const getServerSideProps = async ({ req, query }) => {
//   try {
//     const token: any = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//     });

//     if (!token) return;

//     const res = await axios.get(`/collection/user`, {
//       headers: { authorization: `Bearer ${token?.accessToken}` },
//     });

//     console.log(res.data);

//     return { props: { collections: res.data.collections } };
//   } catch (error) {
//     console.error("error here looks like ", error?.response?.data);
//     if (error?.response?.status === 404) {
//       return {
//         notFound: true,
//       };
//     }
//     throw new Error(error);
//   }
// };

function Collections() {
  const [view, setView] = useState<"list" | "grid">("grid");
  const axiosFetch = useAxiosAuth();
  const {
    data: collections,
    isFetching,
    isError,
  } = useQuery(
    ["collections"],
    () =>
      axiosFetch.get("/collection/user").then((res) => res.data.collections),
    {
      refetchOnWindowFocus: false,
    },
  );

  console.log(collections);

  return (
    <Stack spacing={2}>
      <SearchBar />
      <HeroHeader
        type="artworks"
        handleCreate={() => {}}
        handleExplore={() => {}}
      />
      <FilterLine view={view} setView={setView} title="My Collections" />
      <div className="mt-4">
        {view == "grid" ? (
          <CollectionGridView
            baseUrl="/dashboard/collections"
            collections={collections}
            isFetching={isFetching}
            isError={isError}
          />
        ) : (
          <CollectionListView
            baseUrl="/dashboard/collections"
            collections={collections}
            isFetching={isFetching}
            isError={isError}
          />
        )}
      </div>
    </Stack>
  );
}
Collections.requireAuth = true;
export default ProtectedPage(Collections);
