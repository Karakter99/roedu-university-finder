/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <--- THIS IS CRITICAL FOR FIREBASE
  images: {
    unoptimized: true, // <--- Required for 'next/image' in static export
  },
};

module.exports = nextConfig;
