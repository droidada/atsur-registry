import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getTokenClientAuth from "../../../../lib/auth/tokenIdClient";

type Data = {
  success: boolean;
  data?: Object;
};
const baseUrl = "";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
  try {
    const serviceResponse = await axios(baseUrl, {
      method: "POST",
      headers: {
        ContentType: "text/plain",
        Authorization: await getTokenClientAuth(),
      },
      data: {},
      timeout: 3000,
    });

    resp.status(200).json({ success: true, data: serviceResponse.data });
  } catch (error) {
    resp.status(400).json({ success: false });
  }
};
