import ProductCard from "./ProductCard";

interface ProductListProps {
    products: any[];
    selectedCategory: string | null;
    selectedSubcategory: string | null;
    searchQuery: string;
}

export default function ProductList({
    products,
    selectedCategory,
    selectedSubcategory,
    searchQuery
}: ProductListProps) {
    const filteredProducts = products
        .filter((product) => !selectedCategory || product.category === selectedCategory)
        .filter((product) => !selectedSubcategory || product.subcategory === selectedSubcategory)
        .filter((product) => product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-12">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg">
                    Няма намерени продукти
                </p>
            )}
        </div>
    );
}
