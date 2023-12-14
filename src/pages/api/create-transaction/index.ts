import { prisma } from "@/lib/utils/db";
import { isAddress } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function POST(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const {
      walletAddress,
      userOp,
      signerAddress,
      signature,
      walletId,
    }: {
      walletAddress: string;
      userOp: string;
      signerAddress: string;
      signature: string;
      walletId: number;
    } = req.body;

    if (!isAddress(walletAddress)) throw new Error("Invalid walletAddress");

    // await prisma.transaction.create({
    //   data: {
    //     wallet: {
    //       connect: {
    //         address: walletAddress,
    //         //walletId: walletId
    //       },
    //     },
    //     userOp,
    //     signatures: {
    //       create: {
    //         signature,
    //         signerAddress: signerAddress.toLowerCase(),
    //       },
    //     },
    //   },
    // });

    return resp.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error });
  }
}
