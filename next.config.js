/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.traction.one',
      'pokemon-evolution.vercel.app',
      'cdn.traction.one/pokedex/',
    ],
  },
}

module.exports = nextConfig
