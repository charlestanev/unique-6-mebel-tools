import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import "../styles/globals.css";

function ThemeWrapper() {
    const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                setIsDarkMode(true);
                document.documentElement.classList.add("dark");
            } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove("dark");
            }
        }
    }, [setIsDarkMode]);

    return null;
}

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <ThemeWrapper />
            <Component {...pageProps} />
        </Provider>
    );
}
