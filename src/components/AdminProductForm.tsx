import { useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1, "Цената трябва да бъде положително число."),
    description: z.string().min(3, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().regex(/\.(jpg|jpeg|png|webp|gif)$/i, "Файлът трябва да бъде изображение (.jpg, .png, .webp, .gif)."),
    category: z.enum(["инструменти", "машини", "софтуер"]),
    subcategory: z.string().optional()
});

const categories = ["инструменти", "машини", "софтуер"];
const subcategoriesMap: Record<string, string[]> = {
    "инструменти": ["индивидуални инструменти", "диамантени инструменти", "дискове", "фрезери"],
    "машини": ["кантиращи машини", "CNC рутери", "циркуляри", "пробивни машини"],
    "софтуер": []
};

export default function AdminProductForm({ setSuccessMessage }: { setSuccessMessage: (msg: string | null) => void }) {
    const [products, setProducts] = useAtom(productsAtom);

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();

        const imagePath = `/images/${image}`;

        const validationResult = productSchema.safeParse({ name, price, description, image, category, subcategory });

        if (!validationResult.success) {
            alert(validationResult.error.issues.map(issue => issue.message).join("\n"));
            return;
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image: imagePath, category, subcategory }),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setProducts([...products, newProduct]);
            setSuccessMessage("Продуктът е добавен успешно! ✅");

            setTimeout(() => setSuccessMessage(null), 3000);

            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setCategory("");
            setSubcategory("");
        } else {
            setSuccessMessage("⚠️ Грешка при добавянето на продукта!");
        }
    }

    return (
        <form onSubmit={handleAddProduct} className="mb-6 p-6 rounded-lg border shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Добави нов продукт</h2>

            <div className="space-y-3">
                <input
                    className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    placeholder="Име"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    placeholder="Цена (напр. 450)"
                    value={price !== "" ? `${price} лв` : ""}
                    onChange={(e) => setPrice(Number(e.target.value.replace(/\D/g, "")) || "")}
                    required
                />
                <input
                    className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="text"
                    placeholder="Въведете име на изображението (напр. makita.jpg)"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
                <textarea
                    className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <select
                    className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Избери категория</option>
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                {category !== "софтуер" && subcategoriesMap[category] && (
                    <select
                        className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    >
                        <option value="">Избери подкатегория</option>
                        {subcategoriesMap[category].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                )}

                <button
                    className="w-full bg-green-500 text-white font-medium py-3 rounded-md hover:bg-green-600 transition"
                >
                    Добави продукт
                </button>
            </div>
        </form>
    );
}
