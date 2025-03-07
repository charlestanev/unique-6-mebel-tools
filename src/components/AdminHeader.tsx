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
            setIsAuthenticated(false);
            router.replace("/admin-login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Title */}
            <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center sm:text-left w-full sm:w-auto">
                Админ Панел
            </h1>

            {/* Action Buttons (Wrap in a flex container) */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 w-full sm:w-auto">
                {/* Link to Products */}
                <Link
                    href="/"
                    className="bg-blue-500 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-md hover:bg-blue-600 transition text-center"
                >
                    Към Продуктите
                </Link>

                {/* Dark Mode Toggle */}
                <button
                    className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
                </button>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                    <LogOut className="w-5 h-5 mr-1 sm:mr-2" /> Изход
                </button>
            </div>
        </header>
    );
}
