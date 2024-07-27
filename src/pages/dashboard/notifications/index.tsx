import ProtectedPage from "@/HOC/Protected";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import {
  Button,
  Pagination,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import NotificationCard from "@/components/dashboard/notification/NoticationCard";
import CircularProgress from "@mui/material/CircularProgress";
import { useToast } from "@/providers/ToastProvider";
import NoData from "@/components/dashboard/NoData";

const views = ["All", "Invitations"];
const Notification = () => {
  const [currentView, setCurrentView] = useState(0);
  const [unread, setUnRead] = useState(false);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, refetch, isLoading } = useQuery(
    ["notifications", unread, currentPage],
    {
      queryFn: () =>
        axiosAuth.get(`/notifications?unread=${unread}&page=${currentPage}`),
      refetchOnWindowFocus: false,
    },
  );

  const { mutate, isLoading: isLoadingMarKAllAsRead } = useMutation({
    mutationFn: () =>
      Promise.all(
        data?.data?.data?.map((notification) =>
          axiosAuth.put(`/notifications/read/${notification._id} `),
        ),
      ),
    onSuccess: () => {
      refetch();
      toast.success("Notifications marked as read");
    },
  });

  console.log(data?.data?.meta);

  return (
    <Stack justifyContent={"space-between"} spacing={"35px"}>
      {isLoadingMarKAllAsRead && (
        <div className="w-full z-[3000] h-screen fixed left-0 bg-black/50 backdrop-blur-sm top-0 grid place-items-center">
          <CircularProgress color="inherit" size={40} />
        </div>
      )}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={4}
        alignItems="center"
      >
        <Typography
          variant="h1"
          className="font-[600] text-2xl lg:text-[40px] lg:leading-[40px]"
        >
          Notifications
        </Typography>
        <div className="flex gap-2 items-center divide-x-[1px] text-[16px] leading-[20px] h-fit  divide-primary">
          <span className="mr-2">Mark all as read</span>
          <div className="flex items-center pl-2 gap-2">
            <span>Only show unread</span>
            <Switch
              onChange={(e) => {
                console.log(e.target.checked);
                setUnRead(e.target.checked);
              }}
              checked={unread}
            />
          </div>
        </div>
      </Stack>
      <Stack spacing={2}>
        <div className="flex gap-2 border-b-[1px]  h-fit ">
          {views.map((view, index) => (
            <div
              onClick={() => setCurrentView(index)}
              key={view}
              className="relative font-[300] cursor-pointer text-[16px] pb-2 leading-[20px]"
            >
              <span>{view}</span>
              {index == currentView && (
                <span className="absolute top-full left-0 h-[2px] w-full bg-primary" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            variant="text"
            onClick={() => mutate()}
            className="text-[12px] cursor-pointer leading-[12px] font-[300]"
          >
            Mark all as read
          </Button>
        </div>
      </Stack>

      <Stack spacing={2}>
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <Skeleton
              animation="wave"
              variant="rectangular"
              key={index}
              height={100}
              className="w-full"
            ></Skeleton>
          ))
        ) : data?.data?.data?.length == 0 ? (
          <NoData text="No Notifications" />
        ) : (
          data?.data?.data?.map((notification) => (
            <NotificationCard
              refetch={refetch}
              key={notification._id}
              notification={notification}
            />
          ))
        )}
      </Stack>
      <div className="flex justify-center mt-6">
        {data?.data?.meta && (
          <Pagination
            count={data?.data?.meta?.totalPages}
            page={currentPage}
            onChange={(e, value) => {
              setCurrentPage(value);
              // refetch();
              window.scrollTo(0, 0);
            }}
          />
        )}
      </div>
    </Stack>
  );
};

export default ProtectedPage(Notification);
