import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 text-gray-900 dark:text-gray-100">
                <h1 className="text-3xl font-bold mb-4">Политика за поверителност</h1>
                <p className="mb-4">
                    Тази Политика за поверителност обяснява как събираме, използваме и защитаваме вашите лични данни.
                    Използвайки този уебсайт, вие се съгласявате с нашата политика.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Какви данни събираме?</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Имена</li>
                    <li>Имейл адреси</li>
                    <li>IP адреси</li>
                    <li>Информация за браузъра и устройството</li>
                    <li>Други данни, свързани с потребителското поведение</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Защо събираме вашите данни?</h2>
                <p className="mb-4">Вашите данни се използват за:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Подобряване на уебсайта и потребителското изживяване</li>
                    <li>Изпращане на важни съобщения</li>
                    <li>Маркетингови и аналитични цели</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Как защитаваме вашите данни?</h2>
                <p className="mb-4">
                    Използваме криптиране и защитни механизми, за да предотвратим неоторизиран достъп до вашите данни.
                    Вашата информация не се продава или споделя с трети страни без вашето изрично съгласие.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Вашите права</h2>
                <p className="mb-4">Вие имате право да:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Получите достъп до вашите данни</li>
                    <li>Коригирате или изтриете вашите данни</li>
                    <li>Оттеглите вашето съгласие за обработка</li>
                </ul>

                <p>
                    Ако желаете да упражните тези права, моля свържете се с нас на
                    <a href="mailto:charlestanev.dev@gmail.com" className="text-blue-500 hover:underline"> charlestanev.dev@gmail.com</a>.
                </p>

                <p className="mt-6">
                    <Link href="/" className="text-blue-500 hover:underline">⬅ Върни се към началната страница</Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
