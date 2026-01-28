/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output as static site for simple hosting
  output: 'export',

  // Base path if hosted at subdirectory
  // basePath: '/ai-tree',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Strict mode for better development
  reactStrictMode: true,
};

module.exports = nextConfig;
