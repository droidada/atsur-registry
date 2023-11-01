import { useEffect } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import DashboardLayout from "@/components/dashboard-layout";

function Settings() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">Settings</Typography>
            <Box>
              <Card>
                <CardHeader
                  subheader="Manage the notifications"
                  title="Notifications"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={2} px={5}>
                    <Grid xs={12} sm={6} md={4}>
                      <Stack spacing={1}>
                        <Stack>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Email"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Push Notifications"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Text Messages"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Phone calls"
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                      <Stack spacing={1}>
                        <Typography variant="h6">Messages</Typography>
                        <Stack>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Email"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Push Notifications"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Phone calls"
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button variant="contained">Save</Button>
                </CardActions>
              </Card>
            </Box>
            <Box>
              <Card>
                <CardHeader subheader="Update password" title="Password" />
                <Divider />
                <CardContent>
                  <Stack spacing={3} sx={{ maxWidth: 400 }}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <TextField
                      fullWidth
                      label="Password (Confirm)"
                      name="confirm"
                      type="password"
                    />
                  </Stack>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button variant="contained">Update</Button>
                </CardActions>
              </Card>
            </Box>
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
}

Settings.requiredAuth = true;
export default Settings;
