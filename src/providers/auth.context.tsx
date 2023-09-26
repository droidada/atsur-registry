import axios from "axios";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Router from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../services/auth/firebase";
import { IMember, IUser } from "../types/models";

export type NewLogin = {
  isFirstLogin: boolean;
  uuid: string;
};

export type AuthContextData = {
  user: IUser | undefined;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  emailSignUp: (newSignUp: IMember, url: string) => Promise<void>;
  signInWithGoogle: () => Promise<NewLogin | undefined>;
  anonymousSignIn: () => Promise<NewLogin | undefined>;
  sendArtistInvite: (
    email: string,
    type: string,
    userName: string,
    orgName: string,
    orgId?: string,
  ) => Promise<void>;
  sendLoginLink: (email: string) => Promise<void>;
  loading: boolean;
  isNewUser: boolean;
  logOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  error: string;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | undefined>();
  const [galleryId, setGalleryId] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdToken().then(function (idToken) {
          console.log("id token is = ", idToken); // It shows the Firebase token now
          return idToken;
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async (): Promise<NewLogin | undefined> => {
    setLoading(true);
    await setPersistence(auth, browserSessionPersistence);
    const credential = await signInWithPopup(auth, new GoogleAuthProvider());
    const additionalInfo = getAdditionalUserInfo(credential);

    setIsNewUser(additionalInfo?.isNewUser || false);

    setLoading(false);
    return {
      isFirstLogin: additionalInfo?.isNewUser || false,
      uuid: credential.user.uid,
    };
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await setPersistence(auth, browserSessionPersistence);
    const credential = await signInWithEmailAndPassword(auth, email, password);

    const additionalInfo = getAdditionalUserInfo(credential);

    setIsNewUser(additionalInfo?.isNewUser || false);
    setLoading(false);
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await setPersistence(auth, browserSessionPersistence);
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const additionalInfo = getAdditionalUserInfo(credential);
    if (additionalInfo?.isNewUser) {
    }

    setUser({ ...credential.user });
    setIsNewUser(additionalInfo?.isNewUser || false);
    setLoading(false);
  };

  const emailSignUp = async (
    newSignUp: IMember,
    url?: string,
  ): Promise<void> => {
    setLoading(true);
    // first time user
    await setPersistence(auth, browserSessionPersistence);

    const isValidLink = isSignInWithEmailLink(auth, url || "");
    if (!isValidLink || !newSignUp.email) throw new Error("invalid sign url");

    const credential = await signInWithEmailLink(auth, newSignUp.email, url);
    const additionalInfo = getAdditionalUserInfo(credential);
    if (additionalInfo?.isNewUser) setIsNewUser(additionalInfo.isNewUser);

    setUser({ ...credential.user });
    setLoading(false);
  };

  const sendLoginLink = async (email: string): Promise<void> => {
    setLoading(true);
    //TODO: abstract api calls
    await axios.post(
      `${
        window.location.origin || process.env.NEXT_PUBLIC_DOMAIN_NAME
      }/api/email/login`,
      {
        email,
        // newUser: member ? false : true
      },
    );
    setLoading(false);
  };

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

  const anonymousSignIn = async (): Promise<NewLogin | undefined> => {
    setLoading(true);
    const credential = await signInAnonymously(auth);
    const additionalInfo = getAdditionalUserInfo(credential);
    setUser({
      ...credential.user,
      memberInfo: { type: "anonymous", name: "anonymous", org_id: "" },
    });
    setLoading(false);
    if (additionalInfo?.isNewUser) setIsNewUser(additionalInfo.isNewUser);
    return {
      isFirstLogin: additionalInfo?.isNewUser || false,
      uuid: credential.user.uid,
    };
  };

  const refreshUser = async (): Promise<void> => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) return;
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(undefined);
    Router.replace("/onboarding");
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUpWithEmail,
      signInWithEmail,
      emailSignUp,
      signInWithGoogle,
      anonymousSignIn,
      sendArtistInvite,
      sendLoginLink,
      loading,
      isNewUser,
      refreshUser,
      logOut,
      error,
    }),
    [user, loading, error, isNewUser],
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
