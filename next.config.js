/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  experiments: {
    topLevelAwait: true,
  },
  images: { domains: ["res.cloudinary.com"] },
};
