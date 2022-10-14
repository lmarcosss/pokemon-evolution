/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.traction.one', 'epackoug.sirv.com'],
  },
}

module.exports = nextConfig
