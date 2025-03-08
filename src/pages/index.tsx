import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";

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
                <h1 className="text-4xl font-extrabold text-primary dark:text-secondary tracking-tight">
                    Каталог на Продуктите
                </h1>
            </motion.div>













            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </motion.div>

                {/* Tabbed Navigation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mt-6"
                >
                    <CategoryFilter
                        categories={categories}
                        subcategoriesMap={subcategoriesMap}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSubcategory={selectedSubcategory}
                        setSelectedSubcategory={setSelectedSubcategory}
                    />
                </motion.div>
            </div>












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
