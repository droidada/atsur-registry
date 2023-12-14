import { prisma } from "@/lib/utils/db";
import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function POST(req: NextApiRequest, resp:NextApiResponse ) {
  try {
    const { signature, signerAddress, transactionId } = await req.body;

    await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        transaction_signature_transaction_signature_transactionTotransaction: {
          create: {
            signature,
            signer_address: signerAddress.toLowerCase(),
          },
        },
      },
    });

    return resp.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error });
  }
}
