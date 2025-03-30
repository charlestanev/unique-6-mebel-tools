import { NextApiRequest } from "next";
import { parse } from "cookie";

if (typeof window === "undefined") {
    const dotenv = require("dotenv-safe");
    dotenv.config();
}

export function isAuthenticated(req: NextApiRequest) {
    const cookies = parse(req.headers.cookie || "");
    if (!cookies.admin_auth) return false;

    const [username, password] = Buffer.from(cookies.admin_auth, "base64")
        .toString()
        .split(":");

    return (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    );
}
