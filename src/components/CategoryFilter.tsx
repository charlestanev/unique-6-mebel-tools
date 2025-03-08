export default function CategoryFilter({
    categories,
    subcategoriesMap,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
}) {
    return (
        <div className="pb-4">
            <h3 className="text-lg font-semibold text-darkBg dark:text-darkText mb-2">Категории</h3>

            {/* Categories Section */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pb-3">
                <button
                    className={`px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out rounded-lg 
                        ${selectedCategory === null
                            ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
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
                                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
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
                <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
                    <h4 className="text-md font-semibold text-darkBg dark:text-darkText mb-2">Подкатегории</h4>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {subcategoriesMap[selectedCategory].map((sub) => (
                            <button
                                key={sub}
                                className={`px-4 py-2 transition-all duration-300 text-sm font-medium rounded-lg 
                                    ${selectedSubcategory === sub
                                        ? "bg-gradient-to-r from-darkBg to-darkText text-white shadow-md"
                                        : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700"
                                    }`}
                                onClick={() => setSelectedSubcategory(sub)}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
