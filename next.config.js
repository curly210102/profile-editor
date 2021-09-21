module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "github-readme-stats.vercel.app",
      "img.shields.io",
      "raw.githubusercontent.com",
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
