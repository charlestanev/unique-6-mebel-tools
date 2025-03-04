import { useState } from "react";
import { Product } from "../../types/product";
import { motion } from "framer-motion";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }: { product: Product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.07, boxShadow: "0px 8px 16px rgba(0,0,0,0.15)" }}
                className="border p-4 shadow-lg rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => setIsModalOpen(true)}
            >
                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 object-cover rounded-t-lg w-full"
                />

                {/* Product Details */}
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">{product.name}</h2>

                    {/* Shortened description to prevent overflow */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                        {product.description.length > 100
                            ? product.description.substring(0, 100) + "..."
                            : product.description}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Категория: {product.category}</p>
                    {product.subcategory && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Подкатегория: {product.subcategory}</p>
                    )}

                    {/* Price formatted to always be on one line */}
                    <p className="font-bold text-green-600 dark:text-green-400 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                        {new Intl.NumberFormat("bg-BG", { style: "currency", currency: "BGN" }).format(product.price)}
                    </p>
                </div>
            </motion.div>

            {/* Product Modal */}
            {isModalOpen && <ProductModal product={product} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
