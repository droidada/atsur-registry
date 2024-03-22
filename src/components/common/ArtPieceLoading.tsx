import { Card, Skeleton } from "@mui/material";
import React from "react";

const ArtPieceLoading = () => {
  return (
    <Card
      sx={{
        maxWidth: "350px",
        width: "100%",
        height: "400px",
      }}
    >
      <div className=" px-4">
        <Skeleton
          animation="wave"
          height="250px"
          width="100%"
          variant="rectangular"
        />
        <Skeleton
          height="10px"
          width="40%"
          variant="rectangular"
          className="mt-3"
        />
        <div className="my-3 px-4">
          <Skeleton
            variant="rectangular"
            height="10px"
            className="my-1"
            width="30%"
          />
          <div className="flex gap-2 mt-3  items-center">
            <Skeleton variant="circular" height="20px" width="20px" />
            <Skeleton variant="rectangular" height="10px" width="40%" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ArtPieceLoading;
