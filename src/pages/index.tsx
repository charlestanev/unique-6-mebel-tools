import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data: Product[] = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Продукти</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 shadow-md rounded-lg bg-white">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 object-cover rounded-t-lg w-40"
                            width={300}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-700">{product.description}</p>
                            <p className="text-sm text-gray-500">Категория: {product.category}</p>
                            <p className="font-bold text-green-600 text-lg">{product.price} лв</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
