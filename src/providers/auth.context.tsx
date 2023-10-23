import axios from "axios";
import Router from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { IUser, IProfile } from "../types/models";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export type NewLogin = {
  isFirstLogin: boolean;
  uuid: string;
};

export type AuthContextData = {
  user: IUser | undefined;
  sendArtistInvite: (
    email: string,
    type: string,
    userName: string,
    orgName: string,
    orgId?: string,
  ) => Promise<void>;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateUserProfile: (data: IProfile) => Promise<void>;
  error: string;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser>(null);
  const [galleryId, setGalleryId] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const axiosAuth = useAxiosAuth();

  const fetchUser = useCallback(async (): Promise<void> => {
    setLoading(true);
    const res = await axiosAuth.get("users/me");
    const data = res.data.data;
    console.log("we have current user here ", data);
    setUser(data);
    setLoading(false);
  }, [axiosAuth]);

  useEffect(() => {
    async () => {
      await fetchUser();
    };
  }, [fetchUser]);

  const sendArtistInvite = async (
    email: string,
    type: string,
    name: string,
    orgName: string,
    galleryId?: string,
  ): Promise<void> => {
    setLoading(true);

    //TODO: extract api calls
    await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/email/artist-invite`,
      {
        email,
        type,
        galleryId,
        orgName,
        name,
      },
    );
    setLoading(false);
  };

  const updateUserProfile = async (info: IProfile): Promise<void> => {
    setLoading(true);
    const res = await axiosAuth.patch("users/me", {
      ...info,
      isProfileSetup: true,
    });
    const data = res.data.data;
    console.log("we have current user here ", data);
    setUser(data);
    setLoading(false);
  };

  const logIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        // callbackUrl: `/`,
      });
      await fetchUser();
      console.log("user here is ", user);
      if (!user.isProfileSetup) {
        Router.replace("profile/setup");
        return;
      }
      Router.replace("/");
    } catch (error) {
      console.log("error here ", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const logOut = async () => {
    await signOut();
    setUser(null);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      sendArtistInvite,
      loading,
      logIn,
      logOut,
      updateUserProfile,
      error,
    }),
    [user, loading, error],
  );

  useEffect(() => {}, [user]);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;

export const useAuthContext = () => ({
  ...useContext(AuthContext),
});

export const ProtectRoute = ({ children }) => {
  const { status } = useSession();
  if (status === "loading") {
    // return <LoadingScreen />;
    console.log("LOADING SCREEN");
    return <>LOADING</>;
  }
  return children;
};
