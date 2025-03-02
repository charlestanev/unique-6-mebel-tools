import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Phone, Mail } from "lucide-react";

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

                {/* Contact Info + Theme Toggle */}
                <div className="flex items-center space-x-6">
                    {/* Phone */}
                    <a href="tel:+359898447853" className="flex items-center text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition">
                        <Phone className="w-5 h-5 mr-1" /> +359 89 844 7853
                    </a>
                    {/* Email */}
                    <a href="mailto:charlestanev.dev@gmail.com" className="flex items-center text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition">
                        <Mail className="w-5 h-5 mr-1" /> unique6.tools@gmail.com
                    </a>
                    {/* Theme Toggle */}
                    <button onClick={() => setDarkMode(!darkMode)} className="text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition">
                        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
