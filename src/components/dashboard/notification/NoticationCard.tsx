import LoadingButton from "@/components/Form/LoadingButton";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useToast } from "@/providers/ToastProvider";
import { Avatar, Button, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ArtpieceCollaboratorInvite from "./ArtpieceCollaboratorInvite";
import OrgInvite from "./OrgInvite";
import NewFollowerNotification from "./NewFollowerNotification";

interface Props {
  notification: INotification;
  refetch: any;
}
const NoticationCard: React.FC<Props> = ({ notification, refetch }) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: (notification: INotification) =>
      notification?.read
        ? axiosAuth.put(`/notifications/unread/${notification?._id}`)
        : axiosAuth.put(`/notifications/read/${notification?._id}`),
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
    onSuccess: () => {
      toast.success("Notification marked as read");
      refetch();
    },
  });
  console.log(notification);
  switch (notification.type) {
    case "org-invite":
      return <OrgInvite refetch={refetch} notification={notification} />;
    case "art-piece-collaborator-invite":
      return (
        <ArtpieceCollaboratorInvite
          refetch={refetch}
          notification={notification}
          mutate={() => mutate(notification)}
        />
      );
    case "new-following":
      return (
        <NewFollowerNotification
          refetch={refetch}
          notification={notification}
          mutate={() => mutate(notification)}
          isLoading={isLoading}
        />
      );
    default:
      return <div></div>;
  }
};

export default NoticationCard;

// const OrgInvite: React.FC<Props> = ({ notification, refetch }) => {
//   const router = useRouter();
//   const axiosAuth = useAxiosAuth();
//   const toast = useToast();

//   const { data: session } = useSession();

//   console.log(session?.user?._id);
//   console.log(notification?.sender?.id);

//   const { mutate, isLoading } = useMutation({
//     mutationFn: () =>
//       notification?.read
//         ? axiosAuth.put(`/notifications/unread/${notification._id}`)
//         : axiosAuth.put(`/notifications/read/${notification._id}`),
//     onError: (error: any) => {
//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Something went wrong",
//       );
//     },
//     onSuccess: () => {
//       toast.success("Notification marked as read");
//       refetch();
//     },
//   });

//   const handleClick = async () => {
//     if (
//       !notification?.read &&
//       notification?.invitation?.token &&
//       !(notification.sender?.id == session.user._id)
//     ) {
//       await axiosAuth.put(`/notifications/read/${notification._id}`);
//       router.push(`/invitation/${notification.invitation?.token}`);
//     }
//   };
//   return (
//     <div
//       onClick={handleClick}
//       className={`flex gap-4 py-3 px-5 justify-between items-center relative ${
//         notification.read ? "bg-white" : "bg-secondary-white "
//       } ${
//         notification.read && notification?.invitation?.token
//           ? "cursor-pointer"
//           : ""
//       }`}
//     >
//       <Stack direction="row" alignItems={"center"} spacing={2}>
//         <Avatar
//           src={notification.sender?.avatar}
//           className="bg-gray-300 w-5 h-5 md:w-[75px] md:h-[75px]"
//         />
//         <Stack spacing={1}>
//           <div className="flex gap-4">
//             {!(notification.sender?.id == session.user._id) ? (
//               <h2 className="font-[500] text-[26px] leading-[16px]">
//                 {notification.sender?.firstName} {notification.sender?.lastName}{" "}
//                 invited you
//               </h2>
//             ) : (
//               <h2 className="font-[500] text-[26px] leading-[16px]">
//                 You Invited {notification.invitation?.invitee?.firstName}{" "}
//                 {notification.invitation?.invitee?.lastName}
//               </h2>
//             )}
//             <span className="font-[200] text-[21px] leading-[16px]">
//               {moment(notification.createdAt).fromNow()}
//             </span>
//           </div>

//           <p className="font-[300] text-sm ">
//             to be a member of{" "}
//             {notification.sender?.id == session.user.id ? "your" : "their"}{" "}
//             organization
//           </p>
//         </Stack>
//       </Stack>

//       <LoadingButton
//         onClick={(e) => {
//           e.stopPropagation();
//           mutate();
//         }}
//         loading={isLoading}
//         className="bg-secondary w-fit rounded-full text-xs font-[300] text-primary"
//         variant="contained"
//       >
//         {notification?.read ? "Mark as unread" : "Mark as read"}
//       </LoadingButton>

//       <div className="absolute top-0 right-0  w-[7px] bg-[indigo] h-full"></div>
//     </div>
//   );
// };
