// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="bg">
            <Head>
                <meta name="google-site-verification" content="lFIEqLuWRExrbGVq7ZXQT9Q8M3yE-jhWYQ5U5bPKRC4" />
                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-C8LZ8WJQ3L"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C8LZ8WJQ3L');
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
