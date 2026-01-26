# ---------------------------------------------------
# 修复白屏版 Dockerfile
# ---------------------------------------------------

# 1. 使用 Node.js 18 镜像
FROM node:18-alpine

# 2. 设置工作目录
WORKDIR /app

# 3. 复制 package.json
COPY package*.json ./

# 4. 安装依赖
RUN npm install --legacy-peer-deps

# 5. 复制所有源代码
COPY . .

# 6. 构建 Next.js 应用
RUN npm run build

# ==========================================
# 👇 关键修复步骤在这里 👇
# 手动把静态资源复制到 standalone 目录，否则浏览器找不到 JS 文件
# ==========================================
RUN cp -r public .next/standalone/public || true
RUN cp -r .next/static .next/standalone/.next/static || true

# 7. 暴露端口
EXPOSE 3000
ENV PORT 3000

# 8. 启动应用 (改为使用 standalone 模式启动，配合 next.config.js)
CMD ["node", ".next/standalone/server.js"]