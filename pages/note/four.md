---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: note
noteTime: 2025/09/02
noteTitle: Vite构建之import.meta.glob与public目录的爱恨情仇
noteSummary: Vite构建过程中遇到的问题记录📝
---

<!--@include: ../../.vitepress/parts/note-child.md-->

# Vite构建之import.meta.glob与public目录的爱恨情仇

在开始问题说明之前，先在学习一下 `import.meta.glob` 这个api方法。

## import.meta.glob

> import.meta.glob 是 Vite 提供的一个特殊 API，用于在构建时 glob 模式匹配文件，并返回一个模块映射对象。它主要用于在前端项目中动态导入多个模块，特别适合需要**批量导入组件、图片或其他资源**的场景。

### 基础语法

```js
const modules = import.meta.glob(pattern, options)
```

### 参数说明

1. pattern <el-tag type="danger">必填</el-tag>

- 类型: `string` | `string[]`
- 描述：用于匹配文件的 glob 模式字符串或字符串数组
- 示例:
  - 单模式: `./src/components/*.vue`
  - 多模式: `['./src/pages/*.vue', './src/components/*.vue']`

glob 模式支持的特殊字符:

- `*`: 匹配任意字符（除了路径分隔符）
- `**`: 匹配任意层级的目录
- `?`: 匹配单个字符
- `[seq]`: 匹配 seq 中的任意字符
- `[!seq]`: 匹配不在 seq 中的任意字符

1. options <el-tag type="default">选填</el-tag>

一个配置对象，支持以下属性:

| 属性 | 类型 | 默认值 | 描述 |
| :-- | :-- | :-- | :-- |
| eager | boolean | false | 是否立即加载模块，而不是返回动态导入函数 |
| import | string \| string[] \| ((path: string) => string) | - | 指定导入的模块部分（如特定导出） |
| query | string \| Record<string, string> | - | 附加到导入请求的查询字符串 |
| ignore | string \| string[] | - | 要排除的 glob 模式 |
| as | string | - | 显式指定导入类型（如 'raw'、'url' 等） |

### 返回值

### 示例

1. 基础用法（懒加载）

```javascript
// 匹配所有 .vue 文件
const modules = import.meta.glob('./components/*.vue')

// 模块结构:
// {
//   './components/Button.vue': () => import('./components/Button.vue'),
//   './components/Input.vue': () => import('./components/Input.vue')
// }

// 使用方式
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```

2. 立即加载
  
```javascript
const modules = import.meta.glob('./components/*.vue', { eager: true })

// 直接访问模块
for (const path in modules) {
  console.log(path, modules[path].default) // 默认导出
}
```

3. 导入特定导出

```javascript

// 只导入每个模块的特定导出
const modules = import.meta.glob('./utils/*.js', {
  import: 'default', // 只导入 default 导出
  eager: true
})
```

4. 排除文件

```javascript
// 匹配所有 .js 文件，但排除 test.js
const modules = import.meta.glob('./utils/*.js', {
  ignore: './utils/test.js'
})
```

5. 多模式匹配

```javascript
// 匹配多种类型的文件
const modules = import.meta.glob([
  './components/*.vue',
  './pages/*.vue'
])
```

6. 作为资源导入 <el-tag type="primary">本文重点</el-tag>

```javascript
// 导入图片作为 URL
const images = import.meta.glob('./assets/images/*.png', {
  as: 'url',
  eager: true
})
```

### 注意事项

- import.meta.glob 是 **Vite 特有**的 API，在其他构建工具中可能不被支持
- 匹配结果在构建时确定，**不能动态更改模式**
- 生产环境中，**被匹配的文件会被打包构建（loader解析、优化、哈希命名等）**，未匹配的文件会被排除
- 对于大规模的文件匹配，建议**合理组织目录结构**以提高匹配效率

*vite特有的API，其他构建工具不一定有*

## public目录

> 在 Vite 项目中，public 目录是一个特殊的静态资源目录，用于存放不需要经过 Vite 构建处理的静态文件，目录下的内容会被直接复制到构建输出目录（outDir）的根目录下。

### 核心特性

- 不经过构建处理：public 目录下的文件会被原样复制到构建产物的根目录（默认是 dist），不会被 Vite 解析、压缩或转译
- 保持原始路径：文件的目录结构会被完整保留，访问路径与源文件路径一致
- 直接访问：可以通过绝对路径直接访问这些资源，无需通过 import 导入

## 适用场景

适合存放以下类型的文件：

- favicon.ico、robots.txt 等网站根目录必需文件
- 第三方库的 JS/CSS 文件（不适合通过 npm 安装的情况）
- 包含动态内容的文件（如需要在服务器端处理的模板）
- 超大文件（避免构建时的性能问题）
- 需要保持固定 URL 地址的资源

### 不适用场景

不建议将以下文件放在 public 目录：

- 需要被 Vite 处理的资源（如需要压缩的图片、需要转译的 JS）
- 需要在代码中通过 import 引用的资源
- 需要参与构建优化（如树摇、代码分割）的文件

### 访问方式

在代码中访问 public 目录下的文件时，必须使用绝对路径：

```html
<!-- 正确 -->
<img src="/images/logo.jpg" alt="Logo">

<!-- 错误 - 不要使用相对路径 -->
<img src "./public/images/logo.jpg" alt="Logo">
```

### 特殊处理规则

1. 子目录处理：
- 如果文件放在 public/images/avatar.jpg，访问路径是 /images/avatar.jpg.<br>子目录结构会被完整保留到构建产物中

