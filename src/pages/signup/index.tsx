import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import Image from "@/components/common/image";
import { useState, useEffect } from "react";
import { object, string, boolean, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import rawAxios from "axios";
import { useToast } from "@/providers/ToastProvider";

import InputField from "@/components/Form/InputField";
import SelectField from "@/components/Form/SelectField";
import AuthLayout from "@/components/layout/AuthLayout";
import { FaLinkedin } from "react-icons/fa";
import LoadingButton from "@/components/Form/LoadingButton";

import { signIn, useSession } from "next-auth/react";

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
    country: string().optional(),
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: string().nonempty("Confirm password is required"),
    agree: boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );

  console.log(countries);

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

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      toast.success("You have successfully logged in!");
      console.log("session info here =======>>", session);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }
  }, [session]);

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

      const country = countries?.find(
        (country) => country.name === values.country,
      );
      const resp = await axios.post(`${pubAPI}/auth/register`, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword,
        username: values.email,
        inviteToken: token,
        country,
      });
      console.log(resp.data);
      //success message
      toast.success("Account created successfully");
      //redirect to login page

      setSuccess(true);
      invitee
        ? router.push(`/login?token=${token}`)
        : router.push(`/confirm-email?email=${values.email}&type=new`);
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
    <AuthLayout
      titleIsCenter
      title="Get Started"
      image="/images/artsur-register.png"
    >
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className=" flex flex-col gap-4 w-full "
      >
        <div className="flex md:flex-row flex-col gap-2 ">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="rounded-[100px] text-[15px] flex justify-center items-center  w-full gap-2   h-[43px] flex-shrink-0 font-[300] leading-[17px] border-[1px] border-secondary"
          >
            <Image
              src="/assets/images/google.png"
              height={20}
              width={20}
              alt="google"
            />
            <span> Sign in with Google</span>
          </button>
        </div>
        <p className="text-center my-4 text-[15px] leading-[16px] flex gap-2 items-center">
          <span className="h-[1px] bg-secondary w-full " />
          <span>Or</span>
          <span className="h-[1px] bg-secondary w-full " />
        </p>

        <InputField
          label="First Name"
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
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
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
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
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
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
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
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
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="Min. 8 character"
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
        <SelectField
          // @ts-ignore
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
          label="Country"
          name="country"
          tabIndex={2}
          aria-required="true"
          fullWidth
          control={control}
        >
          {countries?.map((country, index) => (
            <MenuItem value={country?.name} key={index}>
              {country?.name}
            </MenuItem>
          ))}
        </SelectField>

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              id="agree"
              tabIndex={2}
              aria-required="true"
              {...register("agree")}
              color="primary"
            />
          }
          sx={{
            display: "flex",
            alignItems: "flex-start",
            margin: 0,
            gap: 0.5,
            "& .MuiCheckbox-root": {
              padding: 0,
            },
            "& .MuiTypography-root": {
              fontSize: 12,
            },
          }}
          label={
            <p className="flex gap-1  text-[14px] leading-[19px] md:text-[12px]">
              I agree to the
              <Link
                href="/terms-of-service"
                target="_blank"
                className="underline text-blue-600"
              >
                Terms and Conditions
              </Link>
              and
              <Link
                href="/privacy-policy"
                target="_blank"
                className="underline text-blue-600"
              >
                Privacy Policy
              </Link>
            </p>
          }
        />
        {errors["agree"] && (
          <p className="text-red-600 text-[12px]">{errors["agree"].message}</p>
        )}

        <LoadingButton
          type="submit"
          loading={loading}
          fullWidth
          variant="contained"
          // disableElevation
          sx={{
            borderRadius: "100px",
            color: "white",
            fontSize: "14px",
            lineHeight: "18px",
            textTransform: "none",
            height: "45px",
            fontWeight: 300,
            backgroundColor: "#1C1D36",
            "&:hover": {
              backgroundColor: "#1C1D36",
              color: "white",
            },
          }}
        >
          Create an account
        </LoadingButton>
        {error && (
          <p className="text-red-500 text-center text-[12px]">
            Something went wrong. Please try again.
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center text-[12px]">
            Account created successfully. Redirecting to login...
          </p>
        )}
        <p className="text-center text-[14px] md:text-[12px] leading-[19px] md:leading-[18px] mt-4">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignUp;
