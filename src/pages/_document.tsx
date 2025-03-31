// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="bg">
            <Head>
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
