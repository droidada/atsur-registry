import React, { useEffect } from "react";
import { getToken } from "next-auth/jwt";
import { FaEthereum } from "react-icons/fa";
import { MdOutlineChevronRight } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import axios from "@/lib/axios";
import { Transak } from "@transak/transak-sdk";
import { defaultTransakConfig } from "@/lib/utils/transkConfig";
import WalletPages from "@/HOC/WalletPages";
import WalletActivitiesSection from "@/components/dashboard/wallet/dashboard/activities";
import TokenSection from "@/components/dashboard/wallet/dashboard/tokenSection";
import { useToast } from "@/providers/ToastProvider";
import { Button, Card, Stack } from "@mui/material";

export const getServerSideProps = async ({ req, params }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const res = await axios.get(`/user/me`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log(res.data);

    return {
      props: {
        wallet: res?.data?.wallet,
      },
    };
  } catch (error) {
    console.log(error?.response?.data);
    throw new Error(error);
  }
};

const WalletDashboard = ({ wallet }) => {
  console.log(wallet);
  const toast = useToast();
  const transak = new Transak({
    ...defaultTransakConfig,
    walletAddress: wallet?.address,
  });

  const handleCopyToClipboard = () => {
    try {
      navigator.clipboard.writeText(wallet?.address);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDeposit = () => {
    transak.init();
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      toast.success("Deposit successful!");
    });
    Transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, (errorData) => {
      console.error(errorData);
      toast.error("Deposit failed. Please try again.");
    });
  };

  useEffect(() => {
    // Clean up event listeners when the component unmounts
    return () => {
      transak.close();
      // Transak.off(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL);
      // transak.off(transak.EVENTS.TRANSAK_ORDER_FAILED);
    };
  }, []);

  return (
    <Stack spacing={4}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button
          startIcon={<FaEthereum />}
          endIcon={<MdOutlineChevronRight />}
          className="bg-secondary-white text-[19px] font-semibold"
        >
          Ethereum
        </Button>
      </Stack>

      <section className="w-full grid gap-6 px-8 py-9  rounded-[34px] bg-gradient-to-r from-[#61CDCB] to-[#61CD82] text-white">
        <div className="grid gap-3">
          <h2 className="font-semibold text-2xl">Wallet Balance</h2>
          <NumericFormat
            value={0}
            decimalScale={2}
            displayType={"text"}
            thousandSeparator={true}
            fixedDecimalScale
            prefix="$"
            className="text-7xl  font-[300]"
          />
        </div>
        <div className="flex items-end">
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold text-[19px]">Wallet Address</h3>
              <p className="flex items-center gap-2">
                <span>{wallet?.address}</span>{" "}
                <Button
                  onClick={handleCopyToClipboard}
                  className="bg-secondary-white text-xs font-[300] rounded-[25px] text-[19px] "
                >
                  Copy
                </Button>
              </p>
            </div>
            <div className="">
              <h3 className="font-semibold text-[19px]">
                Blockchain explorer url
              </h3>
              <p className="flex items-center gap-2">www.etheruem.com/32343</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              disabled
              className="bg-secondary-white disabled:opacity-50 text-[19px] font-[300] "
            >
              Withdraw
            </Button>
            <Button
              onClick={handleDeposit}
              className="bg-secondary-white text-[19px] font-[300] "
            >
              Deposit
            </Button>
          </div>
        </div>
      </section>

      <WalletActivitiesSection activities={[]} />
      <TokenSection tokens={[]} />
    </Stack>
  );
};

export default WalletPages(WalletDashboard);
