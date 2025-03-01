import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "products.json");

// Function to read products
function getProducts() {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
}

// Function to save products
function saveProducts(products: any) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
}

// API Route Handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const products = getProducts();
        return res.status(200).json(products);
    }

    if (req.method === "POST") {
        const { name, price, description, image, category, subcategory } = req.body;

        if (!name || !price || !description || !image || !category) {
            return res.status(400).json({ message: "Всички полета са задължителни!" });
        }

        const products = getProducts();
        const newProduct = {
            id: Date.now().toString(),
            name,
            price,
            description,
            image,
            category,
            subcategory: subcategory || null
        };

        products.push(newProduct);
        saveProducts(products);

        return res.status(201).json(newProduct);
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Липсва ID на продукта!" });
        }

        let products = getProducts();
        const updatedProducts = products.filter((p: any) => p.id !== id);

        if (products.length === updatedProducts.length) {
            return res.status(404).json({ message: "Продуктът не е намерен!" });
        }

        saveProducts(updatedProducts);
        return res.status(200).json({ message: "Продуктът е изтрит успешно!", id });
    }


    return res.status(405).json({ message: "Методът не е позволен!" });
}
