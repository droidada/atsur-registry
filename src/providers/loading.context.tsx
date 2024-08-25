"use client";
import React, {
  useRef,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/router";

export type NewLogin = {
  isFirstLogin: boolean;
  uuid: string;
};

export type LoadingContextData = {
  loading: boolean;
  load: (func: Promise<() => any>) => any;
  startLoader: () => any;
  stopLoader: () => any;
  error: string;
};

const LoadingContext = createContext({} as LoadingContextData);

export function LoadingContextProvider({ children }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const ref = useRef<any>();
  const startLoader = () => ref?.current?.start();
  const stopLoader = () => ref?.current?.stop();

  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = useCallback(async (func: Promise<any>) => {
    try {
      setLoading(true);
      startLoader();
      const res = await func;
      stopLoader();
      setLoading(false);
      return res;
    } catch (error) {
      console.error("LoadingContext: error here looks like ", error);
      if (error?.response?.status === 404) {
        router.replace("/404");
      }
      router.replace("/500");
      setLoading(false);
      stopLoader();
    }
  }, []);

  const memoedValue = useMemo(
    () => ({
      loading,
      load,
      ref,
      startLoader,
      stopLoader,
      error,
    }),
    [load, loading, error],
  );

  return (
    <LoadingContext.Provider value={memoedValue}>
      {children}
      <Loader ref={ref} />
    </LoadingContext.Provider>
  );
}

export default LoadingContext;

export const useLoadingContext = () => ({
  ...useContext(LoadingContext),
});
