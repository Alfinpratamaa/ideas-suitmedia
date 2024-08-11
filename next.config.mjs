/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.suitdev.com",
        port: "",
        pathname: "/storage/files/**/conversions/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/image/:id/:fileName",
        destination:
          "https://assets.suitdev.com/storage/files/:id/conversions/:fileName",
      },
      {
        source: "/api/:path*",
        destination: "https://suitmedia-backend.suitdev.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
