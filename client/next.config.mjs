/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '**',
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
