/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/caption-imagegen",
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      child_process: false,
      net: false,
      path: false,
      tls: false,
    };

    return config;
  },
};

export default nextConfig;
