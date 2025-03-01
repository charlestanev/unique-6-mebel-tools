import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    subcategory?: string;
}

const categories = ["инструменти", "машини", "софтуер"];
const subcategoriesMap: Record<string, string[]> = {
    "инструменти": ["индивидуални инструменти", "диамантени инструменти", "дискове", "фрезери"],
    "машини": ["кантиращи машини", "CNC рутери", "циркуляри", "пробивни машини"],
    "софтуер": []
};

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

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

            {/* Category Filter Buttons */}
            <div className="flex space-x-4 mb-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 border ${selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedSubcategory(null);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Subcategory Dropdown (if applicable) */}
            {selectedCategory && selectedCategory !== "софтуер" && (
                <select className="border p-2 mb-4 w-full" onChange={(e) => setSelectedSubcategory(e.target.value)}>
                    <option value="">Всички подкатегории</option>
                    {subcategoriesMap[selectedCategory].map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products
                    .filter((product) => !selectedCategory || product.category === selectedCategory)
                    .filter((product) => !selectedSubcategory || product.subcategory === selectedSubcategory)
                    .map((product) => (
                        <div key={product.id} className="border p-4 shadow-md rounded-lg bg-white">
                            <img src={product.image} alt={product.name} className="h-40 object-cover rounded-t-lg w-full" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-gray-700">{product.description}</p>
                                <p className="text-sm text-gray-500">Категория: {product.category}</p>
                                {product.subcategory && <p className="text-sm text-gray-500">Подкатегория: {product.subcategory}</p>}
                                <p className="font-bold text-green-600 text-lg">{product.price} лв</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
