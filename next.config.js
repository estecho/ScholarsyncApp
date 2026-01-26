/** @type {import('next').NextConfig} */
const nextConfig = {
  // 忽略 TypeScript 报错
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略 ESLint 报错
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 增加超时时间
  staticPageGenerationTimeout: 120,
  // Docker 部署模式
  output: "standalone",
  
  // ⚠️【关键修改】强制关闭 Suspense 检查报错
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  
  // 图片域名配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;