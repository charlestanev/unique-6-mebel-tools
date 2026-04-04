import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "@/utils/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const VALID_CATEGORIES = ["инструменти", "машини", "софтуер"] as const;

const createProductSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1).optional(),
    description: z.string().min(10, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().min(1, "Изображението е задължително."),
    category: z.enum(VALID_CATEGORIES),
    subcategory: z.string().optional(),
    media: z.array(z.string()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const products = await prisma.product.findMany({
                orderBy: { createdAt: "desc" },
            });
            return res.status(200).json(products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            return res.status(500).json({ message: "Грешка при зареждане на продуктите" });
        }
    }

    if (req.method === "POST") {
        if (!isAuthenticated(req)) {
            return res.status(401).json({ message: "Неавторизиран достъп" });
        }

        const parsed = createProductSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: parsed.error.issues.map((i) => i.message).join(", "),
            });
        }

        try {
            const { name, price, description, image, category, subcategory, media } = parsed.data;

            const normalizePath = (value: string) => {
                return value.startsWith("/images/") || value.startsWith("https://") ? value : `/images/${value}`;
            };

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price: price ?? null,
                    description,
                    image: normalizePath(image),
                    category,
                    subcategory: subcategory || null,
                    media: media?.map((m) => normalizePath(m)) || [],
                },
            });

            return res.status(201).json(newProduct);
        } catch (error) {
            console.error("Failed to create product:", error);
            return res.status(500).json({ message: "Грешка при добавяне на продукт" });
        }
    }

    if (req.method === "DELETE") {
        if (!isAuthenticated(req)) {
            return res.status(401).json({ message: "Неавторизиран достъп" });
        }

        const { id } = req.body;

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Липсва ID на продукта!" });
        }

        try {
            await prisma.product.delete({ where: { id } });
            return res.status(200).json({ message: "Продуктът е изтрит успешно!", id });
        } catch (error) {
            console.error("Failed to delete product:", error);
            return res.status(500).json({ message: "Грешка при изтриване" });
        }
    }

    return res.status(405).json({ message: "Методът не е позволен!" });
}
