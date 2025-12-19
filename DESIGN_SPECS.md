# WordSea 设计规范文档 (Design Specifications)

本文档详细描述了 WordSea 2.0 版本的视觉设计系统和组件规范。

## 1. 色彩体系 (Color System)

采用 Sky Blue 作为主色调，传递专业、清新、科技感；Amber 作为强调色，用于高亮和提示。

### 品牌色 (Brand Colors)
| 变量名 | 色值 | 用途 |
| :--- | :--- | :--- |
| `--primary-50` | `#f0f9ff` | 极浅背景，hover 状态 |
| `--primary-100` | `#e0f2fe` | 浅色背景，选中状态 |
| `--primary-500` | `#0ea5e9` | **主品牌色**，按钮背景，图标 |
| `--primary-600` | `#0284c7` | 主色悬停，深色背景 |
| `--primary-700` | `#0369a1` | 激活状态，深色文字 |

### 辅助色 (Accent Colors)
| 变量名 | 色值 | 用途 |
| :--- | :--- | :--- |
| `--accent-500` | `#f59e0b` | 警告，高亮，图表强调 |
| `--accent-600` | `#d97706` | 辅助色深色 |

### 中性色 (Neutral Colors)
基于 Slate 色系，提供冷色调的灰度，适配科技风格。
| 变量名 | 色值 | 用途 |
| :--- | :--- | :--- |
| `--slate-50` | `#f8fafc` | 页面背景 (`--bg-body`) |
| `--slate-100` | `#f1f5f9` | 组件背景，悬停 |
| `--slate-200` | `#e2e8f0` | 边框 (`--border-light`) |
| `--slate-300` | `#cbd5e1` | 禁用状态，滚动条 |
| `--slate-500` | `#64748b` | 次要文字 (`--text-muted`) |
| `--slate-800` | `#1e293b` | 主要文字 (`--text-main`) |

### 功能色 (Functional Colors)
| 变量名 | 色值 | 用途 |
| :--- | :--- | :--- |
| `--danger-500` | `#ef4444` | 错误，删除操作 |
| `--success-500`| `#10b981` | 成功提示 (Tailwind emerald-500) |

## 2. 字体排印 (Typography)

### 字体家族
优先使用系统默认无衬线字体，确保加载速度和跨平台一致性。
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 层级规范
| 元素 | 大小 (Size) | 字重 (Weight) | 行高 (Line Height) |
| :--- | :--- | :--- | :--- |
| 品牌 Logo | 20px | 700 (Bold) | 1.2 |
| 标题 H3 | 16px | 600 (SemiBold)| 1.4 |
| 正文 | 15px | 400 (Regular)| 1.6 |
| 按钮文字 | 14px | 500 (Medium) | 1.0 |
| 辅助文字 | 13px | 400 (Regular)| 1.5 |

## 3. 布局与间距 (Layout & Spacing)

### 栅格系统
- **Desktop (>1024px)**: 双栏布局，左侧工作区 (`flex: 1`)，右侧边栏 (`340px`)。
- **Tablet/Mobile (<1024px)**: 单栏流式布局，上下堆叠。

### 间距变量
- 页面内边距: `32px` (Desktop) / `16px` (Mobile)
- 组件间距: `24px` (Section gap) / `16px` (Element gap) / `8px` (Icon gap)

### 圆角 (Border Radius)
| 变量名 | 数值 | 用途 |
| :--- | :--- | :--- |
| `--radius-sm` | `6px` | 按钮，小标签 |
| `--radius-md` | `12px` | 输入框，卡片，Toast |
| `--radius-lg` | `16px` | 主面板容器 |

### 阴影 (Shadows)
采用多层阴影叠加，营造柔和的深度感。
- `--shadow-sm`: 基础组件（卡片）
- `--shadow-md`: 悬浮状态
- `--shadow-glow`: 聚焦/高亮状态 (Primary color glow)

## 4. 组件规范 (Components)

### 按钮 (Buttons)
- **Primary**: 渐变背景 (`linear-gradient`)，白色文字，带轻微投影。
- **Ghost/Text**: 透明背景，深色文字，Hover 时显示浅灰背景。
- **Icon**: 圆形按钮，40x40px，Hover 时显示浅色背景。

### 输入框 (Inputs & Textarea)
- 无边框风格，依赖背景色区分。
- Focus 状态：显示 `--shadow-glow` 和主色边框。

### 卡片 (Cards/Panels)
- 背景色：`#ffffff`
- 边框：1px solid `--slate-200`
- 头部：带底部分割线，包含图标标题和操作区。

### 反馈组件 (Feedback)
- **Toast**: 右上角滑入 (`slideIn`)，带状态图标（成功/失败），3秒自动消失。
- **Loading Overlay**: 全屏/局部遮罩，毛玻璃效果 (`backdrop-filter: blur`)，居中 Spinner。

## 5. 动画 (Animations)

| 名称 | 持续时间 | 缓动函数 | 用途 |
| :--- | :--- | :--- | :--- |
| `fadeIn` | 0.5s | ease | 页面元素入场 |
| `slideIn` | 0.3s | ease | Toast 通知滑入 |
| `spin` | 1s | linear | Loading 旋转 |
| Transition | 0.15s | ease | 按钮 Hover，颜色变化 |
| Transition | 0.25s | cubic-bezier | 面板展开，布局变化 |
