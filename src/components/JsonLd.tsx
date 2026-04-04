import Head from "next/head";

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Unique6 Tools",
    url: "https://www.unique6.tools",
    logo: "https://www.unique6.tools/images/logo.svg",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+359-89-844-7853",
        email: "unique6.tools@gmail.com",
        contactType: "sales",
        availableLanguage: ["Bulgarian", "English"],
    },
    address: {
        "@type": "PostalAddress",
        addressCountry: "BG",
    },
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Unique6 Tools",
    url: "https://www.unique6.tools",
    inLanguage: ["bg", "en"],
    potentialAction: {
        "@type": "SearchAction",
        target: "https://www.unique6.tools/?q={search_term_string}",
        "query-input": "required name=search_term_string",
    },
};

export function OrganizationJsonLd() {
    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </Head>
    );
}

export function WebsiteJsonLd() {
    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </Head>
    );
}
