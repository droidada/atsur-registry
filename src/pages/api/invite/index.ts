import type { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";
//import getTokenClientAuth from "../../../lib/auth/tokenIdClient";
import { ROLES_TO_IDS, Roles } from "../../../types/constants";

type Data = {
  success: boolean;
  data?: Object;
};

process.env.DIRECTUS_API_USER_TOKEN;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse<Data>) => {
  const {
    body: { email, role },
  } = req;

  console.log("we have a role emum here ", ROLES_TO_IDS);
  console.log("we have a role id here ", ROLES_TO_IDS[role]);
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const serviceResponse = await axios(`${baseUrl}users/invite`, {
      method: "POST",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${process.env.DIRECTUS_API_USER_TOKEN}`,
      },
      data: {
        email,
        role: ROLES_TO_IDS[role],
        invite_url: `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/signup/password`,
      },
    });

    resp.status(200).json({ success: true, data: serviceResponse.data });
    return;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    resp.status(400).json({ success: false });
    return;
  }
};
