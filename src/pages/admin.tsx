import { useEffect, useState } from "react";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(3, "Името трябва да бъде поне 3 символа."),
    price: z.number().min(1, "Цената трябва да бъде положително число."),
    description: z.string().min(1, "Описанието трябва да съдържа поне 10 символа."),
    image: z.string().url("URL-то за изображение е невалидно."),
    category: z.string().min(3, "Категорията трябва да съдържа поне 3 символа."),
});

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data: Product[] = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();

        const validationResult = productSchema.safeParse({ name, price, description, image, category });

        if (!validationResult.success) {
            alert(validationResult.error.issues.map(issue => issue.message).join("\n"));
            return;
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image, category }),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setProducts([...products, newProduct]);
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            setCategory("");
        }
    }


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Админ Панел</h1>

            <form onSubmit={handleAddProduct} className="mb-6 p-4 border rounded bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Добави нов продукт</h2>
                <input className="border p-2 mb-2 w-full" type="text" placeholder="Име" value={name} onChange={(e) => setName(e.target.value)} required />
                <input
                    className="border p-2 mb-2 w-full"
                    type="text"
                    placeholder="Цена (напр. 450)"
                    value={price !== "" ? `${price} лв` : ""}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPrice(value === "" ? "" : Number(value));
                    }}
                    required
                />
                <input className="border p-2 mb-2 w-full" type="text" placeholder="URL на изображение" value={image} onChange={(e) => setImage(e.target.value)} required />
                <textarea className="border p-2 mb-2 w-full" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input className="border p-2 mb-2 w-full" type="text" placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Добави продукт</button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Продукти</h2>
            {products.map((product) => (
                <div key={product.id} className="border p-4 shadow-md flex justify-between">
                    <h3>{product.name} - {product.price} BGN</h3>
                </div>
            ))}
        </div>
    );
}
