import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { motion } from "framer-motion";

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
            const data = await fetch("/api/products").then(res => res.json());
            setProducts(data);
        }
        loadProducts();
    }, [setProducts]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-6 py-10"
        >
            <Navbar />
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center mb-8 mt-12"
            >
                <h1 className="text-4xl font-extrabold text-primary dark:text-secondary tracking-tight">Каталог на Продуктите</h1>
            </motion.div>



            {/* Search */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex flex-col md:flex-row items-center gap-4"
            >
                <input
                    type="text"
                    placeholder="🔍 Търсене по описание..."
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-4 focus:ring-primary transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </motion.div>

            
            {/* Category Filter */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
            />

            {selectedCategory && selectedCategory !== "софтуер" && (
                <motion.select
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-4 focus:ring-primary transition"
                    value={selectedSubcategory || ""}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                >
                    <option value="">Всички подкатегории</option>
                    {subcategoriesMap[selectedCategory].map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </motion.select>
            )}

            <ProductList
                products={products}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                searchQuery={searchQuery}
            />

            <Footer />
            <CookieConsent />
        </motion.div>
    );
}
