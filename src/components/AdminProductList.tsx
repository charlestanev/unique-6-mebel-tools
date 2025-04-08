import { useAtom } from "jotai";
import { productsAtom } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { transition } from "../../utils/animations";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={transition}
                        className="border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700 overflow-hidden flex flex-col"
                    >
                        {/* Product Image */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-50 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg"
                        />

                        {/* Product Info */}
                        <div className="p-5 flex flex-col flex-grow space-y-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-h-[84px]">
                                {product.name}
                            </h3>

                            <p className="text-base font-bold text-green-600 dark:text-green-400">
                                {product.price} лв
                            </p>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {product.category} {product.subcategory ? `> ${product.subcategory}` : ""}
                            </p>
                        </div>


                        {/* Button Wrapper with Padding */}
                        <footer className="p-4 pt-0">
                            <button
                                className="bg-red-500 text-white font-medium py-3 rounded-md hover:opacity-90 transition-all shadow-md w-full"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                🗑 Изтрий
                            </button>
                        </footer>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
