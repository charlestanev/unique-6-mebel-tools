import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);
    const [isScrolled, setIsScrolled] = useState(false);

    // Следи дали страницата е скролирана
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Прилага тъмна/светла тема глобално
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <nav className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-gray-100 dark:bg-gray-800"} py-4`}>
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/images/logo.png" alt="Уникат 6" width={150} height={40} className="cursor-pointer" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="text-gray-900 dark:text-gray-100 hover:text-blue-500 transition">Начало</Link>
                    <Link href="/privacy-policy" className="text-gray-900 dark:text-gray-100 hover:text-blue-500 transition">Политика за поверителност</Link>
                    <Link href="/terms" className="text-gray-900 dark:text-gray-100 hover:text-blue-500 transition">Общи условия</Link>
                    <Link href="/cookies-policy" className="text-gray-900 dark:text-gray-100 hover:text-blue-500 transition">Политика за бисквитки</Link>
                </div>

                {/* Light/Dark Mode Toggle */}
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "Светла тема" : "Тъмна тема"}
                </button>
            </div>
        </nav>
    );
}
