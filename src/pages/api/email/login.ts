import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next/types";
import SendMail, { MailTemplates } from "../../../lib/email";

dotenv.config();

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { email, newUser } = req.body;
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  const url = `${baseUrl}/${
    newUser === true
      ? `onboarding/select-user-type?email=${email}&newUser=${newUser}`
      : `dashboard?email=${email}`
  }`;

  const actionCodeSettings = {
    url,
    handleCodeInApp: true,
  };

  await SendMail({
    to: email,
    data: {},
    subject: "Login to VTVL",
    templateId: MailTemplates.Login,
  });
  res.status(200).json({ message: "Success!" });
}
