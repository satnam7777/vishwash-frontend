import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ IMPORTANT: prevents static export & prerendering
  output: "standalone",
};

export default nextConfig;
