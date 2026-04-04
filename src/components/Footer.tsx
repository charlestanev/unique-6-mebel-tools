import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { useTranslation } from "next-i18next";

export default function Footer() {
    const { t } = useTranslation("common");

    return (
        <footer className="w-full bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 shadow-md">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                <div className="flex flex-col items-center md:items-start">
                    <Link href="/" className="flex items-center">
                        <Image src="/images/logo.svg" alt={t("brand.logoAlt")} width={160} height={50} />
                    </Link>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {t("footer.copyright", { year: new Date().getFullYear() })}
                    </p>
                </div>

                <div className="flex flex-col text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-2">{t("footer.infoHeading")}</h3>
                    <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">{t("footer.privacyPolicy")}</Link>
                    <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">{t("footer.terms")}</Link>
                    <Link href="/cookies-policy" className="text-blue-600 dark:text-blue-400 hover:underline">{t("footer.cookiesPolicy")}</Link>
                </div>

                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <h3 className="text-lg font-semibold mb-2">{t("footer.contactHeading")}</h3>
                    <a href="tel:+359898447853" className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        <Phone className="w-5 h-5 mr-2" /> +359 89 844 7853
                    </a>
                    <a href="mailto:unique6.tools@gmail.com" className="flex items-center text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 mt-1">
                        <Mail className="w-5 h-5 mr-2" /> unique6.tools@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
