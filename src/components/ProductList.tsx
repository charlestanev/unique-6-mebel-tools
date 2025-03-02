import ProductCard from "@/components/ProductCard";
import { Product } from "../../types/product";

interface ProductListProps {
    products: Product[];
    selectedCategory: string | null;
    selectedSubcategory: string | null;
    searchQuery: string;
}

export default function ProductList({ products, selectedCategory, selectedSubcategory, searchQuery }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
                .filter((product) => !selectedCategory || product.category === selectedCategory)
                .filter((product) => !selectedSubcategory || product.subcategory === selectedSubcategory)
                .filter((product) => product.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
        </div>
    );
}
