import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react"; // Using Lucide icons for theme toggle

interface CategoryFilterProps {
    categories: string[];
    subcategoriesMap: Record<string, string[]>;
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    selectedSubcategory: string | null;
    setSelectedSubcategory: (subcategory: string | null) => void;
}

export default function CategoryFilter({
    categories,
    subcategoriesMap,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
}: CategoryFilterProps) {
    const [theme, setTheme] = useState<string>("light");


    return (
        <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
            {/* Categories Tabs */}
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide border-b">
                <button
                    className={`px-5 py-3 text-lg font-semibold transition-all duration-300 ease-in-out rounded-t-lg 
                        ${selectedCategory === null
                            ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-xl"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                    onClick={() => {
                        setSelectedCategory(null);
                        setSelectedSubcategory(null);
                    }}
                >
                    Всички
                </button>

                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-5 py-3 text-lg font-semibold transition-all duration-300 ease-in-out rounded-t-lg 
                            ${selectedCategory === cat
                                ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-xl"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedSubcategory(null);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Subcategories */}
            {selectedCategory && subcategoriesMap[selectedCategory]?.length > 0 && (
                <div className="mt-4 flex space-x-4 overflow-x-auto scrollbar-hide">
                    {subcategoriesMap[selectedCategory].map((sub) => (
                        <button
                            key={sub}
                            className={`px-5 py-3 transition-all duration-300 text-md font-medium rounded-lg 
                                ${selectedSubcategory === sub
                                    ? "bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-lg"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                            onClick={() => setSelectedSubcategory(sub)}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
