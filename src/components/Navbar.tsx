import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Phone, Mail, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${isScrolled ? "bg-white dark:bg-darkBg shadow-lg" : "bg-background dark:bg-darkBg"} py-4`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                <Link href="/" className="flex items-center">
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Image src="/images/logo.png" alt="Уникат 6" width={150} height={40} className="cursor-pointer" />
                    </motion.div>
                </Link>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md focus:outline-none">
                        {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <motion.a href="tel:+359898447853" className="flex items-center text-primary dark:text-secondary hover:text-accent dark:hover:text-accent transition" whileHover={{ scale: 1.1 }}>
                        <Phone className="w-5 h-5 mr-1" /> +359 89 844 7853
                    </motion.a>
                    <motion.a href="mailto:unique6.tools@gmail.com" className="flex items-center text-primary dark:text-secondary hover:text-accent dark:hover:text-accent transition" whileHover={{ scale: 1.1 }}>
                        <Mail className="w-5 h-5 mr-1" /> unique6.tools@gmail.com
                    </motion.a>
                    <motion.button
                        onClick={() => setDarkMode(prev => !prev)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-accent dark:hover:bg-accent transition-all"
                        whileTap={{ scale: 0.9 }}
                    >
                        {darkMode ? <Sun className="w-6 h-6 text-primary" /> : <Moon className="w-6 h-6 text-secondary" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-darkBg shadow-lg flex flex-col items-center py-4 space-y-4"
                >
                    <a href="tel:+359898447853" className="flex items-center text-primary dark:text-secondary hover:text-accent dark:hover:text-accent transition">
                        <Phone className="w-5 h-5 mr-1" /> +359 89 844 7853
                    </a>
                    <a href="mailto:unique6.tools@gmail.com" className="flex items-center text-primary dark:text-secondary hover:text-accent dark:hover:text-accent transition">
                        <Mail className="w-5 h-5 mr-1" /> unique6.tools@gmail.com
                    </a>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-accent dark:hover:bg-accent transition-all"
                    >
                        {darkMode ? <Sun className="w-6 h-6 text-primary" /> : <Moon className="w-6 h-6 text-secondary" />}
                    </button>
                </motion.div>
            )}
        </motion.nav>
    );
}
