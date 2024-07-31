import ProtectedPage from "@/HOC/Protected";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Avatar, IconButton, Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";

const MessageContent = () => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const conversationId = router.query?.conversationId;
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  console.log(conversationId);
  const {
    data: conversations,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: () => axiosAuth.get("/conversation/messages/" + conversationId),
  });

  const { mutate } = useMutation({
    mutationFn: (content: string) =>
      axiosAuth.post(`/conversation/send-message/${conversationId}`, {
        content,
      }),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [conversations?.data?.data?.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(message);
    setMessage("");
  };

  console.log(conversations?.data?.data);
  console.log(session?.user?._id);
  return (
    <Stack spacing={4}>
      <div className="border-b-[1px] flex gap-2  px-2 items-center py-3">
        <Avatar
          src={conversations?.data?.user?.avatar}
          className="w-[50px] h-[50px]"
        />
        <h6 className="text-2xl font-semibold">
          {conversations?.data?.user?.firstName}{" "}
          {conversations?.data?.user?.lastName}
        </h6>
      </div>
      <div>
        <div className="flex flex-col overflow-y-auto p-5 bg-secondary-white gap-2  h-screen">
          {conversations?.data?.data
            ?.slice()
            ?.reverse()
            .map((message, id) => (
              <div
                key={id}
                className={`flex gap-2 items-center ${
                  message?.sender == session?.user?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <p
                  className={`text-sm p-2 rounded-md ${
                    message?.sender === session?.user?._id
                      ? "bg-primary text-white "
                      : "bg-secondary"
                  }`}
                >
                  {message?.content}
                </p>
              </div>
            ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex bg-secondary my-4 rounded-md shadow-sm gap-2"
        >
          <textarea
            value={message}
            className="flex-1 h-[36px] bg-transparent focus:outline-none overflow-hidden px-2 border-none outline-none ring-0 focus:ring-0"
            name=""
            onChange={(e) => setMessage(e.target.value)}
            id=""
            placeholder="Type a message"
          />
          {/* @ts-ignore */}
          <IconButton type="submit ">
            <TbSend />
          </IconButton>
        </form>
      </div>
    </Stack>
  );
};

export default ProtectedPage(MessageContent);
