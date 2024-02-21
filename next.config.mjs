/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: { images: { unoptimized: true } },
  basePath: "/caption-imagegen",
};

export default nextConfig;
