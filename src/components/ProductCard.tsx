import { useState } from "react";
import { Product } from "../../types/product";
import { motion } from "framer-motion";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }: { product: Product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Product Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0, ease: "easeOut" }}
                whileHover={{ scale: 1.07, boxShadow: "0px 8px 16px rgba(0,0,0,0.15)" }}
                className="border p-4 shadow-lg rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 transition-all duration-200 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 object-cover rounded-t-lg w-full"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{product.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Категория: {product.category}</p>
                    {product.subcategory && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Подкатегория: {product.subcategory}</p>
                    )}
                    <p className="font-bold text-green-600 dark:text-green-400 text-lg">{product.price} лв</p>
                </div>
            </motion.div>

            {/* Product Modal */}
            {isModalOpen && <ProductModal product={product} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
