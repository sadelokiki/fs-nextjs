/** @type {import('next').NextConfig} */
const nextConfig = {
    // Skip ESLint errors during production builds on Vercel
    eslint: {
      ignoreDuringBuilds: true,
    },
  
    // Optional: skip type errors in production too (helps when Vercel parses TS as JS)
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;
  