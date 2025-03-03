interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string | null;
    setSelectedCategory: (category: string | null) => void;
    selectedSubcategory?: string | null;
    setSelectedSubcategory?: (subcategory: string | null) => void;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-700 pb-2 bg-red-600">
            <button
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200
                ${selectedCategory === null
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    }`}
                onClick={() => {
                    setSelectedCategory(null);
                    if (setSelectedSubcategory) setSelectedSubcategory(null);
                }}
            >
                Всички
            </button>

            {categories.map((cat) => (
                <button
                    key={cat}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 
                    ${selectedCategory === cat
                            ? "bg-primary text-white shadow-md"
                            : "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"}`}
                    onClick={() => {
                        setSelectedCategory(cat);
                        if (setSelectedSubcategory) setSelectedSubcategory(null);
                    }}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
