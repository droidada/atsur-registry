import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { NotificationCardProps } from "@/types/models/notificationData";
import { Avatar, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const ArtpieceArtistInvite: React.FC<NotificationCardProps> = ({
  notification,
  mutate,
}) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const toast = useToast();

  const { mutate: mutateMove, isLoading } = useMutation({
    mutationFn: () => axiosAuth.put(`/notifications/read/${notification?._id}`),
    onSuccess: () => {
      router.push(`/invitation/${notification?.invitation?.token}`);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error?.message || "Something went";
      toast.error(errorMessage);
    },
  });

  const handleClick = async () => {
    if (!notification.read) {
      mutateMove();
    } else {
      router.push(`/invitation/${notification?.invitation?.token}`);
    }
  };
  return (
    <div
      //   onClick={handleClick}
      className={`flex gap-4 py-3 px-5 justify-between items-center relative ${
        notification.read ? "bg-white" : "bg-secondary-white "
      } ${
        !notification.read && notification?.invitation?.token
          ? "cursor-pointer"
          : ""
      }`}
    >
      <Stack direction="row" alignItems={"center"} spacing={2}>
        <Avatar
          src={notification.sender?.avatar}
          className="bg-gray-300 w-5 h-5 md:w-[75px] md:h-[75px]"
        />
        <Stack spacing={1}>
          <div className="flex gap-4">
            <h2 className="font-[500] text-[26px] leading-[16px]">
              {notification.sender?.firstName} {notification.sender?.lastName}{" "}
              invited you
            </h2>

            <span className="font-[200] text-[21px] leading-[16px]">
              {moment(notification.createdAt).fromNow()}
            </span>
          </div>

          <p className="font-[300] text-sm ">as the artist their Artwork</p>
        </Stack>
      </Stack>
      <LoadingButton
        onClick={handleClick}
        loading={false}
        className="bg-secondary w-fit rounded-full text-xs font-[300] text-primary"
        variant="contained"
      >
        View
      </LoadingButton>

      <div className="absolute top-0 right-0  w-[7px] bg-[gold] h-full"></div>
    </div>
  );
};

export default ArtpieceArtistInvite;
