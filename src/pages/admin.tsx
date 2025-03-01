import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    category: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
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

    async function handleDelete(id: string) {
        await fetch("/api/products", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setProducts(products.filter((p) => p.id !== id));
    }

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image, category }),
        });

        if (res.ok) {
            const newProduct = await res.json();
            setProducts([...products, newProduct]); // Добавяне на новия продукт в state
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
                <input className="border p-2 mb-2 w-full" type="text" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input className="border p-2 mb-2 w-full" type="text" placeholder="URL на изображение" value={image} onChange={(e) => setImage(e.target.value)} required />
                <textarea className="border p-2 mb-2 w-full" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input className="border p-2 mb-2 w-full" type="text" placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Добави продукт</button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Продукти</h2>
            {products.map((product) => (
                <div key={product.id} className="border p-4 shadow-md flex justify-between">
                    <h3>{product.name} - {product.price} BGN</h3>
                    <button className="bg-red-500 text-white px-3 py-1" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
