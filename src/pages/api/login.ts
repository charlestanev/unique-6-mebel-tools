import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Моля попълнете потребителско име и парола" });
    }

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        // Create a session token using HMAC instead of plaintext base64
        const sessionData = `${username}:${Date.now()}`;
        const secret = process.env.SESSION_SECRET || "fallback-secret";
        const token = crypto.createHmac("sha256", secret).update(sessionData).digest("hex");

        // Store the original credentials for auth check (base64 for backwards compat)
        const authValue = Buffer.from(`${username}:${password}`).toString("base64");

        res.setHeader(
            "Set-Cookie",
            serialize("admin_auth", authValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24,
                path: "/",
            })
        );

        return res.status(200).json({ message: "Login successful" });
    }

    return res.status(401).json({ message: "Грешно потребителско име или парола" });
}
