import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useAuthContext } from "@/providers/auth.context";
import AddArtworkMeta from "./add-artwork-meta";
import AddArtworkSeries from "./add-artwork-series";
import AddArtworkAssets from "./add-artwork-assets";
import InviteArtist from "../add-artist";

const AddArtworkFlow = ({ activeStep, setActiveStep, setCompleted }) => {
  const { user } = useAuthContext();
  const axiosAuth = useAxiosAuth();
  console.log("huston do we have a user?? ", user);

  return (
    <Box
      sx={{
        my: 5,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {activeStep == 0 && (
        <AddArtworkMeta
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setCompleted={setCompleted}
        />
      )}

      {activeStep == 1 && (
        <AddArtworkAssets
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setCompleted={setCompleted}
        />
      )}

      {activeStep == 2 && (
        <AddArtworkSeries
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setCompleted={setCompleted}
        />
      )}

      {activeStep == 3 && (
        <InviteArtist
          prompt="Please add the creators of this artwork."
          multiple
        />
      )}
      <Grid container></Grid>
    </Box>
  );
};

export default AddArtworkFlow;
