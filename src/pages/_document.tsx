import { Html, Head, Main, NextScript, DocumentProps } from "next/document";

const GA_ID = "G-C8LZ8WJQ3L";

export default function Document(props: DocumentProps) {
    const locale = props.__NEXT_DATA__?.locale || "bg";

    return (
        <Html lang={locale}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#7F5AF0" />
                <meta name="google-site-verification" content="lFIEqLuWRExrbGVq7ZXQT9Q8M3yE-jhWYQ5U5bPKRC4" />
                <link rel="icon" href="/favicon.ico" />
                {/* Google Analytics */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
