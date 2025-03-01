import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/utils/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.json({ authenticated: isAuthenticated(req) });
}
