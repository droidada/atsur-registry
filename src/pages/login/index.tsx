import { useState, useEffect } from "react";
import { getCsrfToken } from "next-auth/react";
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
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";
import bg from "assets/image6.png";

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

function Login() {
  const loginSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
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
  const { logIn, user } = useAuthContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    try {
      console.log(values);
      await logIn(values.email, values.password);
      setLoading(false);
      if (!user?.isProfileSetup) {
        router.replace("/profile/setup");
        return;
      }
      router.replace("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  console.log(errors);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 45,
            mx: 4,
            p: 5,
            px: 22,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" sx={{ p: 1 }}>
            Welcome Back
          </Typography>
          <Typography component="p" sx={{ p: 1, mb: 5, mt: -2 }}>
            Sign in to have access to your art
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
                Wrong email or password
              </div>
            )}

            <TextField
              // className="border border-[#D5D6DE] rounded-lg p-2 w-[441px] px-[14px] py-[12px"
              sx={{ mb: 2 }}
              label="Email"
              fullWidth
              required
              type="email"
              error={!!errors["email"]}
              helperText={errors["email"] ? errors["email"].message : ""}
              {...register("email")}
            />
            <TextField
              // className="border border-[#D5D6DE] rounded-lg p-2 w-[441px] px-[14px] py-[12px"
              sx={{ mb: 2 }}
              label="Password"
              fullWidth
              required
              type="password"
              error={!!errors["password"]}
              helperText={errors["password"] ? errors["password"].message : ""}
              {...register("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              // className="w-fit cursor-pointer rounded-lg px-[12px] py-[8px] text-center bg-black text-white"
              variant="contained"
              fullWidth
              type="submit"
              loading={loading}
              sx={{ mt: 3, mb: 2, p: 2 }}
            >
              Login
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
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
        md={6}
        sx={{
          backgroundImage: `url(${bg.src})`,
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

export default Login;
