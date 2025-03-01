import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/utils/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    if (!isAuthenticated(req)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, price, description, image, category } = req.body;

    if (!name || !price || !description || !image || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const filePath = path.join(process.cwd(), "data", "products.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    const newProduct = {
        id: Date.now().toString(),
        name,
        price,
        description,
        image,
        category,
    };

    products.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return res.status(201).json({ message: "Product added successfully", product: newProduct });
}
