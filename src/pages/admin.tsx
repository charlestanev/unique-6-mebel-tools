import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, productsAtom, darkModeAtom } from "@/store";
import AdminHeader from "@/components/AdminHeader";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductList from "@/components/AdminProductList";
import fetchProducts from "../../utils/fetchProducts";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const [products, setProducts] = useAtom(productsAtom);
    const [darkMode] = useAtom(darkModeAtom);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

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
        if (!loading && isAuthenticated === false) {
            router.replace("/admin-login");
        }
    }, [isAuthenticated, loading, router]);

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

    if (loading) return <p>Loading...</p>;

    if (!isAuthenticated) return null;

    return (
        <div className="container mx-auto p-6">
            <AdminHeader />
            <AdminProductForm />
            <AdminProductList />
        </div>
    );
}