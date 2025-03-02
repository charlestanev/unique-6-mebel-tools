import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, productsAtom, darkModeAtom } from "@/store";
import { Product } from "../../types/product";


const productSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1, "Цената трябва да бъде положително число."),
    description: z.string().min(1, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().url("URL-то за изображение е невалидно."),
    category: z.enum(["инструменти", "машини", "софтуер"]),
    subcategory: z.string().optional()
});


export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const [products, setProducts] = useAtom(productsAtom);
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    const categories = ["инструменти", "машини", "софтуер"];
    const subcategoriesMap: Record<string, string[]> = {
        "инструменти": ["индивидуални инструменти", "диамантени инструменти", "дискове", "фрезери"],
        "машини": ["кантиращи машини", "CNC рутери", "циркуляри", "пробивни машини"],
        "софтуер": []
    };


    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/auth-check");
            const data = await res.json();
            setIsAuthenticated(data.authenticated);
        }
        checkAuth();
    }, []);

    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        setIsAuthenticated(false);
        setProducts([]);
        router.push("/");
    }

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data: Product[] = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <p>Unauthorized. Please log in.</p>;
    }

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
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setCategory("");
            setSubcategory("");
        }
    }

    async function handleDeleteProduct(id: string) {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете този продукт?")) return;

        const res = await fetch("/api/products", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            setProducts(products.filter((product) => product.id !== id));
        } else {
            alert("Грешка при изтриване на продукта.");
        }
    }


    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Админ Панел</h1>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" onClick={handleLogout}>
                    Изход
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push("/")}>
                    Към Продуктите
                </button>

                {/* Form for Adding Products */}
                <form onSubmit={handleAddProduct} className="mb-6 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Добави нов продукт</h2>
                    <input className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white" type="text" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input
                        className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                        type="text"
                        placeholder="Цена (напр. 450)"
                        value={price !== "" ? `${price} лв` : ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setPrice(value === "" ? "" : Number(value));
                        }} required
                    />
                    <input className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white" type="text" placeholder="тук URL на някво изображение" value={image} onChange={(e) => setImage(e.target.value)} required />
                    <textarea className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />

                    {/* Category Dropdown */}
                    <select className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white" value={category} onChange={(e) => {
                        setCategory(e.target.value);
                        setSubcategory("");
                    }} required>
                        <option value="">Избери категория</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Subcategory Dropdown */}
                    {category !== "софтуер" && subcategoriesMap[category] && (
                        <select className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                            <option value="">Избери подкатегория</option>
                            {subcategoriesMap[category].map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    )}

                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Добави продукт</button>
                </form>

                {/* Product List */}
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Списък с продукти</h2>
                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 shadow-md flex justify-between items-center bg-white dark:bg-gray-800 dark:border-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name} - {product.price} лв</h3>
                                <p className="text-gray-500 dark:text-gray-400">{product.category} {product.subcategory ? ` > ${product.subcategory}` : ""}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                Изтрий
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
