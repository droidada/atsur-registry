import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

interface DashboardContextProps {
  notifications: any;
  setNotifications: React.Dispatch<React.SetStateAction<any>>;
  credits: any;
  setCredits: React.Dispatch<React.SetStateAction<any>>;
}

export const dashboardContext = createContext<DashboardContextProps>({
  notifications: [],
  setNotifications: () => {},
  credits: [],
  setCredits: () => {},
});

type Props = {
  children: React.ReactNode;
};

const DashboardContextProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState([]);
  const [credits, setCredits] = useState([]);

  const axiosAuth = useAxiosAuth();

  const {
    data: getCredits,
    isLoading: isLoadingCredits,
    error: errorCredits,
    isFetched: isFetchedCredits,
  } = useQuery({
    queryKey: ["credits"],
    queryFn: async () => {
      const { data: response } = await axiosAuth.get("/user/credits");
      console.log(response?.data?.credits);
      return response?.data?.credits;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: getNotifications,
    isLoading: isLoadingNotifications,
    error: errorNotifications,
    isFetched: isFetchedNotifications,
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

  return (
    <dashboardContext.Provider
      value={{ notifications, setNotifications, credits, setCredits }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardContextProvider;
