import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // <-- add this
      // "another-domain.com",
    ],
    // loader: "default",      // you can leave these at their defaults
    // path: "/_next/image",
  },
  /* config options here */
};

export default nextConfig;
