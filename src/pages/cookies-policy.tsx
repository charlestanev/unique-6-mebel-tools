import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPolicy() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6 text-gray-900 dark:text-gray-100">
                <h1 className="text-3xl font-bold mb-4">Политика за бисквитки</h1>
                <p className="mb-4">
                    Този уебсайт използва бисквитки, за да подобри потребителското изживяване.
                    Продължавайки да използвате нашия уебсайт, вие се съгласявате с използването на бисквитки в съответствие с тази политика.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Какво представляват бисквитките?</h2>
                <p className="mb-4">
                    Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство, когато посещавате даден уебсайт.
                    Те помагат за запазване на предпочитанията ви и подобряване на функционалността на сайта.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Какви бисквитки използваме?</h2>
                <ul className="list-disc list-inside mb-4">
                    <li><strong>Необходими бисквитки</strong> – Без тях сайтът не може да функционира правилно.</li>
                    <li><strong>Аналитични бисквитки</strong> – Помагат ни да разберем как потребителите използват сайта.</li>
                    <li><strong>Функционални бисквитки</strong> – Запазват вашите предпочитания (напр. езикови настройки).</li>
                    <li><strong>Маркетингови бисквитки</strong> – Използват се за персонализирана реклама.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Как да управлявате бисквитките?</h2>
                <p className="mb-4">
                    Можете да управлявате или изтривате бисквитките чрез настройките на вашия браузър.
                    Повече информация можете да намерите на <a href="https://www.aboutcookies.org/" className="text-blue-500 hover:underline" target="_blank">www.aboutcookies.org</a>.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Промени в политиката</h2>
                <p className="mb-4">
                    Запазваме си правото да променяме тази политика за бисквитки по всяко време.
                    Всички промени ще бъдат публикувани на тази страница.
                </p>

                <p className="mt-6">
                    <Link href="/" className="text-blue-500 hover:underline">⬅ Върни се към началната страница</Link>
                </p>
            </div>
            <Footer />
        </>
    );
}
