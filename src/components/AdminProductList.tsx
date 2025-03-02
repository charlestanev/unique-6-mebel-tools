import { useAtom } from "jotai";
import { productsAtom } from "@/store";

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
        <div className="space-y-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 shadow-md flex justify-between items-center bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name} - {product.price} лв</h3>
                        <p className="text-gray-500 dark:text-gray-400">{product.category} {product.subcategory ? `> ${product.subcategory}` : ""}</p>
                    </div>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteProduct(product.id)}>
                        Изтрий
                    </button>
                </div>
            ))}
        </div>
    );
}
