---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/08/11
articleTags: markdown,html
articleTitle: Markdown转html生成简易文档站
articleSummary: 利用 marked+mkdirp 将指定目录下的所有markdown文件批量转成html，在基于http-server实现浏览器预览。
---

<!--@include: ../../.vitepress/parts/article-child.md-->

> 目前在项目中我们经常需要维护一些 `.md` 文件，用来作为项目的说明文档，但是在预览过程中不是很友好，不能直接查看下一篇 md 文件，得重新执行预览。为了解决这种问题，提供一个node执行脚本，能够将指定目录下的md文件转成html文件，并根据目录结构生成一个菜单目录，可以快速点击查看预览。

## nodejs

依赖 `marked` + `mkdirp` 工具包。

```mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import * as mkdirp from 'mkdirp';

/**
 * ##目录使用说明##
 * inputDir 指定markdown文件夹目录
 * outputDir 默认不修改，直接在该目录下生成 .dcos 文件夹
 * templatePath 提供html模版文件，默认markdown文件夹中新建一个.html文件夹放置
 * themePath 提供markdown主题样式文件，默认直接放置在.html文件夹下
 *
 * ##目录结构说明##
 * 自动按markdown目录结构生成对应html目录
 * 忽略 .开头文件/目录，以及 .html 后缀文件
 * 目录对应的菜单项默认不作为一个可点击链接
 * 如果目录下存在 index.md 文件，目录对应菜单项将作为一个可点击链接
 */

// 处理ESM中的__dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 配置目录
const inputDir = path.join(__dirname, '../docs'); // 存放MD文件的目录
const outputDir = path.join(inputDir, '.docs'); // 输出HTML的目录
const templatePath = path.join(__dirname, '../docs/.html/template.html'); // HTML模板路径
const themePath = path.join(__dirname, '../docs/.html/theme.css'); // HTML模板路径

const BASE_URL = '/';
const isServe = !!process.argv.find(
  (item) => item.startsWith('--') && item.slice(2) === 'serve'
);
console.log(isServe ? 'serve build' : 'local build');

// 生成目录结构数据
function generateDirectoryStructure(rootDir, isFullPath = true) {
  const structure = {
    name: path.basename(rootDir),
    path: '',
    isDirectory: true,
    children: [],
  };

  function traverse(currentDir, currentStructure) {
    fs.readdirSync(currentDir).forEach((file) => {
      const fullPath = path.join(currentDir, file);
      const stats = fs.statSync(fullPath);
      const relativePath = path.relative(rootDir, fullPath);

      // 忽略隐藏文件
      if (
        file.startsWith('.') ||
        file.endsWith('.html') ||
        file.startsWith('index')
      )
        return;

      const item = {
        name: path.basename(file, stats.isDirectory() ? '' : '.md'),
        path: isFullPath
          ? fullPath.replace(/\.md$/, '.html')
          : stats.isDirectory()
            ? relativePath
            : `${relativePath.replace(/\.md$/, '.html')}`,
        children: [],
        isDirectory: stats.isDirectory(),
        isLink:
          !stats.isDirectory() ||
          fs.existsSync(path.join(fullPath, 'index.md')),
      };

      currentStructure.children.push(item);

      if (stats.isDirectory()) {
        item.children = [];
        traverse(fullPath, item);
      }
    });

    // 排序：目录在前，文件在后，按名称排序
    currentStructure.children.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  traverse(rootDir, structure);
  return structure;
}

// 生成目录HTML
function generateMenuHtml(structure, currentPath = '', collapsed = false) {
  let html = `<ul class="menu" ${collapsed ? 'data-collapsed="true"' : ''}>`;

  structure.children.forEach((item) => {
    const isActive = item.path.endsWith(currentPath);
    const isDir = item.isDirectory;
    const isLink = item.isLink;
    const hasSub = item.children && item.children.length;
    const defaultCollapsed = isDir
      ? !currentPath.startsWith(path.basename(item.path))
      : true;

    // console.log('>>>', isDir, item.path, path.basename(item.path), currentPath, defaultCollapsed)

    let href = '';

    if (!isLink) {
      href = 'javascript:void(0)';
    } else {
      if (isDir) {
        href = path.join(item.path.replace(inputDir, outputDir), 'index.html');
      } else {
        href = item.path.replace(inputDir, outputDir);
      }
      if (isServe) {
        href = href.replace(outputDir, '');
      }
    }

    html += `<li class="${isDir ? 'directory' : 'file'} ${
      isLink ? 'link' : ''
    } ${isActive ? 'active' : ''}">`;
    html += `<a href="${href}"><span class="text">${item.name.replace(
      /\.html$/,
      ''
    )}</span>${
      isDir && hasSub
        ? `<span class="arrow" ${defaultCollapsed ? 'data-collapsed="true"' : ''}></span>`
        : ''
    }</a>`;

    if (hasSub) {
      html += generateMenuHtml(item, currentPath, defaultCollapsed);
    }

    html += '</li>';
  });

  html += '</ul>';
  return html;
}

