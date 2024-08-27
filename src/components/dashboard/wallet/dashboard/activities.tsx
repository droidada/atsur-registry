import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  activities: any[];
}
const WalletActivitiesSection: React.FC<Props> = ({ activities }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const axiosAuth = useAxiosAuth();

  const { data, isLoading } = useQuery({
    queryFn: () => axiosAuth.get("/transaction"),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return (
    <Stack spacing={4}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="flex gap-4">
          {["Inflow", "Outflow"].map((tab, index) => (
            <Button
              key={index}
              onClick={() => setCurrentTab(index)}
              variant="text"
              className={`${
                currentTab === index ? "font-bold" : "font-normal"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </Stack>

      <Stack spacing={2}>
        {data?.data?.transactions?.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-5">
            <Image
              src={"/images/empty-wallet.svg"}
              width={150}
              height={150}
              alt="empty"
            />
            <p className="italic font-[300] text-center">
              Your Wallet is empty
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.data?.transactions?.map((transaction) => (
              <div key={transaction._id} className="bg-[#F3F3F3] p-4"></div>
            ))}
          </div>
        )}
      </Stack>
    </Stack>
  );
};

export default WalletActivitiesSection;
