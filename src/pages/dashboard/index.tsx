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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "@/components/layout";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext, ProtectRoute } from "../../providers/auth.context";

function Dashboard() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={false} sm={4} md={4} p={8}>
          <h6>Sidebar</h6>
        </Grid>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={8}>
          <h2>Dashboard</h2>
        </Grid>
      </Grid>
    </Layout>
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
