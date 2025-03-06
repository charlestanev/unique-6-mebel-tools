import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CookiesPolicy() {
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
                    Политика за бисквитки
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-lg text-center"
                >
                    Този уебсайт използва бисквитки, за да подобри потребителското изживяване. Продължавайки да използвате нашия уебсайт, вие се съгласявате с използването на бисквитки в съответствие с тази политика.
                </motion.p>

                <div className="mt-8 space-y-6">
                    <Section title="Какво представляват бисквитките?">
                        <p>
                            Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство, когато посещавате даден уебсайт. Те помагат за запазване на предпочитанията ви и подобряване на функционалността на сайта.
                        </p>
                    </Section>

                    <Section title="Какви бисквитки използваме?">
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Необходими бисквитки</strong> – Без тях сайтът не може да функционира правилно.</li>
                            <li><strong>Аналитични бисквитки</strong> – Помагат ни да разберем как потребителите използват сайта.</li>
                            <li><strong>Функционални бисквитки</strong> – Запазват вашите предпочитания (напр. езикови настройки).</li>
                            <li><strong>Маркетингови бисквитки</strong> – Използват се за персонализирана реклама.</li>
                        </ul>
                    </Section>

                    <Section title="Как да управлявате бисквитките?">
                        <p>
                            Можете да управлявате или изтривате бисквитките чрез настройките на вашия браузър. Повече информация можете да намерите на
                            <a href="https://www.aboutcookies.org/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                {" "}www.aboutcookies.org
                            </a>.
                        </p>
                    </Section>

                    <Section title="Промени в политиката">
                        <p>
                            Запазваме си правото да променяме тази политика за бисквитки по всяко време. Всички промени ще бъдат публикувани на тази страница.
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
