import { Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  tokens: any[];
}

const TokenSection: React.FC<Props> = ({ tokens }) => {
  return (
    <Stack spacing={4}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
      >
        <h2 className="text-2xl font-bold">Tokens</h2>
      </Stack>

      <Stack spacing={2}>
        {tokens.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-5">
            <Image
              src={"/images/empty-wallet.svg"}
              width={150}
              height={150}
              alt="empty"
            />
            <p className="italic font-[300] text-center">Your token is empty</p>
          </div>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default TokenSection;
