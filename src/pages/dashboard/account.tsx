import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Box,
  Button,
  Container,
  Stack,
  CardHeader,
  Typography,
  Divider,
  TextField,
  Avatar,
} from "@mui/material";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";
import ProtectedPage from "@/HOC/Protected";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

function Account() {
  const loginSchema = object({
    first_name: string().nonempty("First name is required"),
    last_name: string().nonempty("Last name is required"),
    description: string().nonempty("Bio is required"),
    phoneNumber: string().nonempty("Phone Number is required"),
    email: string().nonempty("Email is required").email("Email is invalid"),
  });

  type LoginInput = TypeOf<typeof loginSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { logIn } = useAuthContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
    // <DashboardLayout>
    //   <Box
    //     component="main"
    //     sx={{
    //       flexGrow: 1,
    //       py: 0,
    //     }}
    //   >
    //     <Container maxWidth="lg">
    //       <Stack spacing={3}>
    //         <div>
    //           <Typography>Account</Typography>
    //         </div>
    //         <div>
    //           <Grid container spacing={3}>
    //             <Grid item xs={12} md={6} lg={3}>
    //               <Card>
    //                 <CardContent>
    //                   <Box
    //                     sx={{
    //                       alignItems: "center",
    //                       display: "flex",
    //                       flexDirection: "column",
    //                     }}
    //                   >
    //                     <Avatar
    //                       src={user.avatar}
    //                       sx={{
    //                         height: 80,
    //                         mb: 2,
    //                         width: 80,
    //                       }}
    //                     />
    //                     <Typography gutterBottom variant="h5">
    //                       {user.name}
    //                     </Typography>
    //                     <Typography color="text.secondary" variant="body2">
    //                       {user.city} {user.country}
    //                     </Typography>
    //                     <Typography color="text.secondary" variant="body2">
    //                       {user.timezone}
    //                     </Typography>
    //                   </Box>
    //                 </CardContent>
    //                 <Divider />
    //                 <CardActions>
    //                   <Button fullWidth variant="text">
    //                     Upload picture
    //                   </Button>
    //                 </CardActions>
    //               </Card>
    //             </Grid>
    //             <Grid item xs={12} md={6} lg={9}>
    //               <Box
    //                 component="form"
    //                 autoComplete="off"
    //                 noValidate
    //                 onSubmit={handleSubmit(onSubmitHandler)}
    //                 // onSubmit={handleSubmit}
    //               >
    //                 <Card>
    //                   <CardHeader
    //                     subheader="The information can be edited"
    //                     title="Profile"
    //                   />
    //                   <CardContent sx={{ pt: 1 }}>
    //                     <Box
    //                       display="grid"
    //                       gridTemplateColumns="repeat(12, 1fr)"
    //                       gap={1}
    //                       sx={{ mt: 5 }}
    //                     >
    //                       <Box gridColumn="span 6">
    //                         <TextField
    //                           label="First Name"
    //                           fullWidth
    //                           required
    //                           type="text"
    //                           error={!!errors["first_name"]}
    //                           helperText={
    //                             errors["first_name"]
    //                               ? errors["first_name"].message
    //                               : ""
    //                           }
    //                           {...register("first_name")}
    //                         />
    //                       </Box>
    //                       <Box gridColumn="span 6">
    //                         <TextField
    //                           label="Last Name"
    //                           fullWidth
    //                           required
    //                           type="text"
    //                           error={!!errors["last_name"]}
    //                           helperText={
    //                             errors["last_name"]
    //                               ? errors["last_name"].message
    //                               : ""
    //                           }
    //                           {...register("last_name")}
    //                         />
    //                       </Box>
    //                       <Box gridColumn="span 6">
    //                         <TextField
    //                           label="Email"
    //                           fullWidth
    //                           type="email"
    //                           error={!!errors["email"]}
    //                           helperText={
    //                             errors["email"] ? errors["email"].message : ""
    //                           }
    //                           {...register("email")}
    //                         />
    //                       </Box>
    //                       <Box gridColumn="span 6">
    //                         <TextField
    //                           label="Phone"
    //                           fullWidth
    //                           type="phone"
    //                           error={!!errors["phoneNumber"]}
    //                           helperText={
    //                             errors["phoneNumber"]
    //                               ? errors["phoneNumber"].message
    //                               : ""
    //                           }
    //                           {...register("phoneNumber")}
    //                         />
    //                       </Box>
    //                       <Box gridColumn="span 12">
    //                         <TextField
    //                           sx={{ mb: 2 }}
    //                           label="Bio"
    //                           fullWidth
    //                           multiline
    //                           rows={4}
    //                           type="text"
    //                           error={!!errors["description"]}
    //                           helperText={
    //                             errors["description"]
    //                               ? errors["description"].message
    //                               : ""
    //                           }
    //                           {...register("description")}
    //                         />
    //                       </Box>
    //                     </Box>
    //                   </CardContent>
    //                   <Divider />
    //                   <CardActions sx={{ justifyContent: "flex-end" }}>
    //                     {/* <Button variant="contained">
    //                     Save details
    //                     </Button> */}
    //                     <LoadingButton
    //                       variant="contained"
    //                       type="submit"
    //                       loading={loading}
    //                       // sx={{ py: 2 }}
    //                     >
    //                       Save details
    //                     </LoadingButton>
    //                   </CardActions>
    //                 </Card>
    //               </Box>
    //             </Grid>
    //           </Grid>
    //         </div>
    //       </Stack>
    //     </Container>
    //   </Box>
    // </DashboardLayout>
  );
}

Account.requireAuth = true;
export default ProtectedPage(Account);
