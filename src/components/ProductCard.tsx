import { useState } from "react";
import { Product } from "../../types/product";
import { motion } from "framer-motion";
import ProductModal from "./ProductModal";
import { Phone } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
                whileHover={{ scale: 1.08, boxShadow: "0px 10px 24px rgba(0,0,0,0.2)" }}
                className="border p-4 rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 transition-transform duration-50 ease-out hover:scale-[1.05] hover:shadow-2xl cursor-pointer overflow-hidden"
                onClick={() => setIsModalOpen(true)}
            >

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-50 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg"
                />


                {/* Product Details */}
                <div className="pt-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">{product.name}</h2>

                    {/* Shortened description to prevent overflow */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 min-h-10">
                        {product.description.length > 100
                            ? product.description.substring(0, 100) + "..."
                            : product.description}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Категория: {product.category}</p>
                    {product.subcategory && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 h-[40px]">Подкатегория: {product.subcategory}</p>
                    )}

                    {/* Price formatted to always be on one line */}
                    {typeof product.price === "number"
                        ? (<p className="font-bold text-green-600 dark:text-green-400 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                            {new Intl.NumberFormat("bg-BG", { style: "currency", currency: "BGN" }).format(product.price)}
                        </p>)
                        : (<p className="font-bold text-green-600 dark:text-green-400 text-lg whitespace-nowrap overflow-hidden text-ellipsis min-h-7"></p>)
                    }


                    {/* Call Button */}
                    <a
                        href="tel:+359898447853"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-150 w-full justify-center"
                    >
                        <Phone size={16} />
                        +359 89 844 7853
                    </a>
                </div>
            </motion.div>

            {/* Product Modal */}
            {isModalOpen && <ProductModal product={product} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
