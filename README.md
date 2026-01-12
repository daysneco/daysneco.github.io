# Justin's Blog

基于 Jekyll 的个人博客，托管在 GitHub Pages 上。

## 特性

- 简洁的极简设计风格
- 响应式布局，支持移动端
- 支持 Markdown 格式写作
- 标签分类功能
- 代码高亮支持

## 本地运行

### 安装依赖

```bash
bundle install
```

### 启动服务

```bash
bundle exec jekyll serve
```

访问 http://localhost:4000 查看效果。

## 写作

在 `_posts` 目录下创建 Markdown 文件，文件名格式为 `YYYY-MM-DD-title.md`。

文章开头需要添加 Front Matter：

```yaml
---
layout: post
title: "文章标题"
date: 2025-01-12 10:00:00 +0800
categories: [分类名称]
---

文章内容...
```

## 部署

代码推送到 GitHub 后，GitHub Pages 会自动构建并发布。

```bash
git add .
git commit -m "Add new post"
git push
```

## 项目结构

```
├── _includes/   # 可复用的组件
├── _layouts/    # 页面布局模板
├── _posts/      # 博客文章
├── _sass/       # Sass 样式源文件
├── css/         # 编译后的 CSS
├── js/          # JavaScript 文件
├── index.md     # 首页
├── tags.md      # 标签页
└── _config.yml  # Jekyll 配置
```

## 设计参考

- [tw93.fun](https://tw93.fun/) - 首页设计风格
- [manateelazycat.github.io](https://manateelazycat.github.io/) - 标签页设计风格
