# GPA 历史数据补充功能

## 问题分析

用户需求：在 GPA 详情页（`/profile/gpa`）通过 AI 球交互补充历史 GPA 数据。

当前状态：
- GPA 页面有硬编码的历史数据点（S1, S2）
- AI 球可以展开显示建议，但没有历史数据补充功能
- 图表使用固定的 SVG 路径，不支持动态数据

## 解决方案

实现一个完整的历史 GPA 数据管理系统：

1. **数据结构**：创建历史 GPA 数据的接口和状态管理
2. **模态框组件**：创建用于输入历史 GPA 的模态框（支持自定义学期名称）
3. **AI 球交互**：在 AI 球展开状态添加"补充历史 GPA"按钮
4. **图表更新**：将图表改为可滚动/动态布局，支持显示所有历史数据点
5. **数据持久化**：使用 localStorage 保存历史数据（可选）

## 修改内容

### 1. 创建历史 GPA 数据接口（在 `app/profile/gpa/page.tsx`）

```typescript
interface HistoryGPAData {
  id: string;
  semester: string; // 自定义学期名称（如 "Fall 2023", "S1", "Year 1"）
  gpa: number;
  year?: string; // 可选：年份
}

// 添加到组件状态
const [historyGPA, setHistoryGPA] = useState<HistoryGPAData[]>([
  { id: "1", semester: "S1", gpa: 3.5 },
  { id: "2", semester: "S2", gpa: 3.6 },
]);
```

### 2. 创建历史 GPA 输入模态框组件（新建 `components/profile/GPAHistoryModal.tsx`）

功能：
- 输入学期名称（文本输入）
- 输入 GPA 值（0.0 - 4.0，数字输入或滑块）
- 可选：年份选择器
- 添加/编辑/删除历史记录
- 列表显示所有历史记录

### 3. 修改 AI 球展开状态（在 `app/profile/gpa/page.tsx`）

在展开的 AI 球卡片中添加新按钮：
- 在现有的 "View Study Plan" 按钮下方或旁边
- 添加 "Add History GPA" 或 "补充历史成绩" 按钮
- 点击后打开历史 GPA 输入模态框

### 4. 更新图表渲染逻辑（在 `app/profile/gpa/page.tsx`）

将固定的 SVG 图表改为：
- 根据历史 GPA 数据动态生成数据点
- 使用可滚动的容器或自适应宽度的 SVG
- 动态计算坐标位置
- 显示所有历史数据点（S1, S2, S3...）
- 保持当前点和预测点的显示

### 5. 数据持久化（可选）

使用 localStorage 保存历史 GPA 数据：
- 保存到 `localStorage.setItem('gpa_history', JSON.stringify(historyGPA))`
- 组件加载时从 localStorage 读取

## 预期效果

- 用户点击 AI 球，看到"补充历史 GPA"选项
- 点击后打开模态框，可以输入学期名称和 GPA 值
- 添加后，图表自动更新，显示新的历史数据点
- 图表可以滚动显示所有历史记录
- 数据在页面刷新后仍然保留

## 注意事项

- 确保图表坐标计算正确（GPA 4.0 对应图表的顶部）
- 历史数据需要按时间顺序排序
- 模态框需要良好的表单验证
- 考虑限制历史数据的数量（如最多 20 条）
- 保持与现有设计风格一致

## 实施步骤

1. 创建 `GPAHistoryModal` 组件
2. 在 `GPAPage` 中添加历史 GPA 状态管理
3. 修改 AI 球展开状态，添加按钮
4. 实现图表动态渲染逻辑
5. 添加数据持久化（可选）
6. 测试和调整

