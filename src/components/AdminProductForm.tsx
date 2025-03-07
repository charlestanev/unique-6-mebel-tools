import { useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1, "Името трябва да бъде поне 1 символ."),
    price: z.number().min(1, "Цената трябва да бъде положително число."),
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
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [media, setMedia] = useState<{ type: "image" | "video"; value: string }[]>(Array(10).fill({ type: "image", value: "" }));

    function handleMediaChange(index: number, type: "image" | "video", value: string) {
        const updatedMedia = [...media];
        updatedMedia[index] = { type, value };
        setMedia(updatedMedia);
    }

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();

        // Construct image path dynamically
        const imagePath = `/images/${image}`;

        // Filter out empty media entries & construct final media array
        const mediaFiles = media
            .filter(m => m.value.trim() !== "")
            .map(m => (m.type === "image" ? `/images/${m.value}` : m.value)); // Convert images to paths

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
            setSuccessMessage("Продуктът е добавен успешно! ✅");

            setTimeout(() => setSuccessMessage(null), 3000);

            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setCategory("");
            setSubcategory("");
            setMedia(Array(10).fill({ type: "image", value: "" })); // Reset media inputs
        } else {
            setSuccessMessage("⚠️ Грешка при добавянето на продукта!");
        }
    }

    return (
        <form onSubmit={handleAddProduct} className="mb-6 p-6 rounded-lg border shadow-xl bg-white dark:bg-gray-900 dark:border-gray-700 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">➕ Добави нов продукт</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input className="form-input" type="text" placeholder="Име на продукта" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="form-input" type="text" placeholder="Цена (напр. 450)" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} required />
                <input className="form-input" type="text" placeholder="Име на изображението (напр. makita.jpg)" value={image} onChange={(e) => setImage(e.target.value)} required />
                <textarea className="form-input col-span-full" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Избери категория</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {category !== "софтуер" && subcategoriesMap[category] && (
                    <select className="form-input" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                        <option value="">Избери подкатегория</option>
                        {subcategoriesMap[category].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                )}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {media.map((m, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <select className="form-input" value={m.type} onChange={(e) => handleMediaChange(index, e.target.value, m.value)}>
                            <option value="image">🖼 Изображение</option>
                            <option value="video">📹 Видео</option>
                        </select>
                        <input className="form-input" type="text" placeholder={m.type === "image" ? "Името на файлът с разширението" : "YouTube линк"} value={m.value} onChange={(e) => handleMediaChange(index, m.type, e.target.value)} />
                    </div>
                ))}
            </div>
            <button className="w-full bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition-all mt-6 shadow-lg transform hover:scale-105">Добави продукт</button>
        </form>
        // <form onSubmit={handleAddProduct} className="mb-6 p-6 rounded-lg border shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700">
        //     <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Добави нов продукт</h2>

        //     <div className="space-y-3">
        //         <input
        //             className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        //             type="text"
        //             placeholder="Име на продукта"
        //             value={name}
        //             onChange={(e) => setName(e.target.value)}
        //             required
        //         />
        //         <input
        //             className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        //             type="text"
        //             placeholder="Цена (напр. 450)"
        //             value={price !== "" ? `${price} лв` : ""}
        //             onChange={(e) => setPrice(Number(e.target.value.replace(/\D/g, "")) || "")}
        //             required
        //         />
        //         <input
        //             className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        //             type="text"
        //             placeholder="Въведете име на изображението (напр. makita.jpg)"
        //             value={image}
        //             onChange={(e) => setImage(e.target.value)}
        //             required
        //         />
        //         <textarea
        //             className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        //             placeholder="Описание"
        //             value={description}
        //             onChange={(e) => setDescription(e.target.value)}
        //             required
        //         />

        //         <select
        //             className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        //             value={category}
        //             onChange={(e) => setCategory(e.target.value)}
        //             required
        //         >
        //             <option value="">Избери категория</option>
        //             {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        //         </select>

        //         {category !== "софтуер" && subcategoriesMap[category] && (
        //             <select
        //                 className="border rounded-md p-3 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        //                 value={subcategory}
        //                 onChange={(e) => setSubcategory(e.target.value)}
        //             >
        //                 <option value="">Избери подкатегория</option>
        //                 {subcategoriesMap[category].map((sub) => <option key={sub} value={sub}>{sub}</option>)}
        //             </select>
        //         )}

        //         {/* Media Inputs */}
        //         {media.map((m, index) => (
        //             <div key={index} className="flex items-center space-x-4">
        //                 <select
        //                     value={m.type || ""}
        //                     onChange={(e) => handleMediaChange(index, e.target.value as "image" | "video", m.value)}
        //                     className="border rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        //                 >
        //                     <option value="" disabled>Изберете тип медия</option>
        //                     <option value="image">🖼 Изображение</option>
        //                     <option value="video">📹 Видео</option>
        //                 </select>

        //                 <input
        //                     type="text"
        //                     placeholder={m.type === "image" ? "Името на файлът с разширението" : "YouTube линк"}
        //                     value={m.value}
        //                     onChange={(e) => handleMediaChange(index, m.type, e.target.value)}
        //                 />
        //             </div>
        //         ))}

        //         <button className="w-full bg-green-500 text-white font-medium py-3 rounded-md hover:bg-green-600 transition">
        //             Добави продукт
        //         </button>
        //     </div>
        // </form>
    );
}
