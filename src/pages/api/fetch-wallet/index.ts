import { isAddress } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next/types";

export const dynamic = "force-dynamic";
export default async function GET(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      throw new Error("Missing or invalid address");
    }

    if (!isAddress(walletAddress)) {
      throw new Error("Invalid Ethereum address");
    }

    // const wallet = await prisma.wallet.findFirst({
    //   where: {
    //     address: walletAddress,
    //   },
    // });

    return resp.status(200).json({});
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error });
  }
}
