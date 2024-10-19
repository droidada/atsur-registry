import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

interface DashboardContextProps {
  notifications: any;
  setNotifications: React.Dispatch<React.SetStateAction<any>>;
  credits: any;
  setCredits: React.Dispatch<React.SetStateAction<any>>;
  refetchCredits: () => void;
  refetchNotifications: () => void;
}

export const dashboardContext = createContext<DashboardContextProps>({
  notifications: [],
  setNotifications: () => {},
  credits: [],
  setCredits: () => {},
  refetchCredits: () => {},
  refetchNotifications: () => {},
});

type Props = {
  children: React.ReactNode;
};

const DashboardContextProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState([]);
  const [credits, setCredits] = useState([]);

  const axiosAuth = useAxiosAuth();

  const { data: getCredits, refetch: refetchCredits } = useQuery({
    queryKey: ["credits"],
    queryFn: async () => {
      const { data: response } = await axiosAuth.get("/user/credits");
      console.log(response);
      return response?.data;
    },
    refetchOnWindowFocus: false,
  });

  console.log("This is the credits", getCredits);

  const {
    data: getNotifications,
    isFetched: isFetchedNotifications,
    refetch: refetchNotifications,
  } = useQuery({
    queryFn: async () => {
      const { data: response } = await axiosAuth.get("/notifications/unread");
      // console.log("This is the response", response.data);
      return response.data?.notifications;
    },
    queryKey: ["notifications"],
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (getCredits) {
      setCredits(getCredits);
    }
  }, [isFetchedNotifications]);

  useEffect(() => {
    if (getNotifications) {
      setNotifications(getNotifications);
    }
  }, [isFetchedNotifications]);

  console.log(notifications);

  return (
    <dashboardContext.Provider
      value={{
        notifications,
        setNotifications,
        credits,
        setCredits,
        refetchCredits,
        refetchNotifications,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardContextProvider;
