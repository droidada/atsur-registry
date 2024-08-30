import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import ProtectedPage from "@/HOC/Protected";
import SearchBar from "@/components/layout/DashboardLayout/SearchBar";
import HeroHeader from "@/components/dashboard/HeroHeader";
import { Stack } from "@mui/material";
import FilterLine from "@/components/dashboard/FilterLine";
import GridView from "@/components/dashboard/artwork/GridView";
import ListView from "@/components/dashboard/artwork/ListView";
import Message from "@/components/push-message";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { messaging } from "@/lib/firebase";
import { useToast } from "@/providers/ToastProvider";

function Artworks() {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const toast = useToast();

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    console.log("incoming msg");
    toast(<Message notification={payload.notification} />);
  });

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
      <SearchBar />
      <HeroHeader
        type="artworks"
        handleCreate={() => router.push("/dashboard/artworks/create")}
        handleExplore={() => router.push("/explore")}
      />
      <FilterLine view={view} setView={setView} title="My Artworks" />
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
