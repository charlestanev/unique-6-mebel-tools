import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { transition } from "../../utils/animations";

export default function CookieConsent() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowPopup(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setShowPopup(false);
    };

    return (
        showPopup && (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={transition}
                className="fixed bottom-5 left-5 right-5 justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-6 rounded-lg shadow-xl flex flex-col items-center gap-4 border border-gray-200 dark:border-gray-700"
            >
                <p className="text-sm md:text-base text-center md:text-left">
                    🍪 Този сайт използва бисквитки за подобряване на потребителското изживяване. Продължавайки, вие се съгласявате с нашата{" "}
                    <a href="/cookies-policy" className="underline text-primary hover:text-primary/80 transition-colors">
                        Политика за бисквитки
                    </a>.
                </p>

                <button
                    onClick={acceptCookies}
                    className="bg-primary text-white font-medium px-5 py-2 rounded-md hover:bg-purple-600 transition-all shadow-md"
                >
                    Приемам
                </button>
            </motion.div>
        )
    );
}
