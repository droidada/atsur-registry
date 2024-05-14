import { isAddress } from "ethers/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next/types";

export const dynamic = "force-dynamic";
// export type TransactionWithSignatures = transaction & {
//   signatures: transaction_signature[];
//   wallet: wallet;
//   pendingSigners: string[];
// };

export async function GET(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      throw new Error("Missing or invalid wallet address");
    }

    if (!isAddress(walletAddress)) {
      throw new Error("Invalid Ethereum address");
    }

    // const transactions = await prisma.transaction.findMany({
    //   where: {
    //     wallet: {
    //       //  address: walletAddress,
    //     },
    //   },
    //   include: {
    //     transaction_signature_transaction_signature_transactionTotransaction:
    //       true,
    //     wallet_transaction_walletTowallet: true,
    //   },
    //   orderBy: {
    //     txHash: {
    //       sort: "asc",
    //       nulls: "first",
    //     },
    //   },
    // });

    // const augmentedTransactions: TransactionWithSignatures[] = transactions.map(
    //   (transaction) => {
    //     const pendingSigners = transaction.wallet.signers.filter(
    //       (signer) =>
    //         !transaction.signatures.find(
    //           (signature) => signature.signerAddress === signer,
    //         ),
    //     );

    //     return {
    //       ...transaction,
    //       pendingSigners,
    //     };
    //   },
    // );

    //return NextResponse.json({ transactions: augmentedTransactions });
    return resp.status(200).json({ success: "yes" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error });
  }
}
