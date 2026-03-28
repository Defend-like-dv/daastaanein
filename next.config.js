/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.tina.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
}

module.exports = config