2. 环境变量替换：
- 只有以 VITE_ 为前缀的环境变量会被替换到 public 目录的 HTML 文件中
- 其他类型的文件（如 JS、CSS）不会进行环境变量替换

3. 与 base 配置的关系：
- 如果在 vite.config.js 中配置了 base: '/my-app/'，则访问路径需要加上这个基础路径.<br>例如：/my-app/images/logo.jpg

## asserts目录

> 在 Vite 项目中，assets 目录是用于存放需要经过 Vite 构建处理的资源文件的标准目录。与 public 目录不同，assets 下的文件会被 Vite 处理优化，是项目中管理资源的主要方式。

### 核心特性

- 经过构建处理：assets 目录下的文件会被 Vite 解析、处理（如图片压缩、代码转译等）
- 哈希命名：生产环境构建时，文件名会被添加哈希值（如 logo.8f3b12.png），便于缓存管理
- 支持模块化导入：可以通过 `import` 语句或 `import.meta.glob` 批量导入
- 自动优化：Vite 会根据资源类型自动应用优化（如图片格式转换、代码压缩等）
  
### 适用场景

适合存放以下类型的文件：

- 图片资源（JPG、PNG、SVG、WebP 等）
- 样式文件（CSS、SCSS、Less 等）
- 字体文件（TTF、WOFF、WOFF2 等）
- 需要被代码引用的静态资源（如 JSON 数据文件）
- 小型第三方库（适合通过模块导入的情况）

### 访问方式

1. 直接导入（推荐）

```vue
<template>
  <!-- 直接使用导入的资源 -->
  <img :src="logo" alt="Logo">
</template>

<script setup>
import logo from './assets/logo.png'
</script>
```

2. 批量导入（使用 import.meta.glob）

```javascript
// 批量导入 assets 目录下的所有图片
const images = import.meta.glob('./assets/**/*.{png,jpg,jpeg,svg}', {
  as: 'url',
  eager: true
})
```

3. 在样式中引用

```css
/* 在 CSS 中使用相对路径 */
.logo {
  background-image: url('./assets/logo.png');
}
```

### 特殊处理规则

1. 图片资源：
- 小于 `assetsInlineLimit` 配置（默认 4KB）的图片会被转为 `base64` 格式内联到代码中
- 支持自动转换为现代图片格式（如 WebP）
- 可以通过 ?width=200 等查询参数指定处理规则

2. CSS 资源：
- 会被解析处理，支持 CSS Modules、预处理器（Sass/Less）等
- 可以通过 @import 导入其他样式文件

3. 字体资源：
- 会被正确处理并保持引用关系
- 支持通过 url() 引用并自动处理路径

### 配置选项

可以在 vite.config.js 中配置与 assets 相关的选项：

```javascript
// vite.config.js
export default {
  assetsInclude: ['**/*.gltf'], // 额外指定需要作为资源处理的文件类型
  build: {
    assetsInlineLimit: 8192, // 调整内联为 base64 的资源大小限制（8KB）
    assetsDir: 'static', // 构建后 assets 资源存放的目录（默认 'assets'）
  }
}
```

## 存在问题

### 问题1:

当把一些列图片资源放在public目录中，但是在项目代码中想要通过 `import.meta.glob` 快速获取目录中所有的图片资源，从而进行资源遍历展示，在开发过程中代码功能正常，但是到打包构建阶段，会执行失败，主要原因就是通过 `import.meta.glob` 访问的资源会被 vite 进行构建处理，但是 public 目录又会直接被复制到构建后的目录下，两者存在功能冲突，导致构建错误：

`
[vite:build-import-analysis] [plugin vite:build-import-analysis] public/images/carousel/IMG_5074.JPG: Failed to parse source for import analysis because the content contains invalid JS syntax. You may need to install appropriate plugins to handle the .JPG file format, or if it's an asset, add "**/*.JPG" to `assetsInclude` in your configuration.
`

#### 解决1:

保留资源在 public 目录下，不使用 `import.meta.glob` 方法：

- 方法1: 手动列出所有JPG文件路径

```js
export const publicJpgImages = [
  '/images/carousel/IMG_5074.JPG',
  '/images/carousel/IMG_5075.JPG',
  '/photos/carousel/IMG_5076.JPG',
  // 更多文件...
]
```

- 方法2: 如果文件**命名有规律**，可以动态生成路径

```js
export const generatePublicJpgPaths = (prefix, count) => {
  return Array.from({ length: count }, (_, i) => `${prefix}/IMG_${i + 1}.jpg`)
}
```

#### 解决2:

使用 `import.meta.glob` 方法，但是资源需要从 public 目录移到 asserts 目录：

- 方法1: 基础用法：立即加载所有JPG文件（推荐）

```js
const jpgAssets = import.meta.glob('/assets/**/*.jpg', {
  as: 'url',    // 以URL形式导入，获取图片路径
  eager: true   // 立即加载所有匹配的文件
})

// 转换为数组形式，方便在页面中使用
const jpgImageUrls = Object.values(jpgAssets)
const jpgImagePaths = Object.keys(jpgAssets)
```

- 方法2: 懒加载方式（需要时再加载）

```js
const lazyJpgAssets = import.meta.glob('../assets/**/*.jpg', {
  as: 'url',
  eager: false  // 不立即加载，默认值
})

// 懒加载使用示例
const loadImage = async (imagePath) => {
  if (lazyJpgAssets[imagePath]) {
    const imageUrl = await lazyJpgAssets[imagePath]()
    console.log(`加载图片: ${imagePath} -> ${imageUrl}`)
    return imageUrl
  }
  return null
}
```
