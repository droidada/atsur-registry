import type { NextApiRequest, NextApiResponse } from "next/types";
import { FileforgeClient } from "@fileforge/client";
import axios from "axios";

const ff = new FileforgeClient({
    apiKey: process.env.NEXT_PUBLIC_FILEFORGE_API_KEY,
});

export default async (req: NextApiRequest, resp: NextApiResponse) =>
{
    try {

    } catch (error) {

    }

};
