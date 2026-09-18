import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "mock.shop" },
      { protocol: "https", hostname: "apparel-plus.mock.shop" },
    ],
  },
};

export default nextConfig;
