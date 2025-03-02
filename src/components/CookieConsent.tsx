import { useState, useEffect } from "react";

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
            <div className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                <p>Този сайт използва бисквитки за подобряване на потребителското изживяване. Продължавайки, вие се съгласявате с нашата <a href="/cookies-policy" className="underline">Политика за бисквитки</a>.</p>
                <button onClick={acceptCookies} className="bg-blue-500 text-white px-4 py-2 rounded">Приемам</button>
            </div>
        )
    );
}
