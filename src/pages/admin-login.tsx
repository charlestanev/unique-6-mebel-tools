import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "@/store";

export default function AdminLogin() {
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
            setError("❌ Невалидни данни за вход");
        }
        setIsLoading(false);
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">🔑 Вход за администратори</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleLogin} className="mb-6 p-4 border rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <input
                    className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
                <input
                    className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 dark:text-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Влизане..." : "🔓 Вход"}
                </button>
            </form>
        </div>
    );
}
