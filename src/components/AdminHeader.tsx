import { useRouter } from "next/router";
import LogoutButton from "./LogoutButton";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store";

export default function AdminHeader() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);

    return (
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 mb-6 shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Админ Панел</h1>
            <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push("/")}>
                    Към Продуктите
                </button>
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "Светла тема" : "Тъмна тема"}
                </button>
                <LogoutButton />
            </div>
        </div>
    );
}
