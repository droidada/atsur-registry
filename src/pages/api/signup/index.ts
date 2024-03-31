import type { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

type Data = {
  success: boolean;
  data?: Object;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
  const {
    body: { token, password },
  } = req;

  try {
    console.log("token he rei s", token);
    console.log("password he rei s", password);

    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const serviceResponse = await axios.post(`${baseUrl}users/invite/accept`, {
      token,
      password,
    });

    resp.status(200).json({ success: true, data: serviceResponse.data });
    return;
  } catch (error) {
    console.error(error.message);
    resp.status(400).json({ success: false });
    return;
  }
};
