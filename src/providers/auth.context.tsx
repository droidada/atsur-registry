"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { IUser } from "../types/models";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export type NewLogin = {
  isFirstLogin: boolean;
  uuid: string;
};

export type AuthContextData = {
  user: IUser | undefined;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
  updateUserProfile: (data: any) => Promise<void>;
  error: string;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: any) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<IUser>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axiosAuth.get("user/me");
      const data = res.data;
      console.log("we have current user here hello ", data);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [axiosAuth]);

  const updateUserProfile = useCallback(
    async (info: any): Promise<void> => {
      setLoading(true);
      const res = await axiosAuth.patch("/user/update", {
        ...info,
        isProfileSetup: true,
      });
      const data = res.data;
      console.log("we have updated user here ", data);
      setUser(data);
      setLoading(false);
    },
    [axiosAuth],
  );

  const logIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      await fetchUser();
      setLoading(false);
      return res;
    },
    [fetchUser],
  );

  const logOut = async () => {
    await signOut();
    setUser(null);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      logIn,
      logOut,
      updateUserProfile,
      error,
    }),
    [user, logIn, updateUserProfile, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

export const useAuthContext = () => ({
  ...useContext(AuthContext),
});
