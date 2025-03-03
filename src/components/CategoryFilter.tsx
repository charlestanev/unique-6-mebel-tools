import { useState } from "react";

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
        <div className="border-b border-gray-300 dark:border-gray-700">
            <nav className="flex space-x-4 overflow-x-auto">
                {/* Бутон за всички категории */}
                <button
                    className={`px-4 py-2 border-b-2 font-medium transition-all duration-300 
                    ${selectedCategory === null
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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
                        className={`px-4 py-2 border-b-2 font-medium transition-all duration-300 
                        ${selectedCategory === cat
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedSubcategory(null);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            {/* Подкатегории под главния таб */}
            {selectedCategory && subcategoriesMap[selectedCategory]?.length > 0 && (
                <div className="mt-4 flex space-x-4 overflow-x-auto">
                    {subcategoriesMap[selectedCategory].map((sub) => (
                        <button
                            key={sub}
                            className={`px-4 py-2 rounded-md transition-all duration-300 
                            ${selectedSubcategory === sub
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
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
