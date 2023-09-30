import type { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

type Data = {
  success: boolean;
  data?: Object;
};
const baseUrl = "";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
  try {
    resp.status(200).json({ success: true });
  } catch (error) {
    resp.status(400).json({ success: false });
  }
};
