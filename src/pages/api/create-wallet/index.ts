import { walletFactoryContract } from "@/lib/utils/getContracts";
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function POST(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const { signers, userId }: { signers: string[]; userId: string } = req.body;
    const salt = "0x" + randomBytes(32).toString("hex");

    const walletAddress = await walletFactoryContract.getAddress(signers, salt);

    // const response = await prisma.wallet.create({
    //   data: {
    //     user: userId,
    //     salt: salt,
    //     signers: signers.map((s) => s.toLowerCase()),
    //     isDeployed: false,
    //     address: walletAddress,
    //   },
    // });

    return resp.status(200).json({});
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error });
  }
}
