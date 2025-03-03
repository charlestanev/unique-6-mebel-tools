import { useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                setIsDarkMode(true);
                document.documentElement.classList.add("dark");
            }
        }
    }, [setIsDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-primary dark:hover:bg-accent transition-all shadow-lg"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
        >
            {isDarkMode ? "🌞 Светла" : "🌙 Тъмна"}
        </motion.button>
    );
}
