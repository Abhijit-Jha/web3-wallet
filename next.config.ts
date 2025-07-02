import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.microlink.io"],
  },

  webpack(config: Configuration) {
    // ✅ Enable WebAssembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // ✅ Set rule for .wasm files
    config.module?.rules?.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    // ✅ Optional: Ensure target is modern (but not necessary)
    // config.target = ["web", "es2022"]; // comment this out if causing issues

    return config;
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  
};

export default nextConfig;
