import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100 mt-14 "
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-4xl font-extrabold text-primary dark:text-secondary tracking-tight text-center"
                >
                    Политика за поверителност
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-lg text-center"
                >
                    Тази Политика за поверителност обяснява как събираме, използваме и защитаваме вашите лични данни. Използвайки този уебсайт, вие се съгласявате с нашата политика.
                </motion.p>

                <div className="mt-8 space-y-6">
                    <Section title="Какви данни събираме?">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Имена</li>
                            <li>Имейл адреси</li>
                            <li>IP адреси</li>
                            <li>Информация за браузъра и устройството</li>
                            <li>Други данни, свързани с потребителското поведение</li>
                        </ul>
                    </Section>

                    <Section title="Защо събираме вашите данни?">
                        <p>Вашите данни се използват за:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Подобряване на уебсайта и потребителското изживяване</li>
                            <li>Изпращане на важни съобщения</li>
                            <li>Маркетингови и аналитични цели</li>
                        </ul>
                    </Section>

                    <Section title="Как защитаваме вашите данни?">
                        <p>
                            Използваме криптиране и защитни механизми, за да предотвратим неоторизиран достъп до вашите данни. Вашата информация не се продава или споделя с трети страни без вашето изрично съгласие.
                        </p>
                    </Section>

                    <Section title="Вашите права">
                        <p>Вие имате право да:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Получите достъп до вашите данни</li>
                            <li>Коригирате или изтриете вашите данни</li>
                            <li>Оттеглите вашето съгласие за обработка</li>
                        </ul>
                    </Section>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-lg"
                    >
                        Ако желаете да упражните тези права, моля свържете се с нас на
                        <a href="mailto:charlestanev.dev@gmail.com" className="text-blue-500 hover:underline">
                            {" "}charlestanev.dev@gmail.com
                        </a>.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 text-center"
                    >
                        <Link href="/" className="text-blue-500 hover:underline">
                            ⬅ Върни се към началната страница
                        </Link>
                    </motion.p>
                </div>
            </motion.div>
            <Footer />
        </>
    );
}

// **Reusable Animated Section Component**
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
        >
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            {children}
        </motion.div>
    );
}
