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
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

            // Set theme based on saved preference or system preference
            const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
            setIsDarkMode(shouldBeDark);
            document.documentElement.classList.toggle("dark", shouldBeDark);
        }
    }, []);

    // Save the theme to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

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
