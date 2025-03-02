export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }: any) {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat: string) => (
                <button
                    key={cat}
                    className={`px-4 py-2 rounded-lg border transition-colors duration-200 
                    ${selectedCategory === cat
                            ? "bg-blue-600 text-white border-blue-700"
                            : "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"}`}
                    onClick={() => setSelectedCategory(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
