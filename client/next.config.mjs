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
      {
        hostname: 'ergowork.my.id',
        protocol: 'http',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
