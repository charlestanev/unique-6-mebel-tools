/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://www.unique6.tools",
    generateRobotsTxt: true,
    exclude: ["/admin", "/admin-login", "/404", "/en/admin", "/en/admin-login", "/en/404"],
    alternateRefs: [
        { href: "https://www.unique6.tools", hreflang: "bg" },
        { href: "https://www.unique6.tools", hreflang: "en" },
    ],
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" },
            { userAgent: "*", disallow: ["/admin", "/admin-login", "/api/"] },
        ],
    },
};
