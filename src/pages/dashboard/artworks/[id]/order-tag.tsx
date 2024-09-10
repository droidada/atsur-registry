import ProtectedPage from "@/HOC/Protected";
import dynamic from "next/dynamic";
import InputField from "@/components/Form/InputField";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import { useToast } from "@/providers/ToastProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { getToken } from "next-auth/jwt";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";
import LoadingButton from "@/components/Form/LoadingButton";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ExistingPdfCertificate from "@/components/Certificate/existing-pdf-certificate";
import AddressModal from "@/components/dashboard/artwork/AddressModal";
import { ShippingAddressType } from "@/types/models/shipingAdress";

const ArtPieceCertificate = dynamic(() => import("@/components/Certificate"), {
  ssr: false,
});

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/verify-artpiece/saved/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    const { data: orderRes } = await axios.get(`/order/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    const { data: defaultAddress } = await axios.get(
      "/shipping-address/default",
      {
        headers: { authorization: `Bearer ${token?.accessToken}` },
      },
    );

    return {
      props: {
        verification: res.data?.data,
        order: orderRes?.data,
        defaultAddress: defaultAddress?.data,
      },
    };
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const OrderRFID = ({ verification, order, defaultAddress }) => {
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const [address, setAddress] = useState<ShippingAddressType | null>(
    defaultAddress,
  );
  console.log(defaultAddress);

  const [openAddressModal, setOpenAddressModal] = useState(false);

  const orderSchema = object({
    address: string().nonempty("Address is required"),
    date: string().nonempty("Date is required"),
  });

  type MetadataInput = TypeOf<typeof orderSchema>;

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: { address: string; date: string }) =>
      axiosAuth.post(`/order`, {
        ...values,
        availableDate: values.date,
        artPieceId: verification?.artPiece?._id,
        addressId: address?._id,
      }),
    onSuccess: () => {
      // toast.success("Order Created");
      router.replace(router.asPath);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    },
  });

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    handleSubmit,
  } = useForm<MetadataInput>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit: SubmitHandler<MetadataInput> = (values) => {
    // @ts-ignore
    mutate(values);
  };

  useEffect(() => {
    setValue("address", address?.address);
  }, [address]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[30px] font-[600]">
        Order Certificate Of Authenticity
      </h2>
      <div className="flex lg:flex-row flex-col gap-4">
        {verification?.artPiece?.existingCOA ? (
          <ExistingPdfCertificate
            coaImg={verification?.artPiece?.existingCOA}
            artPiece={verification?.artPiece}
            signatureImage={verification?.artPiece?.signature}
            qrImage={verification?.artPiece?.qrCode as string}
          />
        ) : (
          <ArtPieceCertificate
            verification={verification}
            signatureImage={verification?.artPiece?.signature}
            qrImage={verification?.artPiece?.qrCode as string}
          />
        )}

        <div className="max-w-[558px]   md:pl-4 w-full">
          {order ? (
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">
                Your order has been completed
              </h2>
              <p className="font-[500]">
                Our representative will reach out to you. Also Note that your
                charges does not cover logistics for the delivery of your
                physical certificate.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div>
                  <InputField
                    disabled
                    control={control}
                    label="Shipping Address"
                    className="bg-transparent"
                    inputClassName="bg-secondary-white"
                    placeholder="No 23 Adekuntu Close, Wuse 2, FCT Abuja"
                    // id={item}
                    name="address"
                    error={!!errors["address"]}
                    helperText={
                      errors["address"] ? errors["address"].message : ""
                    }
                  />
                  <Button
                    onClick={() => setOpenAddressModal(true)}
                    className="italic text-xs"
                  >
                    Add new address
                  </Button>
                </div>
                <InputField
                  control={control}
                  label="Business Day"
                  type="date"
                  className="bg-transparent"
                  inputClassName="bg-secondary-white"
                  placeholder="No 23 Adekuntu Close, Wuse 2, FCT Abuja"
                  // id={item}
                  name="date"
                  error={!!errors["date"]}
                  helperText={errors["date"] ? errors["date"].message : ""}
                />

                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  className="bg-[#00FF94] flex-shrink-0 text-xs w-[151px] h-[46px] text-primary"
                >
                  Complete Order
                </LoadingButton>
              </form>
              <p className="flex justify-end text-xs italic text-right">
                Our representative will reach out to you. Also Note that your
                charges does not cover logistics for the delivery of your
                physical certificate.
              </p>
            </div>
          )}
        </div>
      </div>

      <AddressModal
        setAddress={setAddress}
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
      />
    </div>
  );
};

export default ProtectedPage(OrderRFID);
