import Head from "next/head";
import { useRouter } from "next/router";

interface SEOHeadProps {
    title: string;
    description: string;
    noindex?: boolean;
}

const SITE_URL = "https://www.unique6.tools";
const OG_IMAGE = `${SITE_URL}/images/logo.svg`;

export default function SEOHead({ title, description, noindex }: SEOHeadProps) {
    const { locale, asPath } = useRouter();
    const bgPath = asPath === "/" ? "" : asPath;
    const enPath = `/en${bgPath}`;
    const canonicalUrl = locale === "en" ? `${SITE_URL}${enPath}` : `${SITE_URL}${bgPath}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* hreflang for i18n */}
            <link rel="alternate" hrefLang="bg" href={`${SITE_URL}${bgPath}`} />
            <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
            <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${bgPath}`} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={OG_IMAGE} />
            <meta property="og:site_name" content="Unique6 Tools" />
            <meta property="og:locale" content={locale === "en" ? "en_US" : "bg_BG"} />
            <meta property="og:locale:alternate" content={locale === "en" ? "bg_BG" : "en_US"} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={OG_IMAGE} />

            {noindex && <meta name="robots" content="noindex, nofollow" />}
        </Head>
    );
}
