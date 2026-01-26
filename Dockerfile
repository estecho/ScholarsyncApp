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

# 7. 暴露端口
EXPOSE 3000
ENV PORT 3000

# 8. 启动应用
CMD ["node", ".next/standalone/server.js"]