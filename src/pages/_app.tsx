import type { AppProps } from "next/app";
import "../styles/globals.css"; // Import global styles

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
