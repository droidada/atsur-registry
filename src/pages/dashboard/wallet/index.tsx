import WalletPages from "@/HOC/WalletPages";
import WalletActivitiesSection from "@/components/dashboard/wallet/dashboard/activities";
import TokenSection from "@/components/dashboard/wallet/dashboard/tokenSection";
import axios from "@/lib/axios";
import { useToast } from "@/providers/ToastProvider";
import { Button, Card, Stack } from "@mui/material";
import { getToken } from "next-auth/jwt";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import { MdOutlineChevronRight } from "react-icons/md";
import { NumericFormat } from "react-number-format";

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

  const handleCopyToClipboard = () => {
    try {
      navigator.clipboard.writeText(wallet?.address);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };
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
            value={324654}
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
            <Button className="bg-secondary-white text-[19px] font-[300] ">
              Withdraw
            </Button>
            <Button className="bg-secondary-white text-[19px] font-[300] ">
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
