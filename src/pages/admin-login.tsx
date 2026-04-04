import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { isAuthenticatedAtom } from "@/store";
import SEOHead from "@/components/SEOHead";

export default function AdminLogin() {
    const { t } = useTranslation("common");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            setIsAuthenticated(true);
            router.replace("/admin");
        } else {
            setError(t("login.errorInvalid"));
        }
        setIsLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-light p-6">
            <SEOHead title="Admin Login | Unique6 Tools" description="Admin login" noindex />
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">{t("login.title")}</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            type="text"
                            placeholder={t("login.usernamePlaceholder")}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <input
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            type="password"
                            placeholder={t("login.passwordPlaceholder")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? t("login.loadingButton") : t("login.submitButton")}
                    </button>
                </form>
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "bg", ["common"])),
    },
});
