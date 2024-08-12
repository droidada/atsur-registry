import LoadingButton from "@/components/Form/LoadingButton";
import AuthLayout from "@/components/layout/AuthLayout";
import axios from "@/lib/axios";
import { useToast } from "@/providers/ToastProvider";

import { Button, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ConfirmEmail = () => {
  const router = useRouter();
  const { type, email } = router.query;
  const { status } = useSession();
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      signOut();
    }
  }, [status]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => axios.post("/auth/resend-verification-email", { email }),
    onSuccess: () => {
      toast.success(`A verification email has been sent to ${email}`);
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  return (
    <AuthLayout title="Verify Email">
      <Stack spacing={2}>
        <p className="text-sm">
          {type === "new" ? (
            <>
              A verification mail has been sent to your email address{" "}
              <span className="font-bold">{email}</span>
            </>
          ) : (
            <>
              Please check <span className="font-bold">{email}</span> for a
              verification link
            </>
          )}
        </p>
        <p className="text-sm">
          Click the button below to resend the verification mail if you did not
          receive it{" "}
        </p>

        <LoadingButton
          loading={isLoading}
          onClick={() => mutate()}
          className="bg-primary text-sm text-white"
        >
          Resend Verification{" "}
        </LoadingButton>
        <p className="text-sm">
          Use another account.{" "}
          <span className="font-bold">Use another account. Sign In</span>
        </p>
      </Stack>
    </AuthLayout>
  );
};

export default ConfirmEmail;
