import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const products = await prisma.product.findMany({
                orderBy: { createdAt: "desc" }
            });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: "Грешка при зареждане на продуктите", error });
        }
    }

    if (req.method === "POST") {
        if (!isAuthenticated(req)) {
            return res.status(401).json({ message: "Неавторизиран достъп" });
        }

        const { name, price, description, image, category, subcategory, media } = req.body;

        if (!name || !description || !image || !category) {
            return res.status(400).json({ message: "Всички задължителни полета трябва да бъдат попълнени!" });
        }

        try {
            const normalizePath = (value: string) => {
                return value.startsWith("/images/") || value.startsWith("https://") ? value : `/images/${value}`;
            };

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price: price !== undefined ? Number(price) : undefined,
                    description,
                    image: normalizePath(image),
                    category,
                    subcategory: subcategory || null,
                    media: media?.map((m: string) => normalizePath(m)) || [],
                },
            });

            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ message: "Грешка при добавяне на продукт", error });
        }
    }

    if (req.method === "DELETE") {
        if (!isAuthenticated(req)) {
            return res.status(401).json({ message: "Неавторизиран достъп" });
        }

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Липсва ID на продукта!" });
        }

        try {
            await prisma.product.delete({ where: { id } });
            return res.status(200).json({ message: "Продуктът е изтрит успешно!", id });
        } catch (error) {
            return res.status(500).json({ message: "Грешка при изтриване", error });
        }
    }

    return res.status(405).json({ message: "Методът не е позволен!" });
}
