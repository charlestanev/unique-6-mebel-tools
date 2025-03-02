import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { darkModeAtom, productsAtom } from "@/store";
import { Product } from "../../types/product";

const categories = ["инструменти", "машини", "софтуер"];
const subcategoriesMap: Record<string, string[]> = {
    "инструменти": ["индивидуални инструменти", "диамантени инструменти", "дискове", "фрезери"],
    "машини": ["кантиращи машини", "CNC рутери", "циркуляри", "пробивни машини"],
    "софтуер": []
};

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);
    const [products, setProducts] = useAtom(productsAtom);
    const [searchQuery, setSearchQuery] = useState("");


    // Проверява дали в LocalStorage има запазена тема
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("/api/products");
            const data: Product[] = await res.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <>
            <div className="container mx-auto p-6">
                <input
                    type="text"
                    placeholder="Търсене по описание..."
                    className="border p-2 mb-6 w-full rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Продукти</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleDarkMode}>
                    {isDarkMode ? "Светла тема" : "Тъмна тема"}
                </button>
                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-lg border transition-colors duration-200 
                    ${selectedCategory === cat
                                    ? "bg-blue-600 text-white border-blue-700"
                                    : "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"}`}
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
                    <select
                        className="border p-2 mb-6 w-full rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                    >
                        <option value="">Всички подкатегории</option>
                        {subcategoriesMap[selectedCategory].map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products
                        .filter((product) => !selectedCategory || product.category === selectedCategory)
                        .filter((product) => !selectedSubcategory || product.subcategory === selectedSubcategory)
                        .filter((product) =>
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((product) => (
                            <div
                                key={product.id}
                                className="border p-4 shadow-md rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 transition-all duration-200"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-40 object-cover rounded-t-lg w-full"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{product.name}</h2>
                                    <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Категория: {product.category}</p>
                                    {product.subcategory && <p className="text-sm text-gray-500 dark:text-gray-400">Подкатегория: {product.subcategory}</p>}
                                    <p className="font-bold text-green-600 dark:text-green-400 text-lg">{product.price} лв</p>
                                </div>
                            </div>
                        ))}

                </div>
            </div>
        </>
    )
}
