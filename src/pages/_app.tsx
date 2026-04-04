import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider, useAtom } from "jotai";
import { darkModeAtom } from "@/store";
import "../styles/globals.css";
import { useEffect } from "react";

const GA_ID = "G-C8LZ8WJQ3L";

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
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
            <Component {...pageProps} />
        </Provider>
    );
}
