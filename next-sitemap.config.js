/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://namui-wiki.life',
  autoLastmod: true,
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    includeNonIndexSitemaps: true,
    policies: [
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
