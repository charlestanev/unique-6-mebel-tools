import Head from "next/head";
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
import { transition } from "../../utils/animations";

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
        <>
            <Head>
                <title>Каталог за Машини за Мебелно Производство | Unique6 Tools</title>
                <meta
                    name="description"
                    content="Продаваме CNC рутери, фрезери, пробивни машини, кантир машини и други машини за мебелно производство. Достъпни цени и професионално обслужване."
                />
                <meta
                    name="keywords"
                    content="машини за мебелно производство, CNC рутери, фрезери, кантир машини, уник6, unique6 tools, продажба на машини, дървообработващи машини"
                />
                <meta name="author" content="Unique6 Tools" />
                <meta
                    property="og:title"
                    content="Каталог за Машини за Мебелно Производство | Unique6 Tools"
                />
                <meta
                    property="og:description"
                    content="Продажба на машини за мебелна индустрия. Високо качество, достъпни цени."
                />
                <meta property="og:url" content="https://www.unique6.tools" />
                <meta property="og:type" content="website" />
            </Head>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
                className="max-w-7xl mx-auto px-6 py-10"
            >
                <Navbar />

                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={transition}
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
                        transition={transition}
                    >
                        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={transition}
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
        </>
    );
}
