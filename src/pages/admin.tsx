import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/router";


const productSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1, "Цената трябва да бъде положително число."),
    description: z.string().min(1, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().url("URL-то за изображение е невалидно."),
    category: z.enum(["инструменти", "машини", "софтуер"]),
    subcategory: z.string().optional()
});

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    subcategory?: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
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

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
                <h1 className="text-3xl font-bold mb-4">Админ Панел</h1>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
                    Изход
                </button>
                {/* Form for Adding Products */}
                <form onSubmit={handleAddProduct} className="mb-6 p-4 border rounded bg-gray-100">
                    <h2 className="text-xl font-bold mb-4">Добави нов продукт</h2>
                    <input className="border p-2 mb-2 w-full" type="text" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className="border p-2 mb-2 w-full" type="text" placeholder="Цена (напр. 450)" value={price !== "" ? `${price} лв` : ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setPrice(value === "" ? "" : Number(value));
                        }} required />
                    <input className="border p-2 mb-2 w-full" type="text" placeholder="тук URL на някво изображение" value={image} onChange={(e) => setImage(e.target.value)} required />
                    <textarea className="border p-2 mb-2 w-full" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />

                    {/* Category Dropdown */}
                    <select className="border p-2 mb-2 w-full" value={category} onChange={(e) => {
                        setCategory(e.target.value);
                        setSubcategory("");
                    }} required>
                        <option value="">Избери категория</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Subcategory Dropdown (Only for Инструменти & Машини) */}
                    {category !== "софтуер" && subcategoriesMap[category] && (
                        <select className="border p-2 mb-2 w-full" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                            <option value="">Избери подкатегория</option>
                            {subcategoriesMap[category].map((sub) => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    )}

                    <button className="bg-green-500 text-white px-4 py-2 rounded">Добави продукт</button>
                </form>

                {/* 🔥 Product List with Delete Button (Added Below the Form) */}
                <h2 className="text-2xl font-bold mb-4">Списък с продукти</h2>
                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{product.name} - {product.price} лв</h3>
                                <p className="text-gray-500">{product.category} {product.subcategory ? `> ${product.subcategory}` : ""}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
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
