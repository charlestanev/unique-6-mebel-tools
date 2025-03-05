import { useState, useEffect } from "react";

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
    return (
        <div className="border-b border-gray-300 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Категории</h3>

            {/* Categories Tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start border-b pb-2">
                <button
                    className={`px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out rounded-lg 
                        ${selectedCategory === null
                            ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-lg"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
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
                        className={`px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out rounded-lg 
                            ${selectedCategory === cat
                                ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-lg"
                                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
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
                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    {subcategoriesMap[selectedCategory].map((sub) => (
                        <button
                            key={sub}
                            className={`px-4 py-2 transition-all duration-300 text-sm font-medium rounded-lg 
                                ${selectedSubcategory === sub
                                    ? "bg-gradient-to-r from-gray-800 to-gray-600 text-white shadow-md"
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
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
