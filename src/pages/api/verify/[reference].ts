import type { NextApiRequest, NextApiResponse } from "next/types";
import fetch from "node-fetch";

type Data = {
  success: boolean;
  data?: Object;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
  const {
    query: { reference },
  } = req;

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_TEST_KEY}`,
        },
      },
    );
    const data = await res.json();
    // @ts-ignore
    resp.status(200).json({ success: true, data: data?.data });
  } catch (error) {
    resp.status(400).json({ success: false });
  }
};
