import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from "@/components/layout";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
// import axios from "@/lib/axios";
import axios from "axios";
import { Roles } from "@/types/constants";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const useStyles:any = makeStyles((theme:Function) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));

function SignUp() {
  //  const classes = useStyles();
  const signUpSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
    role: string().nonempty("Role is required"),
  });

  type SignUpInput = TypeOf<typeof signUpSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, []);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      setError(false);
      setSuccess(false);
      const resp = await axios.post("/api/invite", {
        email: values.email,
        role: values.role,
      });
      console.log(resp.data);
      //success message
      setLoading(false);
      setSuccess(true);
      //router.push("/");
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setError(true);
    }
  };
  console.log(errors);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 45,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ mt: 1 }}
          >
            {success && (
              <div className="bg-green-300 p-2 mb-5 w-full rounded">
                An email has been sent to your address. Please check your mail
                to login.
              </div>
            )}

            {error && (
              <div className="bg-red-300 p-2 mb-5 text-white rounded">
                Ops something went wrong. Make sure you are entering a valid
                email and try again.
              </div>
            )}

            <TextField
              sx={{ mb: 2 }}
              label="Email"
              fullWidth
              required
              type="email"
              error={!!errors["email"]}
              helperText={errors["email"] ? errors["email"].message : ""}
              {...register("email")}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">What do you do?</InputLabel>
              <Select
                labelId="role"
                id="role"
                label="What do you do"
                error={!!errors["role"]}
                // helperText={errors["role"] ? errors["role"].message : ""}
                {...register("role")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={Roles.ARTIST.toString()}>Artist</MenuItem>
                <MenuItem value={Roles.GALLERY.toString()}>Gallery</MenuItem>
                <MenuItem value={Roles.COLLECTOR.toString()}>
                  Collector
                </MenuItem>
                <MenuItem value={Roles.INSTITUTION.toString()}>
                  Institution (eg. Museum, Collective etc.)
                </MenuItem>
              </Select>
              {errors["role"] && (
                <FormHelperText error={!!errors["role"]}>
                  {errors["role"].message}
                </FormHelperText>
              )}
            </FormControl>

            <LoadingButton
              variant="contained"
              fullWidth
              type="submit"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>

            {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?africanart)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

export default SignUp;
