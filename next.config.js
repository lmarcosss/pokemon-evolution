/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.traction.one',
      'cdn.traction.one/pokedex/',
      'pokeres.bastionbot.org',
    ],
  },
}

module.exports = nextConfig
