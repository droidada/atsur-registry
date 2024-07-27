import LoadingButton from "@/components/Form/LoadingButton";
import { Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import { RiUserFollowFill } from "react-icons/ri";

interface Props {
  notification: INotification;
  refetch: any;
  mutate: any;
  isLoading?: boolean;
}
const NewFollowerNotification: React.FC<Props> = ({
  notification,
  refetch,
  mutate,
  isLoading,
}) => {
  return (
    <div
      onClick={() => {}}
      className={`flex gap-4 py-3 px-5 justify-between items-center relative ${
        notification.read ? "bg-white" : "bg-secondary-white "
      } ${
        !notification.read && notification?.invitation?.token
          ? "cursor-pointer"
          : ""
      }`}
    >
      <div className="flex gap-4 justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <div className="bg-gray-300 w-5 h-5 rounded-full md:w-[75px] md:h-[75px] grid place-items-center">
            <RiUserFollowFill className="text-primary" size={25} />
          </div>
          <div className="flex gap-4">
            <h2 className="font-[300] text-sm ">{notification?.message}</h2>

            <span className="font-[200] text-[21px] leading-[16px]">
              {moment(notification.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <LoadingButton
          onClick={(e) => {
            e.stopPropagation();
            mutate();
          }}
          loading={isLoading}
          className="bg-secondary w-fit rounded-full text-xs font-[300] text-primary"
          variant="contained"
        >
          {notification?.read ? "Mark as unread" : "Mark as read"}
        </LoadingButton>

        <div className="absolute top-0 right-0  w-[7px] bg-[blue] h-full"></div>
      </div>
    </div>
  );
};

export default NewFollowerNotification;
