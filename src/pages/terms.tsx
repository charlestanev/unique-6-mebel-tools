import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 text-gray-900 dark:text-gray-100">
                <h1 className="text-3xl font-bold mb-4">Общи условия</h1>
                <p className="mb-4">
                    Тези Общи условия уреждат използването на този уебсайт. Използвайки сайта, вие се съгласявате с тях.
                </p>

                <h2 className="text-2xl font-semibold mb-2">1. Условия за ползване</h2>
                <p className="mb-4">
                    Потребителите трябва да използват сайта добросъвестно и да не нарушават законите или правата на трети страни.
                </p>

                <h2 className="text-2xl font-semibold mb-2">2. Права и задължения</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Потребителите могат да разглеждат съдържанието свободно.</li>
                    <li>Копирането на съдържание без разрешение е забранено.</li>
                    <li>Не носим отговорност за щети, причинени от използването на сайта.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">3. Ограничаване на отговорността</h2>
                <p className="mb-4">
                    Собственикът на сайта не носи отговорност за загуби, възникнали в резултат на неправилна употреба на услугите.
                </p>

                <h2 className="text-2xl font-semibold mb-2">4. Интелектуална собственост</h2>
                <p className="mb-4">
                    Всички права върху съдържанието на този уебсайт принадлежат на "Уникат 6". Всяко неразрешено използване е забранено.
                </p>

                <h2 className="text-2xl font-semibold mb-2">5. Промени в условията</h2>
                <p className="mb-4">
                    Запазваме си правото да променяме тези условия по всяко време. Продължавайки да използвате сайта, вие се съгласявате с тях.
                </p>

                <p className="mt-6">
                    <Link href="/" className="text-blue-500 hover:underline">⬅ Върни се към началната страница</Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
