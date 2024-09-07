import React from "react";
import UnprotectedPage from "@/HOC/Unprotected";
import { getToken } from "next-auth/jwt";
import { axiosAuth as axios } from "@/lib/axios";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ req, params, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const { trxref, reference } = query;

    if (!trxref) {
      throw new Error("trxref is required");
    }

    console.log("This is trxref", trxref);

    const res = await axios.post(
      `/payment/verify`,
      { paymentCode: reference },
      {
        headers: { authorization: `Bearer ${token?.accessToken}` },
      },
    );

    console.log(res.data);

    return { props: { paymentDetails: res.data } };
  } catch (error) {
    console.log(error?.response?.data);
    throw new Error(error);
  }
};
const PaymentVerificationPage = ({ paymentDetails }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="max-w-md w-full bg-secondary h-[250px] p-4">
        <h1 className="text-center text-xl  font-bold">Payment Verification</h1>

        <div className="flex flex-col gap-4 my-5 items-center justify-center">
          {/* {paymentDetails?.paymentStatus ===} */}
          {/* <h3 className="text-center text-xl font-bold">
            Payment Status:{" "}
            {paymentDetails?.paymentStatus === "success" ? "Success" : "Failed"}
          </h3> */}
          <p className="text-center ">
            {paymentDetails?.paymentStatus == "success"
              ? "Congratulation your payment was successful"
              : "Sorry your payment has failed"}
          </p>
          {paymentDetails?.paymentStatus == "success" ? (
            <FaCheck className="text-green-500 text-4xl" />
          ) : (
            <IoMdClose className="text-red-500 text-4xl" />
          )}
        </div>
        <Button
          onClick={() =>
            paymentDetails?.paymentStatus == "success"
              ? router.replace("/dashboard/settings/billing")
              : router.replace("/pricing")
          }
          className="w-full bg-primary text-white font-[400]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UnprotectedPage(PaymentVerificationPage);
