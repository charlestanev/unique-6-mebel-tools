import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "@/store";

export default function LogoutButton() {
    const router = useRouter();
    const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        setIsAuthenticated(false);
        router.replace("/admin-login");
    }

    return (
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
            Изход
        </button>
    );
}
