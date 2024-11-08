import React, { useState } from "react";
import SettingsPages from "@/HOC/SettingPages";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RiVipCrownFill } from "react-icons/ri";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import moment from "moment";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/router";
// import { LoadingButton } from "@mui/lab";
import numeral from "numeral";
import LoadingButton from "@/components/Form/LoadingButton";
import InputField from "@/components/Form/InputField";
import CouponCodeForm from "@/components/dashboard/settings/billing/CouponCodeForm";

export const getServerSideProps = async ({ req, params }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const res = await axios.get(`/payment/user-payment`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    return {
      props: {
        paymentDetails: res.data?.payment,
        credits: res.data?.credits,
        invoice: res.data?.invoice,
      },
    };
  } catch (error) {
    console.log(error?.response?.data);
    throw new Error(error);
  }
};

const Billing = ({ paymentDetails, credits, invoice }) => {
  const expiryDate = moment(
    `${paymentDetails?.card_details?.exp_year}-${paymentDetails?.card_details?.exp_month}-01`,
  );

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const axiosAuth = useAxiosAuth();
  const toast = useToast();
  const router = useRouter();

  const { mutate: upgradePlan, isLoading: isUpgrading } = useMutation({
    mutationFn: () =>
      axiosAuth.post("/payment/initialize-transaction-with-plan", {
        interval: "annually",
        planId: paymentDetails?.plan?._id,
      }),
    onSuccess: (data: any) => {
      router.push(data?.data?.transaction?.authorization_url);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      paymentDetails.status == "active"
        ? axiosAuth.post("payment/cancel-subscription", {
            token: paymentDetails?.token,
            code: paymentDetails?.subscription_code,
          })
        : axiosAuth.post("payment/renew-subscription", {
            token: paymentDetails?.token,
            code: paymentDetails?.subscription_code,
          }),
    onSuccess: (data) => {
      router.push(router.asPath);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    },
  });

  return (
    <Stack spacing={2} className="divide-y-[1px] divide-secondary ">
      <h2 className=" text-[17px] leading-[16px] font-[600] b">
        Payment Method
      </h2>

      <Stack className="divide-y-[1px] divide-secondary " spacing={2}>
        {" "}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems="center"
          className="p-2 py-4"
        >
          {paymentDetails?.card_details && (
            <div className="flex gap-4 items-center">
              <div className="w-[92px] h-[91px] bg-secondary "></div>
              <div className="flex flex-col h-full gap-4 justify-between">
                <div>
                  {" "}
                  <h3 className="text-[19px] leading-[16px] capitalize font-semibold ">
                    {paymentDetails?.card_details?.card_type} {""}
                    {paymentDetails?.card_details?.last4.padStart(12, "*")}
                  </h3>
                  <p className="text-xs font-[300] leading-[16px]">
                    Expires {expiryDate.format("MMMM YYYY")}
                  </p>
                </div>
                <p className="font-[300] text-xs leading-[16px]">
                  To remove your payments option, cancel your subscription below
                </p>
                <LoadingButton
                  onClick={() => mutate()}
                  loading={isLoading}
                  className="rounded-[22px] px-2 bg-primary text-white font-normal w-fit text-xm leading-[16px]"
                >
                  {paymentDetails?.status == "active"
                    ? "Cancel Subscription"
                    : "Renew Subscription"}
                </LoadingButton>
              </div>
            </div>
          )}
          <Button
            onClick={() => router.push("/pricing")}
            className="rounded-[22px] px-2 bg-primary text-white font-normal text-xm leading-[16px]"
          >
            {paymentDetails?.card_details ? "Change" : "Upgrage Plan"}
          </Button>
        </Stack>
        <Stack>
          <Stack
            direction={{ xs: "column" }}
            spacing={2}
            justifyContent={"space-between"}
            className="p-2 py-4"
          >
            <div>
              <h2 className="text-[15px] leading-[16px] font-semibold">
                Atsur Credit
              </h2>
              <p className="text-xs leading-[16px]  ">
                You have {credits?.reduce((a, b) => a + b.quantity, 0) || 0}{" "}
                Atsur Credits
              </p>
            </div>
            <div>
              <h2 className="text-[15px] leading-[16px] font-semibold">
                COA credits
              </h2>
              <p className="text-xs leading-[16px]  ">
                You have{" "}
                {credits?.find((c) => c?.item?.sku === "digi-coa")?.quantity ||
                  0}{" "}
                Certificate of Authencity Credits
              </p>
            </div>
            <div>
              <h2 className="text-[15px] leading-[16px] font-semibold">
                Physical COA credits
              </h2>
              <p className="text-xs leading-[16px]  ">
                You have{" "}
                {credits?.find((c) => c.item?.sku === "phy-coa")?.quantity || 0}{" "}
                Physical Certificate of Authencity Credits
              </p>
            </div>
            <div>
              <h2 className="text-[15px] leading-[16px] font-semibold">
                Tokenization Credits
              </h2>
              <p className="text-xs leading-[16px]  ">
                You have{" "}
                {credits?.find((c) => c?.item?.sku === "lazy-tkn")?.quantity ||
                  0}{" "}
                Tokenization Credits
              </p>
            </div>
          </Stack>
          <p className="text-xs leading-[16px]  ">
            The combination of RFID, COA and QR Code credits makes the total
            atsur credits
          </p>
        </Stack>
        <div className="p-2 py-4 grid ">
          <h2 className="text-[15px] leading-[16px] font-semibold">Coupons</h2>
          <CouponCodeForm />
        </div>
        <div className="p-2 py-4 grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-[15px] capitalize leading-[16px] font-semibold">
                {paymentDetails?.plan?.type} Plan
              </h3>
              <Button
                startIcon={<RiVipCrownFill color="#E0AF01" />}
                variant="outlined"
                className="rounded-[26px] px-2 h-[32px] text-xs leading-[16px] font-normal"
              >
                {paymentDetails?.plan?.name || "Free"}
              </Button>
            </div>
            {paymentDetails?.card_details && (
              <>
                {" "}
                <div className="text-[13px] leading-[16px] font-[300]">
                  <p>
                    Next bill on{" "}
                    {moment(paymentDetails?.next_payment_date).format(
                      "DD MMM, YYYY",
                    )}
                  </p>
                  <p>
                    ₦{numeral(paymentDetails?.amount / 100).format("0,0")}/
                    {paymentDetails?.plan_interval}.{/* Visa **** */}
                  </p>
                </div>
                {paymentDetails?.plan_interval !== "annually" && (
                  <button
                    onClick={() => upgradePlan()}
                    className="rounded-[26px] p-2  bg-primary text-white grid place-items-center  text-xs leading-[16px] font-normal"
                  >
                    Switch to yearly (save 16%)
                  </button>
                )}
              </>
            )}
          </div>
          {paymentDetails?.card_type && (
            <>
              {" "}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] leading-[16px] font-semibold">
                    Billing Info
                  </h3>
                </div>
                <div>
                  <p className="text-[12px] leading-[16px] font-[300]">
                    Card Type
                  </p>
                  <p className="text-sm leading-[16px] font-semibold">
                    {paymentDetails?.card_details?.card_type}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] leading-[16px] font-[300]">Bank</p>
                  <p className="text-sm leading-[16px] font-semibold">
                    {paymentDetails?.card_details?.bank}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-end  gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] leading-[16px] font-semibold">
                    {/* Billing Info */}
                  </h3>
                </div>
                <div>
                  <p className="text-[12px] leading-[16px] font-[300]">
                    Expiry
                  </p>
                  <p className="text-sm leading-[16px] font-semibold">
                    {expiryDate.format("MMMM YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] leading-[16px] font-[300]">
                    Card No
                  </p>
                  <p className="text-sm leading-[16px] font-semibold">
                    {paymentDetails?.card_details?.last4.padStart(12, "*")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {paymentDetails?.card_details && (
          <Stack className="p-2 py-4" spacing={4}>
            <h2 className=" text-[15px] leading-[16px] font-[600] ">
              Billing History
            </h2>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Due Date", "Invoice Number", "Amount", "Status"].map(
                      (head) => (
                        <TableCell
                          className="font-bold text-xs leading-[16px] text-primary"
                          key={head}
                        >
                          {head}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice?.map((invoiceData) => (
                    <TableRow key={invoiceData?._id}>
                      <TableCell>
                        {moment(invoiceData?.due_date).format("DD MMM, YYYY")}
                      </TableCell>
                      <TableCell>{invoiceData?.invoiceNumber}</TableCell>
                      <TableCell>
                        ₦{numeral(invoiceData?.amount / 100).format("0,0")}
                      </TableCell>
                      <TableCell>{invoiceData?.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
      </Stack>
      <div className="flex justify-end">
        <Button
          onClick={() => setOpenDeleteModal(true)}
          variant="text"
          className="block text-[#FF0000] font-[400] text-sm"
        >
          Delete Account
        </Button>
      </div>
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </Stack>
  );
};

export default SettingsPages(Billing);

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose }) => {
  const axiosAuth = useAxiosAuth();
  // TODO complete the account deletion function
  // const { mutate } = useMutation({
  //   mutationFn: () => {},
  //   onSuccess: () => {},
  //   onError: () => {},
  // });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent dividers>
        <p>Are you sure you want to delete your account?</p>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onClose}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
