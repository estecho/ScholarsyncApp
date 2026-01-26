/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 增加构建超时时间
  staticPageGenerationTimeout: 120,
  // 尝试使用 standalone 模式
  output: "standalone",
};

module.exports = nextConfig;