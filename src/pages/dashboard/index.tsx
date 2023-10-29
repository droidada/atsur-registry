import { useState, useEffect } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Stack,
  ListItemButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "@/components/layout";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext, ProtectRoute } from "../../providers/auth.context";
import NavItem from "@/components/nav/nav-item";
import WidgetSummary from "@/components/nav/widget-summary";
import NewsUpdate from "@/components/nav/news-updates";
import DashboardLayout from "@/components/dashboard-layout";

function Dashboard() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <Grid
        container
        spacing={2}
        columnSpacing={3}
        xs={12}
        sm={8}
        md={12}
        px={10}
      >
        {/* <Grid container> */}
        <Grid item spacing={0.5} xs={12} sm={6} md={3}>
          <WidgetSummary
            title="Total Artists"
            total={2}
            color="success"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid item spacing={0.5} xs={12} sm={6} md={3}>
          <WidgetSummary
            title="Total Artworks"
            total={2}
            color="info"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid item spacing={0.5} xs={12} sm={6} md={3}>
          <WidgetSummary
            title="Total Contracts"
            total={2}
            color="info"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid item spacing={0.5} xs={12} sm={6} md={3}>
          <WidgetSummary
            title="Total Sales"
            total={2}
            color="info"
            // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        {/* </Grid> */}
        {/* <h2>Dashboard</h2><br /> */}
        <Grid xs={12} md={8} lg={12} mt={4}>
          <NewsUpdate
            title="Activities Update"
            subheader="See all your account activity updates"
            list={[...Array(5)].map((_, index) => ({
              id: "5268263738",
              title: "Person Name",
              description: "A new person  here",
              // image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: 5268263738,
            }))}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: true, // false or "blocking"
//   };
// };

// export default ProtectRoute(Dashboard);
export default Dashboard;
