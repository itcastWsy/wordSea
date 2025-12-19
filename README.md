# WordSea - 专业词云可视化工具

WordSea 是一个简洁、强大的在线词云生成工具。它可以将您输入的文本内容智能分析，提取关键词并生成精美的词云图片。支持中英文混合分词，提供多种形状选择，是文本可视化和数据展示的得力助手。

## ✨ 主要功能

- **智能分词**：自动识别中文和英文内容，统计词频。
- **多种形状**：内置多种词云形状，包括：
  - 圆形 (Circle)
  - 心形 (Cardioid)
  - 星星 (Star)
  - 方形 (Square)
  - 菱形 (Diamond)
  - 三角形 (Triangle)
  - 五边形 (Pentagon)
- **即时预览**：输入文本后点击生成，立即在画布上看到效果。
- **图片导出**：支持将生成的词云下载为图片格式，方便分享和使用。
- **历史记录**：自动保存生成历史，方便随时回溯查看。
- **完全免费**：基于纯前端技术开发，无后台数据存储，安全隐私。

## 🚀 快速开始

### 在线使用
```
https://wordsea.zbztb.cn/
```



### 本地运行

WordSea 是一个纯静态网页应用，无需复杂的后端环境配置。

1. **克隆项目**
   ```bash
   git clone git@github.com:itcastWsy/wordSea.git
   ```

2. **打开应用**
   直接在浏览器中打开 `index.html` 文件即可使用。

   或者使用 VS Code 的 Live Server 插件运行，以获得更好的开发体验。

## 🛠️ 技术栈

- **HTML5 / CSS3**: 构建响应式用户界面。
- **JavaScript (ES6+)**: 处理核心逻辑和交互。
- **[wordcloud2.js](https://github.com/timdream/wordcloud2.js)**: 强大的词云生成库。
- **[html2canvas](https://html2canvas.hertzen.com/)**: 用于将 DOM 元素转换为 Canvas 进行截图下载。

## 📖 使用指南

1. **输入文本**：在左侧文本框中粘贴或输入您想要分析的文章、评论或关键词列表。
2. **生成词云**：点击"生成词云"按钮，系统将自动分析并渲染。
3. **调整样式**：在右侧控制面板选择不同的形状，词云会实时更新。
4. **下载保存**：点击顶部导航栏的下载图标，将当前词云保存为图片。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进 WordSea！

1. Fork 本仓库
2. 新建 feature 分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## � 作者信息

- **博客**: [https://blog.zbztb.cn/](https://blog.zbztb.cn/)
- **邮箱**: [yeah126139163@163.com](mailto:yeah126139163@163.com)
- **微信**: w846903522
- **公众号**: HarmonyOS 万少

## �📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。
