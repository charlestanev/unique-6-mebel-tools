import { useEffect, useState } from "react";

export default function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Продукти</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product: any) => (
                    <div key={product.id} className="border p-4 shadow-md">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="font-bold text-green-600">{product.price} BGN</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
