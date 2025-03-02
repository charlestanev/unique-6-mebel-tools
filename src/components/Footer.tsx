import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center mb-4 md:mb-0">
                    <Image src="/images/logo.png" alt="Уникат 6" width={150} height={40} />
                </Link>

                {/* Navigation Links */}
                <div className="flex space-x-6 text-sm">
                    <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Политика за поверителност</Link>
                    <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Общи условия</Link>
                    <Link href="/cookies-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Политика за бисквитки</Link>
                </div>

                {/* Contact Information */}
                <div className="text-center md:text-right mt-4 md:mt-0">
                    <p className="text-sm">Уникат 6 © {new Date().getFullYear()} Всички права запазени.</p>
                    <a href="tel:+359898447853" className="block text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        📞 +359 89 844 7853
                    </a>
                    <a href="mailto:charlestanev.dev@gmail.com" className="block text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        ✉ unique6.tools@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
