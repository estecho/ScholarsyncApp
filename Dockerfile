# ---------------------------------------------------
# 修复白屏 404 终极版 Dockerfile
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
# 👇 核心修复逻辑 (严格执行) 👇
# ==========================================

# 第一步：必须先创建目标目录！(这是之前失败的原因)
# -p 参数意味着如果父目录不存在，就顺便一起创建
RUN mkdir -p .next/standalone/.next/static
RUN mkdir -p .next/standalone/public

# 第二步：复制静态资源
# 我们去掉了 "|| true"，如果复制失败，构建会直接报错，方便排查
RUN cp -r .next/static/* .next/standalone/.next/static/
RUN cp -r public/* .next/standalone/public/

# ==========================================

# 7. 暴露端口
EXPOSE 3000
ENV PORT 3000

# 8. 启动应用 (Standalone 模式)
CMD ["node", ".next/standalone/server.js"]