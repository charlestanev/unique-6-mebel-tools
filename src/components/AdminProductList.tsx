import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductList() {
    const [products, setProducts] = useAtom(productsAtom);

    async function handleDeleteProduct(id: string) {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете този продукт?")) return;

        const res = await fetch("/api/products", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (res.ok) {
            setProducts(products.filter((product) => product.id !== id));
        } else {
            alert("Грешка при изтриване на продукта.");
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700 overflow-hidden"
                    >
                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 w-full object-cover rounded-t-lg"
                        />

                        {/* Product Info */}
                        <div className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {product.name} - {product.price} лв
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {product.category} {product.subcategory ? `> ${product.subcategory}` : ""}
                                </p>
                            </div>

                            {/* Delete Button with Hover Effect */}
                            <button
                                className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition-all shadow-md"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                🗑 Изтрий
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
