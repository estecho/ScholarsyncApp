# ---------------------------------------------------
# 修复白屏 & 空目录报错版 Dockerfile
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
# 👇 核心修复逻辑 (由复制内容改为复制目录) 👇
# ==========================================

# 1. 复制 static 文件夹 (构建产物，肯定存在)
# cp -R 源文件夹 目标父目录
# 结果会生成: .next/standalone/.next/static
RUN cp -R .next/static .next/standalone/.next/

# 2. 复制 public 文件夹 (静态资源)
# 加上 || true 防止 public 不存在或为空时报错
# 结果会生成: .next/standalone/public
RUN cp -R public .next/standalone/ || true

# ==========================================

# 7. 暴露端口
EXPOSE 3000
ENV PORT 3000

# 8. 启动应用
CMD ["node", ".next/standalone/server.js"]