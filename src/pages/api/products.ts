import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "data", "products.json");

// Функция за четене на текущите продукти
function getProducts() {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
}

// Функция за записване на продукти в JSON файла
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
        const { name, price, description, image, category } = req.body;

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
        };

        products.push(newProduct);
        saveProducts(products); // Записване в JSON файла

        return res.status(201).json(newProduct);
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        let products = getProducts();
        const updatedProducts = products.filter((p: any) => p.id !== id);
        saveProducts(updatedProducts); // Обновяване на JSON файла

        return res.status(200).json({ message: "Продуктът е изтрит успешно!" });
    }

    return res.status(405).json({ message: "Методът не е позволен!" });
}
