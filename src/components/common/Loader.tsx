import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function Loader(props, ref) {
  const [loading, setLoading] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        const loadingCount = loading + 1;
        setLoading(loadingCount);
      },
      stop: () => {
        const loadingCount = loading > 0 ? loading - 1 : 0;
        setLoading(loadingCount);
      },
      isLoading: () => loading >= 1,
    }),
    [],
  );

  if (!loading) {
    return null;
  }

  return (
    <div>
      <Backdrop
        sx={{ background:"#000", color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1}}
        open
      >
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
}

export default forwardRef(Loader);
