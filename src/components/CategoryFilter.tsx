type CategoryFilterProps = {
    categories: string[];
    subcategoriesMap: Record<string, string[]>;
    selectedCategory: string | null;
    setSelectedCategory: (value: string | null) => void;
    selectedSubcategory: string | null;
    setSelectedSubcategory: (value: string | null) => void;
};

export default function CategoryFilter({
    categories,
    subcategoriesMap,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
}: CategoryFilterProps) {
    return (
        <div className="pb-4">
            <h3 className="text-lg font-semibold text-darkBg dark:text-darkText mb-2">Категории</h3>

            {/* Categories Section */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pb-3">
                <button
                    className={`px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out rounded-lg 
                        ${selectedCategory === null
                            ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                            : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700"
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
                                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                                : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700"
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

            {/* Subcategories Section (Styled Box Instead of Line) */}
            {selectedCategory && subcategoriesMap[selectedCategory]?.length > 0 && (
                <div className="mt-3 p-4 bg-darkBg dark:bg-gray-900 rounded-lg shadow-md border border-gray-700">
                    <h4 className="text-md font-semibold text-darkText mb-2">Подкатегории</h4>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {subcategoriesMap[selectedCategory].map((sub) => (
                            <button
                                key={sub}
                                className={`px-4 py-2 transition-all duration-300 text-sm font-medium rounded-lg relative 
                                    ${selectedSubcategory === sub
                                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg border border-purple-400"
                                        : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                                    }`}
                                onClick={() => setSelectedSubcategory(sub)}
                            >
                                {sub}
                                {selectedSubcategory === sub && (
                                    <div className="absolute inset-0 rounded-lg border border-purple-400 opacity-50 blur-md"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
