import { useEffect } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import WidgetSummary from "@/components/nav/widget-summary";
import NewsUpdate from "@/components/nav/news-updates";
import DashboardLayout from "@/components/dashboard-layout";
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

export default Artists;
