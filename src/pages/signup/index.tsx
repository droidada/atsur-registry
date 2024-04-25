import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import Image from "@/components/common/image";
import { useState, useEffect } from "react";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import rawAxios from "axios";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";
import UnprotectedPage from "@/HOC/Unprotected";
import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SelectField";
import { count } from "console";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getServerSideProps = async ({ req, query, params }) => {
  console.log(query);
  const { token } = query;
  const { data } = await rawAxios.get(
    `https://restcountries.com/v3.1/all?fields=name,cca2`,
  );

  const currentCountries = ["nigeria", "kenya", "ghana", "south africa"];

  const countries = await data
    ?.map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((country) =>
      currentCountries?.includes(country.name?.toLowerCase()),
    );

  if (token) {
    try {
      const res = await axios.post(`/invite/fetch`, {
        token,
      });

      console.log(res.data);

      return { props: { invitationData: res.data?.data, countries } };
    } catch (error) {
      throw new Error(error);
    }
  } else {
    return {
      props: {
        countries,
      },
    };
  }
};

function SignUp({ invitationData, countries }) {
  const signUpSchema = object({
    firstName: string().nonempty("First name is required"),
    lastName: string().nonempty("Last name is required"),
    email: string().nonempty("Email is required").email("Email is invalid"),
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
  const [invitee, setInvitee] = useState(invitationData?.invitation?.invitee);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const token = router.query.token;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const toast = useToast();
  type SignUpInput = TypeOf<typeof signUpSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    control,
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    setValue("firstName", invitee?.firstName);
    setValue("lastName", invitee?.lastName);
    setValue("email", invitee?.email);
  }, [invitee]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      const resp = await axios.post(`${pubAPI}/auth/register`, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword,
        username: values.email,
        inviteToken: token,
      });
      console.log(resp.data);
      //success message
      toast.success("Account created successfully");
      //redirect to login page

      setSuccess(true);
      invitee ? router.push(`/login?token=${token}`) : router.push("/login");
    } catch (error) {
      console.error(error.message);
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
          <h1 className="text-2xl font-[400] md:text-4xl ">
            Create Your Account
          </h1>
          <h2 className="text-base">
            Let&apos;s get started with your 30 days free trial
          </h2>
        </Stack>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="bg-secondary flex flex-col gap-4 w-full py-8 px-6"
        >
          <InputField
            label="First Name"
            isRequired
            type="text"
            id="firstName"
            placeholder="John"
            name="firstName"
            tabIndex={2}
            aria-required="true"
            fullWidth
            error={!!errors["firstName"]}
            helperText={errors["firstName"] ? errors["firstName"].message : ""}
            control={control}
          />
          <InputField
            label="Last Name"
            isRequired
            type="text"
            id="lastName"
            placeholder="Doe"
            name="lastName"
            tabIndex={2}
            aria-required="true"
            fullWidth
            error={!!errors["lastName"]}
            helperText={errors["lastName"] ? errors["lastName"].message : ""}
            control={control}
          />
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

          <SelectField isRequired label="Country" fullWidth>
            <MenuItem selected value={""} disabled>
              Select a country
            </MenuItem>

            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </SelectField>

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
          <InputField
            isRequired
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            name="confirmPassword"
            tabIndex={2}
            aria-required="true"
            fullWidth
            error={!!errors["confirmPassword"]}
            helperText={
              errors["confirmPassword"] ? errors["confirmPassword"].message : ""
            }
            control={control}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="I agree to all Terms, Privacy Policy and fees"
          />

          <div className="flex flex-col gap-3 text-base">
            <LoadingButton
              type="submit"
              loading={loading}
              className="bg-primary text-secondary hover:bg-gray-800"
            >
              Sign Up
            </LoadingButton>
            <p className="text-center">Or Continue</p>
            <div className="flex-col flex gap-4 ">
              <Button
                variant={"outlined"}
                startIcon={
                  <Image src="/assets/images/google.png" alt="google" />
                }
              >
                Sign up with Google
              </Button>
              <Button
                variant={"outlined"}
                startIcon={
                  <Image src="/assets/images/facebook.png" alt="facebook" />
                }
              >
                Sign up with Facebook
              </Button>
              <Button
                variant={"outlined"}
                startIcon={<Image src="/assets/images/apple.png" alt="apple" />}
              >
                Sign up with Apple
              </Button>
            </div>

            <p className="text-center mt-5 ">
              Don&apos;t have an account?{" "}
              <Link className="font-bold hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Stack>
    </>
  );
}

export default UnprotectedPage(SignUp);
