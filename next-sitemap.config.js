/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://framedle.org",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ["/health-check", "/api/*"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/health-check", "/api"],
            },
        ],
    },
};
