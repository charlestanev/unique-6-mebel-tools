import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { Provider, useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import "../styles/globals.css";
import { useEffect } from "react";

const poppins = Poppins({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-poppins",
});

function ThemeWrapper() {
    const [isDarkMode] = useAtom(darkModeAtom);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return null;
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <ThemeWrapper />
            <div className={poppins.variable}>
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

export default appWithTranslation(MyApp);
