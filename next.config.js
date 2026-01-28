const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles Next.js natively - no static export needed
  // output: 'export', // Uncomment only for non-Vercel static hosting

  // Strict mode for better development
  reactStrictMode: true,

  // Image optimization works on Vercel
  images: {
    // Add domains if you use external images
    // domains: ['example.com'],
  },
};

module.exports = withNextIntl(nextConfig);
