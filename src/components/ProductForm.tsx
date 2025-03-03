import { useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import validateProduct from "../../utils/validateProduct";

const categories = ["инструменти", "машини", "софтуер"];
const subcategoriesMap: Record<string, string[]> = {
    "инструменти": ["индивидуални инструменти", "диамантени инструменти", "дискове", "фрезери"],
    "машини": ["кантиращи машини", "CNC рутери", "циркуляри", "пробивни машини"],
    "софтуер": []
};

export default function ProductForm() {
    const [products, setProducts] = useAtom(productsAtom);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();

        const validationError = validateProduct({ name, price, description, image, category, subcategory });
        if (validationError) {
            alert(validationError);
            return;
        }

        const res = await fetch("/api/add-product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image, category, subcategory }),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setProducts([...products, newProduct.product]);
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setCategory("");
            setSubcategory("");
        }
    }

    return (
        <form onSubmit={handleAddProduct} className="mb-6 p-4 border rounded bg-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Добави нов продукт</h2>

            <input
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 rounded placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                type="text" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} required
            />

            <input
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 rounded placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                type="text" placeholder="Цена (напр. 450)" value={price !== "" ? `${price} лв` : ""}
                onChange={(e) => setPrice(Number(e.target.value.replace(/\D/g, "")) || "")} required
            />

            <input
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 rounded placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                type="text" placeholder="URL на изображение" value={image} onChange={(e) => setImage(e.target.value)} required
            />

            <textarea
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 rounded placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required
            />

            <select
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                value={category} onChange={(e) => setCategory(e.target.value)} required
            >
                <option value="">Избери категория</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {category !== "софтуер" && subcategoriesMap[category] && (
                <select
                    className="border p-2 mb-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                    value={subcategory} onChange={(e) => setSubcategory(e.target.value)}
                >
                    <option value="">Избери подкатегория</option>
                    {subcategoriesMap[category].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
            )}

            <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-400 transition"
            >
                Добави продукт
            </button>
        </form>
    );
}
