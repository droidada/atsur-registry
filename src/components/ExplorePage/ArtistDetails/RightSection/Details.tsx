import IArtistDetails from "@/types/models/artistDetails";
import { Stack } from "@mui/material";
import React from "react";

interface Props {
  artist: IArtistDetails;
}

const Details: React.FC<Props> = ({ artist }) => {
  return (
    <Stack spacing={2}>
      <p className="text-base text-justify">{artist?.bio}</p>
    </Stack>
  );
};

export default Details;
