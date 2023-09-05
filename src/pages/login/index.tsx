import { useEffect, useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Typography, Container, styled, TextField } from "@mui/material";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import Layout from "@/components/layout";
import directus from "@/lib/directus";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8%;
`
);

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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    try {
      console.log(values);
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: `/`,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  console.log(errors);

  return (
    <Layout>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Container maxWidth="sm">
              <Box
                sx={{ maxWidth: "30rem" }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <Typography variant="h4" component="h1" sx={{ mb: "2rem" }}>
                  Login
                </Typography>

                {error && (
                  <div className="bg-red-300 p-2 text-white rounded">
                    Wrong email or password
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
                <TextField
                  sx={{ mb: 2 }}
                  label="Password"
                  fullWidth
                  required
                  type="password"
                  error={!!errors["password"]}
                  helperText={
                    errors["password"] ? errors["password"].message : ""
                  }
                  {...register("password")}
                />

                <LoadingButton
                  variant="contained"
                  fullWidth
                  type="submit"
                  loading={loading}
                  sx={{ py: "0.8rem", mt: "1rem" }}
                >
                  Login
                </LoadingButton>
              </Box>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
