# ScholarSync

ScholarSync 是一个移动端校园生活 Web App。

## 技术栈

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Material Symbols (Google Fonts)

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

- `app/` - Next.js App Router 目录
- `components/` - React 组件
- `lib/` - 工具函数和库
- `public/` - 静态资源

## Tailwind CSS 配置

项目使用了自定义的 Tailwind 配置，包括：

- 自定义颜色（primary, background-light, background-dark 等）
- 自定义字体（Inter, Lexend, Noto Sans）
- 自定义动画（fade-in-down）
- 自定义背景渐变（soft-mesh, light-mesh, electric-gradient）
- 自定义阴影效果（soft, glow, action, glass）

## 暗黑模式

项目支持暗黑模式，使用 Tailwind 的 `class` 策略。可以通过在 `<html>` 标签上添加或移除 `dark` 类来切换。






