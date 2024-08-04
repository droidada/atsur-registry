import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Avatar, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MessagesModal: React.FC<Props> = ({ open, onClose }) => {
  const axiosAuth = useAxiosAuth();
  const { data: session } = useSession();
  const {
    data: messages,
    isLoading,
    isError,
    isRefetching,
  } = useQuery({
    queryFn: () => axiosAuth.get("/conversation/user-conversations"),
    queryKey: ["/conversation/user-conversations"],
    // refetchOnWindowFocus: false,
  });

  console.log(messages?.data);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      PaperProps={{
        className: "bg-white  max-w-[550px] w-full px-6",
      }}
      scroll="paper"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Messages</DialogTitle>
      <DialogContent dividers>
        <h6>Latest</h6>
        <div className="flex flex-col gap-3 mt-5">
          {messages?.data?.data?.map((message) => {
            const user = message?.participants?.find(
              (participant) => participant?._id !== session?.user?._id,
            );
            console.log(user);
            return (
              <Link
                href={`dashboard/messages/${message?._id}`}
                key={message?._id}
                className="flex gap-5"
              >
                <Avatar src={user?.avatar} className="w-[37px] h-[37px] " />
                <p className="text-[11px] font-bold">
                  {user?.firstName} {user?.lastName}
                </p>
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessagesModal;
