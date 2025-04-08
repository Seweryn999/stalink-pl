/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://stalink.pl",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
