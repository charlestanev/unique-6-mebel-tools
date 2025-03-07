import Link from "next/link";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { isAuthenticatedAtom, darkModeAtom } from "@/store";
import { LogOut, Moon, Sun } from "lucide-react";

export default function AdminHeader() {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);
    const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            setIsAuthenticated(false); router.replace("/admin-login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Админ Панел</h1>
            <div className="flex items-center space-x-4">
                <button
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    <LogOut className="w-5 h-5 mr-2" /> Изход
                </button>
            </div>
        </header>
    );
}
