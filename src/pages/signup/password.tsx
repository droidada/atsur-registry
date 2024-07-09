import { useState, useEffect } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from "@/components/layout/layout";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import { LoadingButton } from "@mui/lab";

// import axios from "@/lib/axios";
import axios from "axios";
import ConfirmationDialog from "@/components/signup/confirmation-dialog";
import LoadingButton from "@/components/Form/LoadingButton";

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

function SignUpPassword() {
  const signUpSchema = object({
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: string().nonempty("Confirm password is required"),
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

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
  const [error, setError] = useState(false);
  const [tokenParam, setTokenParam] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    setTokenParam(token?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      await axios.post("/api/signup", {
        token: tokenParam,
        password: values.password,
      });
      //success message
      setLoading(false);
      setOpen(true);
      //router.push("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleConfirm = (confirmed: boolean) => {
    setOpen(false);

    if (confirmed) {
      router.push("/login");
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
            Sign in
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ mt: 1 }}
          >
            {error && (
              <div className="bg-red-300 p-2 text-white rounded">
                Something happened. Please try again.
              </div>
            )}

            <TextField
              sx={{ mb: 2 }}
              label="Password"
              fullWidth
              required
              type="password"
              error={!!errors["password"]}
              helperText={errors["password"] ? errors["password"].message : ""}
              {...register("password")}
            />
            <TextField
              sx={{ mb: 2 }}
              label="Confirm Password"
              fullWidth
              required
              type="password"
              error={!!errors["confirmPassword"]}
              helperText={
                errors["confirmPassword"]
                  ? errors["confirmPassword"].message
                  : ""
              }
              {...register("confirmPassword")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              // color="secondary"
              variant="contained"
              // fullWidth
              type="submit"
              loading={loading}
              // sx={{ mt: 3, mb: 2 }}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
            <ConfirmationDialog
              id="ringtone-menu"
              keepMounted
              open={open}
              onConfirm={handleConfirm}
              showCancel={false}
              content={
                <>
                  <h6>
                    Congratulations you have successfully been registered.
                  </h6>
                  <h6>Please login to continue using your account.</h6>
                </>
              }
            />
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
//   const {
//     params: { token },
//   } = context;

//   console.log("we have token on client side here pls ", token )
//   return {
//     props: {
//       token,
//     },
//   };
// }

export default SignUpPassword;
