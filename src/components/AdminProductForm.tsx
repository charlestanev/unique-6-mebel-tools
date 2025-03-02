import { useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1, "Цената трябва да бъде положително число."),
    description: z.string().min(10, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().url("URL-то за изображение е невалидно."),
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

        const validationResult = productSchema.safeParse({ name, price, description, image, category, subcategory });

        if (!validationResult.success) {
            alert(validationResult.error.issues.map(issue => issue.message).join("\n"));
            return;
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image, category, subcategory }),
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
        <form onSubmit={handleAddProduct} className="mb-6 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Добави нов продукт</h2>
            <input className="border p-2 mb-2 w-full" type="text" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="border p-2 mb-2 w-full" type="text" placeholder="Цена (напр. 450)" value={price !== "" ? `${price} лв` : ""}
                onChange={(e) => setPrice(Number(e.target.value.replace(/\D/g, "")) || "")} required />
            <input className="border p-2 mb-2 w-full" type="text" placeholder="URL на изображение" value={image} onChange={(e) => setImage(e.target.value)} required />
            <textarea className="border p-2 mb-2 w-full" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />

            <select className="border p-2 mb-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Избери категория</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {category !== "софтуер" && subcategoriesMap[category] && (
                <select className="border p-2 mb-2 w-full" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                    <option value="">Избери подкатегория</option>
                    {subcategoriesMap[category].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
            )}

            <button className="bg-green-500 text-white px-4 py-2 rounded">Добави продукт</button>
        </form>
    );
}
