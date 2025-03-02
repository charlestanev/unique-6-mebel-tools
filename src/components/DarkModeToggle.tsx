import { useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleTheme}>
            {isDarkMode ? "Светла тема" : "Тъмна тема"}
        </button>
    );
}
