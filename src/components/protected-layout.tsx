import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
  children: React.ReactElement;
};

export const ProtectedLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === "authenticated";
  const unAuthorized = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return;

    // if the user is not authorized, redirect to the login page
    // with a return url to the current page
    if (unAuthorized) {
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  // if the user refreshed the page or somehow navigated to the protected page
  if (loading) {
    return (
      <Backdrop
        sx={{
          background: "#000",
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open
      >
        <CircularProgress color="info" />
      </Backdrop>
    );
  }

  // if the user is authorized, render the page
  // otherwise, render nothing while the router redirects him to the login page
  return authorized ? (
    <div>{children}</div>
  ) : (
    <Backdrop
      sx={{
        background: "#000",
        color: "#000",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <CircularProgress color="info" />
    </Backdrop>
  );
};
