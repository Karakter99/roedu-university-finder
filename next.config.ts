/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // <--- Required for 'next/image' in static export
  },
};

module.exports = nextConfig;
