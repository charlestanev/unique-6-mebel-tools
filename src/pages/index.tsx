import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import DarkModeToggle from "@/components/DarkModeToggle";
import fetchProducts from "../../utils/fetchProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const categories = ["инструменти", "машини", "софтуер"];
const subcategoriesMap: Record<string, string[]> = {
    "инструменти": ["индивидуални инструменти", "диамантени инструменти", "дискове", "фрезери"],
    "машини": ["кантиращи машини", "CNC рутери", "циркуляри", "пробивни машини"],
    "софтуер": []
};

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useAtom(productsAtom);

    useEffect(() => {
        async function loadProducts() {
            const data = await fetchProducts();
            setProducts(data);
        }
        loadProducts();
    }, []);

    return (
        <div className="container mx-auto p-6 mt-14">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Продукти</h1>

            <input
                type="text"
                placeholder="Търсене по описание..."
                className="border p-2 mb-6 w-full rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Category Filter  */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
            />

            {/* Subcategory Dropdown */}
            {selectedCategory && selectedCategory !== "софтуер" && (
                <select
                    className="border p-2 mb-6 w-full rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                    value={selectedSubcategory || ""}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                    <option value="">Всички подкатегории</option>
                    {subcategoriesMap[selectedCategory].map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            )}

            {/* Product List */}
            <ProductList
                products={products}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                searchQuery={searchQuery}
            />
            <Footer />
            <CookieConsent />
        </div>
    );
}