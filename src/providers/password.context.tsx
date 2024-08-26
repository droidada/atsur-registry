"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Backdrop } from "@mui/material";

export type NewLogin = {
  isFirstLogin: boolean;
  uuid: string;
};

export type PasswordContextData = {
  // load: () => void;
};

const PasswordContext = createContext({} as PasswordContextData);

export function PasswordContextProvider({ children }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (process.env.NODE_ENV == "production" && loaded == 0) {
      const storedData = localStorage.getItem("hideWebsite");
      setOpen(storedData === "false" ? false : true);
    }
  }, []);

  const onFormSubmit = (e) => {
    try {
      e.preventDefault();
      if (password === process.env.NEXT_PUBLIC_SITE_PASSWORD) {
        setOpen(false);
        setLoaded(loaded + 1);
        localStorage.setItem("hideWebsite", "false");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      // load,
    }),
    [],
  );

  return (
    <PasswordContext.Provider value={memoedValue}>
      {children}
      <Backdrop
        sx={{
          background: "#000",
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <div className="row">
          <form onSubmit={onFormSubmit}>
            <div className="col-md-10">
              <input
                type="password"
                id="password"
                placeholder="Enter password to access site"
                name="password"
                tabIndex={2}
                aria-required="true"
                required
                onChange={(e) => setPassword(e?.target?.value)}
              />
            </div>
            <div className="col-md-2">
              <button
                className="w150"
                style={{ background: "#3E7AA2" }}
                // onClick={() => access()}
              >
                Ok
              </button>
            </div>
          </form>
        </div>
      </Backdrop>
    </PasswordContext.Provider>
  );
}

export default PasswordContext;

export const usePasswordContext = () => ({
  ...useContext(PasswordContext),
});
