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
        hostname: 'ergowork.my.id',
        protocol: 'https',
        pathname: '**',
      },
      {
        hostname: 'app.sandbox.midtrans.com',
        protocol: 'https',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
