import AuthLayout from "@/components/layout/AuthLayout";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const getServerSideProps = async ({ query }) => {
  const { token } = query;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try {
    const response = await axios.post(`/auth/verify-email/${token}`);

    console.log(response?.data);

    return {
      props: {
        success: true,
        message: response?.data?.message,
      },
    };
  } catch (error) {
    // throw new Error(error);
    console.log(error?.response?.data);
    return {
      props: {
        success: false,
        message:
          error?.response?.data?.error ||
          "An error occurred during email verification",
      },
    };
  }
};
const VerifyEmail = ({ success, message }) => {
  const router = useRouter();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [success, router]);
  return (
    <AuthLayout title="Email Verification">
      <div className="text-center text-sm">
        {success ? (
          <>
            <h2 className="text-sm font-bold  mb-4">
              Email Verification Successful
            </h2>
            <p>{message}</p>
          </>
        ) : (
          <>
            {" "}
            <h2 className="text-sm font-bold  mb-4">
              Email Verification Failed
            </h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
