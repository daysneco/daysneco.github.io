---
layout: post
title: "Jekyll 博客搭建指南"
date: 2025-01-11 14:30:00 +0800
categories: [Tech]
---

本文介绍如何使用 Jekyll 搭建个人博客。

## 为什么选择 Jekyll

Jekyll 是一个静态站点生成器，具有以下优点：

- **简单易用**：使用 Markdown 编写文章
- **免费托管**：GitHub Pages 原生支持
- **快速部署**：无需数据库，纯静态文件
- **高度可定制**：支持自定义主题和样式

## 基本结构

一个典型的 Jekyll 站点包含以下目录：

```
├── _includes/   # 可复用的组件
├── _layouts/    # 页面布局模板
├── _posts/      # 博客文章
├── _sass/       # Sass 样式文件
├── css/         # 编译后的 CSS
└── _config.yml  # 站点配置
```

## 写作

在 `_posts` 目录下创建 Markdown 文件，文件名格式为 `YYYY-MM-DD-title.md`。

文章的开头需要添加 Front Matter：

```yaml
---
layout: post
title: "文章标题"
date: 2025-01-11 10:00:00 +0800
categories: [Tech]
---
```

## 部署

将代码推送到 GitHub 仓库，GitHub Pages 会自动构建并发布站点。

```bash
git add .
git commit -m "Add new post"
git push
```
