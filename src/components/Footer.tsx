import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 text-center shadow-md">
            <p className="font-semibold">Уникат 6 © {new Date().getFullYear()} Всички права запазени.</p>

            {/* Навигационни линкове */}
            <div className="flex justify-center gap-6 mt-3">
                <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Политика за поверителност</Link>
                <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Общи условия</Link>
                <Link href="/cookies-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Политика за бисквитки</Link>
            </div>

            {/* Контактна информация */}
            <div className="mt-4">
                <a href="tel:+359898447853" className="block text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    📞 +359 89 844 7853
                </a>
                <a href="mailto:charlestanev.dev@gmail.com" className="block text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    ✉ charlestanev.dev@gmail.com
                </a>
            </div>
        </footer>
    );
}
