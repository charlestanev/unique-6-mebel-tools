import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

export default function Document(props: DocumentProps) {
    const locale = props.__NEXT_DATA__?.locale || "bg";

    return (
        <Html lang={locale}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#7F5AF0" />
                <meta name="google-site-verification" content="lFIEqLuWRExrbGVq7ZXQT9Q8M3yE-jhWYQ5U5bPKRC4" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
