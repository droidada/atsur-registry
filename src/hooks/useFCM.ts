import { useEffect, useState } from "react";
import useFCMToken from "./useFCMToken";
import { messaging } from "@/lib/firebase";
import { MessagePayload, onMessage } from "firebase/messaging";
import { useToast } from "@/providers/ToastProvider";

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  //TODO: change to notification toast
  const toast = useToast();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmmessaging = messaging();
      const unsubscribe = onMessage(fcmmessaging, (payload) => {
        toast.dark(payload.notification?.title);
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken]);
  return { fcmToken, messages };
};

export default useFCM;
