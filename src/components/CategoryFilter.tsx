import { motion } from "framer-motion";
import { transition } from "../../utils/animations";

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
    setSelectedSubcategory,
}: CategoryFilterProps) {
    return (
        <div className="pb-4">
            <h3 className="text-lg font-semibold text-darkBg dark:text-darkText mb-2">Категории</h3>

            {/* Categories Section */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pb-3">
                <motion.button
                    whileHover={{ scale: 1.075 }}
                    whileTap={{ scale: 0.95 }}
                    transition={transition}
                    className={`px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out rounded-lg 
                        ${selectedCategory === null
                            ? "bg-gradient-to-r from-primary to-accent text-white"
                            : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700"
                        }`}
                    onClick={() => {
                        setSelectedCategory(null);
                        setSelectedSubcategory(null);
                    }}
                >
                    Всички
                </motion.button>

                {categories
                    .filter(cat => !['машини', 'софтуер'].includes(cat))
                    .map((cat) => (
                        <motion.button
                            whileHover={{ scale: 1.075 }}
                            whileTap={{ scale: 0.95 }}
                            transition={transition}
                            key={cat}
                            className={`px-4 py-2 text-md font-medium transition-all duration-300 ease-in-out rounded-lg 
                                ${selectedCategory === cat
                                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                                    : "bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedSubcategory(null);
                            }}
                        >
                            {cat}
                        </motion.button>
                    ))}
            </div>

            {/* Subcategories Section */}
            {selectedCategory && subcategoriesMap[selectedCategory]?.length > 0 && (
                <div className="mt-3 p-4 rounded-lg shadow-md border bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">Подкатегории</h4>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {subcategoriesMap[selectedCategory].map((sub) => {
                            const isActive = selectedSubcategory === sub;
                            return (
                                <motion.button
                                    whileHover={{ scale: 1.075 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={transition}
                                    key={sub}
                                    onClick={() => setSelectedSubcategory(sub)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative
                                        ${isActive
                                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {sub}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
