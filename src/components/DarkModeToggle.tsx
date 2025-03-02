import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? "Светла тема" : "Тъмна тема"}
        </button>
    );
}
