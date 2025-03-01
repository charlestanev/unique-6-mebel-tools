import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "products.json");

function getProducts() {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const products = getProducts();
        return res.status(200).json(products);
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        let products = getProducts();
        const updatedProducts = products.filter((p: any) => p.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));

        return res.status(200).json({ message: "Product deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
}
