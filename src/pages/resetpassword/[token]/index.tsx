import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../providers/auth.context";
import axios from "@/lib/axios";
import InputField from "@/components/Form/InputField";
import UnprotectedPage from "@/HOC/Unprotected";
import AuthLayout from "@/components/layout/AuthLayout";
import LoadingButton from "@/components/Form/LoadingButton";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

function ResetPassword() {
  const resetPasswordPasswordSchema = object({
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });

  type ResetPasswordInput = TypeOf<typeof resetPasswordPasswordSchema>;

  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { logIn, user, error: resetPasswordPasswordError } = useAuthContext();

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

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = async (values) => {
    const token = router.query.token;
    try {
      setLoading(true);
      console.log(values);
      const usr = await axios.post(`${pubAPI}/auth/reset-password/${token}`, {
        password: values.password,
        confirm: values.confirmPassword,
      });

      console.log("usr is ", usr);
      console.log("resetPasswordPassword user is ", values);

      setLoading(false);
      if (usr.status) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleIsCenter
      title="Reset Password"
      image="/images/artsur-register.png"
    >
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className=" flex flex-col gap-4 "
      >
        <InputField
          isRequired
          label="Password"
          type="password"
          id="password"
          placeholder="Min. 8 character"
          name="password"
          tabIndex={2}
          aria-required="true"
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
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
          placeholder="Min. 8 character"
          name="confirmPassword"
          tabIndex={2}
          aria-required="true"
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
          fullWidth
          error={!!errors["confirmPassword"]}
          helperText={
            errors["confirmPassword"] ? errors["confirmPassword"].message : ""
          }
          control={control}
        />

        <div className="flex flex-col gap-3 text-base">
          <LoadingButton
            type="submit"
            loading={loading}
            className="bg-primary text-secondary hover:bg-gray-800"
          >
            Reset Password
          </LoadingButton>
        </div>
      </form>
    </AuthLayout>
  );
}

export default UnprotectedPage(ResetPassword);
