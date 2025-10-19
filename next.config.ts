import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // разрешить все HTTPS-домены
      },
      {
        protocol: 'http',
        hostname: '**', // если где-то используются HTTP-ссылки
      },
    ],
  },
};

export default nextConfig;
