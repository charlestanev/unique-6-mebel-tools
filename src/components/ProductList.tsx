import ProductCard from "@/components/ProductCard";
import { Product } from "../../types/product";

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
