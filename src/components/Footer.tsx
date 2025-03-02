import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 text-center">
            <p>Уникат 6 © {new Date().getFullYear()} Всички права запазени.</p>

            <div className="flex justify-center gap-6 mt-3">
                <Link href="/privacy-policy" className="text-blue-500 hover:underline">Политика за поверителност</Link>
                <Link href="/terms" className="text-blue-500 hover:underline">Общи условия</Link>
                <Link href="/cookies-policy" className="text-blue-500 hover:underline">Политика за бисквитки</Link>
            </div>

            {/* Контактна информация */}
            <div className="mt-4">
                <a href="tel:+359898447853" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">📞 +359 89 844 7853</a>
                <a href="mailto:charlestanev.dev@gmail.com" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">✉ charlestanev.dev@gmail.com</a>
            </div>
        </footer>
    );
}
