import { isAddress } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next/types";

export const dynamic = "force-dynamic";

export default async function GET(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      throw new Error("Missing or invalid address");
    }

    if (!isAddress(address)) {
      throw new Error("Invalid Ethereum address");
    }

    // const wallets = await prisma.wallet.findMany({
    //   where: {
    //     signers: {
    //       array_contains: address.toLowerCase(),
    //     },
    //   },
    //   include: {
    //     _count: {
    //       select: {
    //         // transactions: true,
    //       },
    //     },
    //   },
    // });

    return resp.status(200).json({});
  } catch (error) {
    console.error(error);
    return resp.status(200).json({ error });
  }
}
