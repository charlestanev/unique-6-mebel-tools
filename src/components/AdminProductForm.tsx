import { useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import { z } from "zod";
import { motion } from "framer-motion";
import { transition } from "../../utils/animations";

const productSchema = z.object({
    name: z.string().min(1, "Името трябва да бъде поне 1 символ."),
    price: z.number().min(1, "Цената трябва да бъде положително число.").optional(),
    description: z.string().min(1, "Описанието трябва да съдържа поне 1 символ."),
    image: z.string().regex(/\.(jpg|jpeg|png|webp|gif)$/i, "Файлът трябва да бъде изображение (.jpg, .png, .webp, .gif)."),
    category: z.enum(["инструменти", "машини", "софтуер"]),
    subcategory: z.string().optional(),
    media: z.array(z.string()).optional()
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
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [media, setMedia] = useState<{ type: "image" | "video"; value: string }[]>(Array(5).fill({ type: "image", value: "" }));

    function handleMediaChange(index: number, type: "image" | "video", value: string) {
        const updatedMedia = [...media];
        updatedMedia[index] = { type, value };
        setMedia(updatedMedia);
    }

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();
        const imagePath = `/images/${image}`;

        const mediaFiles = media
            .filter(m => m.value.trim() !== "")
            .map(m => (m.type === "image" ? `/images/${m.value}` : m.value));

        const validationResult = productSchema.safeParse({ name, price, description, image, category, subcategory, media: mediaFiles });

        if (!validationResult.success) {
            alert(validationResult.error.issues.map(issue => issue.message).join("\n"));
            return;
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image: imagePath, category, subcategory, media: mediaFiles }),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setProducts([...products, newProduct]);
            setSuccessMessage("✅ Продуктът е добавен успешно!");

            setTimeout(() => setSuccessMessage(null), 3000);
            setName("");
            setPrice(undefined);
            setDescription("");
            setImage("");
            setCategory("");
            setSubcategory("");
            setMedia(Array(5).fill({ type: "image", value: "" }));
        } else {
            setSuccessMessage("⚠️ Грешка при добавянето на продукта!");
        }
    }

    return (
        <motion.form
            onSubmit={handleAddProduct}
            className="p-6 bg-red dark:bg-darkBg shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 space-y-6 col-span-full sm:col-span-2 lg:col-span-3 w-full mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
        >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center flex items-center gap-2">
                📦 Добави нов продукт
            </h2>

            <div className="grid gap-4">
                <div className="space-y-4">
                    {/* Row 1: Име + Цена */}
                    <div className="grid gap-4 lg:grid-cols-2">
                        <input
                            className="input-field w-full"
                            type="text"
                            placeholder="Име на продукта"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className="input-field w-full"
                            type="text"
                            placeholder="Цена (напр. 450)"
                            value={typeof price === "number" ? `${price} лв` : ""}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setPrice(val === "" ? undefined : Number(val));
                            }}
                        />
                    </div>

                    {/* Row 2: Изображение + Категория */}
                    <div className="grid gap-4 lg:grid-cols-2">
                        <input
                            className="input-field w-full"
                            type="text"
                            placeholder="Изображение (напр. makita.jpg)"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />

                        <select
                            className="input-field w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Избери категория</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Описание */}
                    <textarea
                        className="input-field w-full"
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    {/* Подкатегория */}
                    {category !== "софтуер" && subcategoriesMap[category] && (
                        <select
                            className="input-field w-full"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                        >
                            <option value="">Избери подкатегория</option>
                            {subcategoriesMap[category].map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    )}

                    {/* Media Inputs */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {media.map((m, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-center gap-2">
                                <select
                                    className="input-field w-full sm:w-40"
                                    value={m.type || ""}
                                    onChange={(e) =>
                                        handleMediaChange(index, e.target.value as "image" | "video", m.value)
                                    }
                                >
                                    <option value="image">🖼 Изображение</option>
                                    <option value="video">📹 Видео</option>
                                </select>

                                <input
                                    className="input-field w-full"
                                    type="text"
                                    placeholder={m.type === "image" ? "Файл име" : "YouTube линк"}
                                    value={m.value}
                                    onChange={(e) => handleMediaChange(index, m.type, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <button className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-purple-600 transition-all">
                ➕ Добави продукт
            </button>
        </motion.form>
    );
}
