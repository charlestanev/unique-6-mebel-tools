import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// ✅ Use in-memory storage if running on Vercel
let products: any[] = [];

const filePath = path.join(process.cwd(), "data", "products.json");

// Function to read products (only works locally)
function getProducts() {
    if (process.env.VERCEL) {
        return products; // Use in-memory storage on Vercel
    }
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
}

// Function to save products (only works locally)
function saveProducts(updatedProducts: any) {
    if (process.env.VERCEL) {
        products = updatedProducts; // Save in-memory
    } else {
        fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2), "utf-8");
    }
}

// API Route Handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return res.status(200).json(getProducts());
    }

    if (req.method === "POST") {
        const { name, price, description, image, category, subcategory } = req.body;

        if (!name || !price || !description || !image || !category) {
            return res.status(400).json({ message: "Всички полета са задължителни!" });
        }

        const newProduct = {
            id: Date.now().toString(),
            name,
            price,
            description,
            image,
            category,
            subcategory: subcategory || null
        };

        const currentProducts = getProducts();
        currentProducts.push(newProduct);
        saveProducts(currentProducts);

        return res.status(201).json(newProduct);
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Липсва ID на продукта!" });
        }

        const currentProducts = getProducts();
        const updatedProducts = currentProducts.filter((p: any) => p.id !== id);

        if (currentProducts.length === updatedProducts.length) {
            return res.status(404).json({ message: "Продуктът не е намерен!" });
        }

        saveProducts(updatedProducts);
        return res.status(200).json({ message: "Продуктът е изтрит успешно!", id });
    }

    return res.status(405).json({ message: "Методът не е позволен!" });
}
