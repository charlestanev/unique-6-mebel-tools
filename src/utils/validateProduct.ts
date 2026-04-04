import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1, "Цената трябва да бъде положително число.").optional(),
    description: z.string().min(10, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().url("URL-то за изображение е невалидно."),
    category: z.enum(["инструменти", "машини", "софтуер"]),
    subcategory: z.string().optional()
});

export default function validateProduct(product: any): string | null {
    const validationResult = productSchema.safeParse(product);
    if (!validationResult.success) {
        return validationResult.error.issues.map(issue => issue.message).join("\n");
    }
    return null;
}