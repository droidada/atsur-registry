import { useEffect } from "react";
import { Grid } from "@mui/material";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { ArtistCard } from "@/components/artist-card";

function Artists() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <Grid
        container
        spacing={2}
        columnSpacing={3}
        rowSpacing={3}
        xs={12}
        sm={8}
        md={12}
        px={10}
      >
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
        <ArtistCard sx={{ m: 2 }} />
      </Grid>
    </DashboardLayout>
  );
}

Artists.requireAuth = true;
export default Artists;
