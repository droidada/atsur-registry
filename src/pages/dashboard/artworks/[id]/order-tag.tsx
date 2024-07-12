import ProtectedPage from "@/HOC/Protected";
import ArtPieceCertificate from "@/components/Certificate";
import InputField from "@/components/Form/InputField";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import moment from "moment";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { TypeOf, object, string } from "zod";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/art-piece/${id}`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    return { props: { artPiece: res.data?.artPiece } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const OrderRFID = ({ artPiece }) => {
  const orderSchema = object({
    address: string(),
  });
  type MetadataInput = TypeOf<typeof orderSchema>;

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

  return (
    <Stack spacing={4}>
      <h2 className="text-[30px] font-[600]">
        Order Certificate Of Authenticity
      </h2>
      <Stack className="" direction={["column"]} spacing={4}>
        <div>
          <ArtPieceCertificate
            artPiece={artPiece}
            signatureImage={artPiece?.signature}
            qrImage={artPiece?.qrImage as string}
          />
        </div>
        <Stack spacing={2}>
          <div className="grid gap-2">
            <p className="font-[300] text-[16px]">Shipping Address</p>
            <div className="flex gap-4 items-stretch w-full">
              {["Home", "Office"].map((item, index) => (
                <label
                  key={item}
                  htmlFor={item}
                  className="flex gap-4 w-full p-4 bg-secondary-white items-center"
                >
                  <input
                    type="radio"
                    name="radio"
                    className="checked:bg-[#18BAFF]  outline-secondary-white ring-0 focus:ring-0 border-0 "
                    value={item}
                    id={item}
                  />
                  <div className="flex flex-1 flex-col gap-2 divide-primary divide-y-[1px]">
                    <p className="text-[21px] font-[300]">{item}</p>
                    <div className="">
                      <InputField
                        control={control}
                        label=""
                        className="bg-transparent"
                        inputClassName="bg-transparent"
                        placeholder="No 23 Adekuntu Close, Wuse 2, FCT Abuja"
                        id={item}
                        name="address"
                        error={!!errors["address"]}
                        helperText={
                          errors["address"] ? errors["address"].message : ""
                        }
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <span className="text-[10px] font-[300]">
              Add New Shipping Address
            </span>
          </div>
          <div className="grid gap-2">
            <InputField
              control={control}
              label="Business Day"
              labelClassName="text-[16px] font-[300]"
              className=""
              inputClassName="bg-secondary-white"
              placeholder={moment().format("DD/MM/YYYY")}
              name="address"
              error={!!errors["address"]}
              helperText={errors["address"] ? errors["address"].message : ""}
            />
          </div>

          <div className="grid gap-2">
            <p className="text-[16px] font-[300]">Choose a Payment</p>
            <div className="flex flex-col gap-4  w-full">
              {[
                { title: "Bryce Duffy", img: "/master.png" },
                { title: "Ademola Lukman", img: "/visa.png" },
              ].map((item, index) => (
                <label
                  htmlFor={item.title}
                  key={item.title}
                  className="flex gap-4 w-full p-4 bg-secondary-white items-center"
                >
                  <input
                    type="radio"
                    name="card"
                    id={item.title}
                    className="checked:bg-[#18BAFF]  outline-secondary-white ring-0 focus:ring-0 border-0 "
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[18px] font-[700] ">
                        {item.title}
                      </span>
                      <span className="text-[11px] font-[300] ">
                        **** **** **** 8989
                      </span>
                    </div>
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={58}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex mt-6 gap-6">
            <Button className="bg-[#00FF94] flex-shrink-0 text-xs w-[151px] h-[46px] text-primary">
              Complete Order
            </Button>
            <p className="text-[13px] italic">
              Our representative will reach out to you. Also Note that your
              charges does not cover logistics for the delivery of your physical
              certificate.
            </p>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProtectedPage(OrderRFID);
