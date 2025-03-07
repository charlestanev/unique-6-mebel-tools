import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, productsAtom, darkModeAtom } from "@/store";
import AdminHeader from "@/components/AdminHeader";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductList from "@/components/AdminProductList";
import fetchProducts from "../../utils/fetchProducts";
import AdminFooter from "@/components/AdminFooter";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const [products, setProducts] = useAtom(productsAtom);
    const [darkMode] = useAtom(darkModeAtom);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch("/api/auth-check");
                const data = await res.json();
                setIsAuthenticated(data.authenticated);
                setLoading(false);
            } catch (error) {
                console.error("Auth check failed", error);
                setLoading(false);
            }
        }
        checkAuth();
    }, [setIsAuthenticated]);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.replace("/admin-login");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            }
        }
        if (isAuthenticated) {
            loadProducts();
        }
    }, [isAuthenticated, setProducts]);

    if (loading) return <p className="text-center text-lg text-gray-600 dark:text-gray-300">🔄 Зареждане...</p>;

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col min-h-screen bg-light text-light">
            <AdminHeader />
            <main className="flex-1 container mx-auto p-6">
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                <AdminProductForm setSuccessMessage={setSuccessMessage} />
                <AdminProductList />
            </main>
            <AdminFooter />
        </div>
    );
}
