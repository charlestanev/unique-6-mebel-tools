import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

export default function Custom404() {
    const { t } = useTranslation("common");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-darkBg text-gray-900 dark:text-gray-100">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <p className="text-xl mt-2">{t("error.pageNotFound")}</p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:opacity-90 transition"
            >
                {t("error.backToHome")}
            </Link>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "bg", ["common"])),
    },
});
