import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Terms() {
    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100 mt-14"
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-4xl font-extrabold text-primary dark:text-secondary tracking-tight text-center"
                >
                    Общи условия
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-lg text-center"
                >
                    Тези Общи условия уреждат използването на този уебсайт. Използвайки сайта, вие се съгласявате с тях.
                </motion.p>

                <div className="mt-8 space-y-6">
                    <Section title="1. Условия за ползване">
                        <p>
                            Потребителите трябва да използват сайта добросъвестно и да не нарушават законите или правата на трети страни.
                        </p>
                    </Section>

                    <Section title="2. Права и задължения">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Потребителите могат да разглеждат съдържанието свободно.</li>
                            <li>Копирането на съдържание без разрешение е забранено.</li>
                            <li>Не носим отговорност за щети, причинени от използването на сайта.</li>
                        </ul>
                    </Section>

                    <Section title="3. Ограничаване на отговорността">
                        <p>
                            Собственикът на сайта не носи отговорност за загуби, възникнали в резултат на неправилна употреба на услугите.
                        </p>
                    </Section>

                    <Section title="4. Интелектуална собственост">
                        <p>
                            Всички права върху съдържанието на този уебсайт принадлежат на "Уникат 6". Всяко неразрешено използване е забранено.
                        </p>
                    </Section>

                    <Section title="5. Промени в условията">
                        <p>
                            Запазваме си правото да променяме тези условия по всяко време. Продължавайки да използвате сайта, вие се съгласявате с тях.
                        </p>
                    </Section>

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
