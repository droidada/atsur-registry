import { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";
import axios from "@/lib/axios";
import InputField from "@/components/Form/InputField";
import UnprotectedPage from "@/HOC/Unprotected";
import AuthLayout from "@/components/layout/AuthLayout";
import LoadingButton from "@/components/Form/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

function ForgotPassword() {
  const forgotPasswordSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
  });

  type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;

  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [error, setError] = useState(false);
  const { logIn, user, error: forgotPasswordError } = useAuthContext();

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

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: { email: string }) =>
      axios.post(`/auth/forgot-password`, data),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Password reset link sent to your email");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.errors ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = async (
    values,
  ) => {
    mutate({ email: values.email });
  };

  return (
    <AuthLayout
      titleIsCenter
      title="Forgot Password"
      image="/images/artsur-register.png"
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <InputField
          label="Email"
          type="email"
          hasBorder
          sx={{
            "& fieldset": { borderRadius: "100px", borderColor: "black" },
            borderColor: "black",
          }}
          id="email"
          placeholder="mail@website.com"
          name="email"
          tabIndex={2}
          aria-required={true}
          fullWidth
          error={!!errors["email"]}
          helperText={errors["email"] ? errors["email"].message : ""}
          control={control}
        />

        <div className="flex flex-col gap-3 text-base">
          <LoadingButton
            type="submit"
            loading={isLoading}
            className="bg-primary text-secondary hover:bg-gray-800"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
