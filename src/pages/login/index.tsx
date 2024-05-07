"use client";
import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import Image from "@/components/common/image";
import { useState, useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";
import { useToast } from "@/providers/ToastProvider";
import axios from "@/lib/axios";
import UnprotectedPage from "@/HOC/Unprotected";
import InputField from "@/components/Form/InputField";

export const getServerSideProps = async ({ req, query, params }) => {
  console.log(query);
  const { token } = query;
  console.log(token);
  if (token) {
    try {
      const res = await axios.post(`/invite/fetch`, {
        token,
      });

      console.log(res.data);

      return { props: { invitationData: res.data?.data } };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } else {
    return { props: {} };
  }
};

function Login({ invitationData }) {
  const [invitee, setInvitee] = useState(invitationData?.invitation?.invitee);
  const loginSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });
  const toast = useToast();

  type LoginInput = TypeOf<typeof loginSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { logIn, user, error: loginError } = useAuthContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setError(false);
    // setSuccess(false);
  }, []);

  useEffect(() => {
    setValue("email", invitee?.email);
  }, [invitee]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    try {
      setLoading(true);

      const usr = await logIn(values.email, values.password);

      console.log("usr is ", usr);
      if (usr?.error) {
        throw usr.error;
      }

      if (usr.ok) {
        invitee
          ? router.replace(`/invitation/${router.query.token}`)
          : router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack
        direction={"column"}
        spacing={4}
        className="mx-auto max-w-[770px] w-full"
      >
        <Stack spacing={2} alignItems={"center"}>
          <h1 className="text-2xl font-[400] md:text-4xl ">Login</h1>
          <h2 className="text-base">
            Get started today by entering just a few details
          </h2>
        </Stack>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="bg-secondary flex flex-col gap-4 w-full py-8 px-6"
        >
          <InputField
            isRequired
            label="Email"
            type="email"
            id="email"
            placeholder="mail@website.com"
            name="email"
            tabIndex={2}
            disabled={invitee?.email ? true : false}
            aria-required="true"
            fullWidth
            error={!!errors["email"]}
            helperText={errors["email"] ? errors["email"].message : ""}
            control={control}
          />
          <InputField
            isRequired
            label="Password"
            type="password"
            id="password"
            placeholder="Min. 8 character"
            name="password"
            tabIndex={2}
            aria-required="true"
            fullWidth
            error={!!errors["password"]}
            helperText={errors["password"] ? errors["password"].message : ""}
            control={control}
          />
          <div className="flex justify-end">
            <Link
              href={"/forgotpassword"}
              className="font-[300] text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-base">
            <LoadingButton
              type="submit"
              loading={loading}
              className="bg-primary text-secondary hover:bg-gray-800"
            >
              Login
            </LoadingButton>
            <p className="text-center">Or Continue</p>
            <div className="flex-col flex gap-4 ">
              <Button
                variant={"outlined"}
                startIcon={
                  <Image src="/assets/images/google.png" alt="google" />
                }
              >
                Sign in with Google
              </Button>
              <Button
                variant={"outlined"}
                startIcon={
                  <Image src="/assets/images/facebook.png" alt="facebook" />
                }
              >
                Sign in with Facebook
              </Button>
              <Button
                variant={"outlined"}
                startIcon={<Image src="/assets/images/apple.png" alt="apple" />}
              >
                Sign in with Apple
              </Button>
            </div>

            <p className="text-center mt-5 ">
              Don&apos;t have an account?{" "}
              <Link className="font-bold hover:underline" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Stack>
    </>
  );
}

export default UnprotectedPage(Login);