// 读取HTML模板
function getHtmlTemplate() {
  try {
    return fs.readFileSync(templatePath, 'utf8');
  } catch (e) {
    // 如果没有模板，使用默认模板
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
    <style>
        .container { display: flex; }
        .menu-container { width: 250px; border-right: 1px solid #ccc; padding: 10px; }
        .content { flex: 1; padding: 20px; }
        .menu { list-style: none; padding-left: 15px; }
        .menu li { margin: 5px 0; }
        .menu .directory > a { font-weight: bold; }
        .menu .active > a { color: #007bff; text-decoration: none; }
        .menu a { text-decoration: none; color: #333; }
        .menu a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="menu-container">{{menu}}</div>
        <div class="content">{{content}}</div>
    </div>
</body>
</html>`;
  }
}

// 处理所有文件
function processFiles() {
  const dirStructure = generateDirectoryStructure(inputDir);
  const template = getHtmlTemplate();

  // 递归处理文件
  function processDir(currentDir) {
    fs.readdirSync(currentDir).forEach((file) => {
      const fullPath = path.join(currentDir, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        processDir(fullPath);
      } else if (path.extname(file) === '.md') {
        // 处理MD文件
        const mdContent = fs.readFileSync(fullPath, 'utf8');
        const htmlContent = marked.parse(mdContent);

        // 生成输出路径
        const relativePath = path.relative(inputDir, currentDir);
        const outputPath = path.join(outputDir, relativePath);
        mkdirp.sync(outputPath);

        // 生成当前文件的相对路径
        const currentFilePath = path
          .relative(inputDir, fullPath)
          .replace(/\.md$/, '.html');

        // 生成菜单HTML
        const menuHtml = generateMenuHtml(dirStructure, currentFilePath);

        // 替换模板变量
        let finalHtml = template
          .replace('{{title}}', path.basename(file, '.md'))
          .replace('{{menu}}', menuHtml)
          .replace('{{content}}', htmlContent)
          .replace(
            '{{theme}}',
            isServe ? BASE_URL + path.basename(themePath) : themePath
          );

        // 写入HTML文件
        const htmlFile = path.join(
          outputPath,
          `${path.basename(file, '.md')}.html`
        );
        fs.writeFileSync(htmlFile, finalHtml);
        console.log(`生成: ${htmlFile}`);
      }
    });
  }

  // 处理根目录下的README.md作为首页
  const readmePath = path.join(inputDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    const mdContent = fs.readFileSync(readmePath, 'utf8');
    const htmlContent = marked.parse(mdContent);
    const menuHtml = generateMenuHtml(dirStructure, 'README.html');

    let indexHtml = template
      .replace('{{title}}', '首页')
      .replace('{{menu}}', menuHtml)
      .replace('{{content}}', htmlContent)
      .replace('{{theme}}', isServe ? path.basename(themePath) : themePath);

    mkdirp.sync(outputDir);
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
    console.log('生成: index.html');
  }

  // 处理所有文件
  processDir(inputDir);
  console.log('转换完成！');
}

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log(`目录 ${outputDir} 已成功删除`);
}

// 开始处理
processFiles();

if (isServe) {
  fs.copyFileSync(themePath, path.join(outputDir, path.basename(themePath)));
}
```

_需要根据项目自行调整目录入口_

## template模版

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>WPT|{{title}}</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="{{theme}}"
    />
    <style>
      html,
      body {
        padding: 0;
        margin: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      .container {
        display: flex;
        align-items: stretch;
        height: 100%;
        width: 100%;
      }

      .menu-container {
        flex-shrink: 0;
        width: 220px;
        border-right: 1px solid #d8d8d8;
        padding: 10px 0;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .content {
        flex: 1;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
      }

      .menu {
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: initial;
        overflow: initial;
      }

      .menu[data-collapsed] {
        max-height: 0;
        transition: all 0.25s linear;
        overflow: hidden;
      }

      .menu li {
        padding: 0;
      }

      .menu .directory > a {
        color: #181818;
        font-weight: bold;
      }

      .menu a > .text {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .menu .active > a {
        color: #007bff;
        background-color: #007bff35;
        text-decoration: none;
      }

      .menu a {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        text-decoration: none;
        color: #606266;
      }

      .menu a:hover {
        color: #007bff;
        text-decoration: none;
      }

      .menu .menu a {
        padding-left: 32px;
      }

      .arrow {
        display: inline-flex;
        height: 100%;
        width: 32px;
        align-items: center;
        justify-content: center;
      }

      .arrow::after {
        content: '';
        display: inline-block;
        border-top-width: 6px;
        border-bottom-width: 6px;
        border-right-width: 6px;
        border-left-width: 0;
        border-color: transparent #ccc transparent transparent;
        border-style: solid;
        transform: rotate(-90deg);
        transition: all 0.125s linear;
        transform-origin: center;
      }

      .arrow[data-collapsed]::after {
        transform: rotate(0);
      }
    </style>
  </head>

  <body>
    <div class="container markdown-container">
      <div class="menu-container">{{menu}}</div>
      <div class="content">{{content}}</div>
    </div>
    <script>
      window.addEventListener('DOMContentLoaded', function () {
        document.querySelector('li.active')?.scrollIntoView();
      });

      document.querySelectorAll('.directory .arrow').forEach(function (node) {
        node.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('click arrow', e);

          const arrow = e.target;
          const parent = arrow.parentElement;
          const nextSibling = parent.nextSibling;

          const collapsed = nextSibling.hasAttribute('data-collapsed');
          if (collapsed) {
            arrow.removeAttribute('data-collapsed');
            nextSibling.removeAttribute('data-collapsed');
          } else {
            arrow.setAttribute('data-collapsed', true);
            nextSibling.setAttribute('data-collapsed', true);
          }
        });
      });
    </script>
  </body>
</html>
```

## markdown主题

```css
/* Markdown 主题样式 */
:root {
  --primary-color: #181818;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --light-gray: #f8f9fa;
  --medium-gray: #e9ecef;
  --dark-gray: #6c757d;
  --text-color: #606266;
  --link-color: #007bff;
  --link-hover-color: #007bff;
  --code-bg-color: #f5f5f5;
  --blockquote-border: #007bff8d;
  --blockquote-bg: #007bff35;
  --table-border: #007bff18;
}

* {
  box-sizing: border-box;
}

/* 滚动条滚动条轨道 */
::-webkit-scrollbar {
  width: 6px; /* 垂直滚动条宽度 */
  height: 6px; /* 水平滚动条高度 */
}

/* 滚动条轨道背景 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
  transition: background 0.3s ease;
}

/* 滚动条滑块悬停状态 */
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 滚动条滑块激活状态（点击时） */
::-webkit-scrollbar-thumb:active {
  background: #888888;
}

/* 滚动条角落（水平和垂直滚动条交汇处） */
::-webkit-scrollbar-corner {
  background: #f1f1f1;
}

/* 基础样式 */
.markdown-container {
  max-width: 1360px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;
  line-height: 1.7;
  color: var(--text-color);
  background-color: #fff;
}

/* 标题样式 */
.markdown-container h1,
.markdown-container h2,
.markdown-container h3,
.markdown-container h4,
.markdown-container h5,
.markdown-container h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-weight: 600;
  line-height: 1.3;
}

.markdown-container h1 {
  font-size: 2.2rem;
  border-bottom: 2px solid var(--medium-gray);
  padding-bottom: 0.5rem;
  margin-top: 0;
}

.markdown-container h2 {
  font-size: 1.8rem;
  border-bottom: 1px solid var(--medium-gray);
  padding-bottom: 0.3rem;
}

.markdown-container h3 {
  font-size: 1.5rem;
}

.markdown-container h4 {
  font-size: 1.3rem;
}

.markdown-container h5 {
  font-size: 1.1rem;
}

.markdown-container h6 {
  font-size: 1rem;
  color: var(--dark-gray);
}

/* 段落样式 */
.markdown-container p {
  margin-bottom: 1.2rem;
}

/* 链接样式 */
.markdown-container a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.markdown-container a:hover {
  color: var(--link-hover-color);
  text-decoration: none;
}

/* 列表样式 */
.markdown-container ul,
.markdown-container ol {
}

.markdown-container ul {
  list-style-type: none;
}

.markdown-container ol {
  list-style-type: none;
}

.markdown-container li {
}

.markdown-container li > ul,
.markdown-container li > ol {
}

/* 代码块样式 */
.markdown-container pre {
  background-color: var(--code-bg-color);
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.2rem;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-container code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  background-color: var(--code-bg-color);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.95rem;
}

.markdown-container pre code {
  padding: 0;
  background: none;
}

/* 引用样式 */
.markdown-container blockquote {
  border-left: 4px solid var(--blockquote-border);
  padding: 0.5rem 1rem;
  margin: 0 0 1.2rem 0;
  background-color: var(--blockquote-bg);
  border-radius: 0 4px 4px 0;
}

.markdown-container blockquote p {
  margin-bottom: 0;
  color: #555;
}

/* 表格样式 */
.markdown-container table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.2rem;
}

.markdown-container th,
.markdown-container td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid var(--table-border);
}

.markdown-container th {
  background-color: var(--light-gray);
  font-weight: 600;
}

.markdown-container tr:hover {
  background-color: var(--light-gray);
}

/* 图片样式 */
.markdown-container img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1.5rem 0;
  display: block;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 水平线样式 */
.markdown-container hr {
  border: 0;
  border-top: 1px solid var(--medium-gray);
  margin: 2rem 0;
}

/* 强调文本样式 */
.markdown-container strong {
  font-weight: 600;
}

.markdown-container em {
  color: #666;
}

/* 任务列表样式 */
.markdown-container input[type='checkbox'] {
  margin-right: 0.5rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .markdown-container {
    padding: 1rem;
  }

  .markdown-container h1 {
    font-size: 1.8rem;
  }

  .markdown-container h2 {
    font-size: 1.5rem;
  }

  .markdown-container h3 {
    font-size: 1.3rem;
  }
}
```

## package.json脚本命令

```json
{
  "name": "docs",
  "version": "1.0.0",
  "scripts": {
    "docs:local": "node ci/docs-build.mjs",
    "docs:serve": "node ci/docs-build.mjs --serve & cd docs/.docs & http-server -p 8288 & (start chrome http://localhost:8288 || open -a 'Google Chrome' http://localhost:8288 || xdg-open http://localhost:8288)"
  },
  "devDependencies": {
    "http-server": "^14.1.1",
    "marked": "^16.1.1",
    "mkdirp": "^3.0.1"
  }
}
```

## 待完善

- 提供同级目录下，上一篇/下一篇快速跳转
- 文件热更新【可选】