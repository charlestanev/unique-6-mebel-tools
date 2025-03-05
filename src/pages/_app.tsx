import type { AppProps } from "next/app";
import { Provider, useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import "../styles/globals.css";
import { useEffect } from "react";

function ThemeWrapper() {
    const [isDarkMode] = useAtom(darkModeAtom);

    useEffect(() => {
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
