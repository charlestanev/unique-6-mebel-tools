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

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Админ Панел</h1>
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
