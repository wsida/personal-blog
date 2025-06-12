---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/06/07
articleTags: Vue,Vite,VitePress
articleTitle: 什么是VitePress
articleSummary: VitePress 是一个由 Vite 驱动的静态站点生成器（SSG），专为快速构建技术文档、博客等轻量级网站设计。它基于 Vue.js，具有简洁的配置、快速的热更新和良好的性能，能够帮助开发者轻松搭建美观且功能强大的文档站点。
---

<!--@include: ../../.vitepress/parts/article-child.md-->

# VitePress 基本功能及 Vitepress-theme-demoblock 插件使用指南

## 一、VitePress 基本功能介绍与使用示例

### 1.1 VitePress 简介

VitePress 是一个由 Vite 驱动的静态站点生成器（SSG），专为快速构建技术文档、博客等轻量级网站设计。它基于 Vue.js，具有简洁的配置、快速的热更新和良好的性能，能够帮助开发者轻松搭建美观且功能强大的文档站点。

### 1.2 基本功能

#### 1.2.1 快速搭建项目

使用 npm 或 yarn 可以快速初始化一个 VitePress 项目。通过命令行运行

`npm init vitepress@latest` 或 `yarn create vitepress`

按照提示完成项目创建，之后在项目目录下运行

`npm run docs:dev` 或 `yarn docs:dev`

即可启动本地开发服务器，在浏览器中预览站点。

#### 1.2.2 Markdown 支持

VitePress 深度支持 Markdown 语法，允许用户使用简洁的 Markdown 编写内容。

同时，它还支持 Markdown 扩展语法，如 `YAML Front Matter` 用于设置页面元数据（标题、描述等），以及 Vue 组件的直接嵌入，让静态内容也能拥有动态交互效果。

例如，在 Markdown 文件中添加 YAML Front Matter：

    ---
    title: 我的VitePress页面
    description: 这是一个使用VitePress创建的页面
    layout: layouts/MyLayout.vue
    ---

#### 1.2.3 主题与定制

VitePress 提供了默认主题，具备简洁的 UI 风格。

用户也可以**自定义主题**，通过修改 CSS 样式、添加自定义 Vue 组件，甚至创建全新的**主题布局**，来满足个性化需求。

比如，在.vitepress/theme/index.js 文件中引入自定义样式：

    import DefaultTheme from 'vitepress/theme'
    import './styles/main.css'
    export default {
     ...DefaultTheme,
      enhanceApp({ app }) {
        // 可以在这里注册全局组件等
      }
    }

#### 1.2.4 搜索功能

VitePress 内置了搜索功能，用户无需额外配置即可使用。在站点页面中，搜索框会自动根据文档内容进行关键词匹配，方便读者快速找到所需信息。

### 1.3 使用示例

假设我们要创建一个简单的技术文档页面。首先，在docs目录下创建一个新的 Markdown 文件，如[example.md](http://example.md)，内容如下：

    ---
    title: 示例页面
    description: 这是一个VitePress示例页面
    ---
    # 欢迎来到示例页面
    这里是一些示例内容，可以使用Markdown语法编写文本、标题、列表等。
    - 列表项1
    - 列表项2

保存文件后，启动本地开发服务器，在浏览器中访问对应的链接，即可看到创建的示例页面。

## 二、Vitepress-theme-demoblock 插件使用场景和功能配置及示例

### 2.1 插件使用场景

Vitepress-theme-demoblock 插件主要用于在技术文档中展示代码示例及其实际效果，特别适用于组件库文档、前端框架教程等场景。它可以让读者更直观地看到代码运行后的样子，增强文档的可读性和实用性。

例如，当你在编写一个 Vue 组件库的文档时，通过该插件可以直接展示组件的多种使用方式及效果，方便开发者参考和使用。

### 2.2 功能配置

#### 2.2.1 安装插件

首先，在项目中安装vitepress-theme-demoblock插件。

使用 npm 安装的命令为：`npm install vitepress-theme-demoblock`

使用 yarn 安装则运行：`yarn add vitepress-theme-demoblock`

#### 2.2.2 配置插件

> 配置基于 vitepress-theme-demoblock@^3.0.0"

`.vitepress/theme/index.js` 中使用 `vitepress-theme-demoblock` 主题，并注册组件(包含主题中默认的组件)：

    import DefaultTheme from 'vitepress/theme'
    import "vitepress-theme-demoblock/dist/theme/styles/index.css";
    import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
    import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
    import setup from "@/components"; // 组件组册方法

    export default {
      extends: DefaultTheme,
      enhanceApp(ctx) {
        app.component("Demo", Demo);
        app.component("DemoBlock", DemoBlock);
        setup(ctx.app); // 只有全局组册组件，在demo示例中组件才能显示
      }
    }

setup注册方法示例：

    import { plugins, components } from "./index";
    import type { App, Component } from "vue";

    export function setupComponents(app: App) {
      plugins.forEach((plugin: { install: (app: App) => void }) => {
        app.use(plugin);
      });
      components.forEach((item: Component) => {
        app.component(item.name!, item);
      });
    }

同时，`.vitepress/config.js` 文件中使用 `demoblockPlugin` 和 `demoblockVitePlugin` 插件:

    import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
    export default defineConfig({
      // 其他配置...
      markdown: {
        config: (md) => {
          md.use(demoblockPlugin)
        }
      },
      vite: {
        plugins: [demoblockVitePlugin()]
      }
    })

#### 2.2.3 自定义主题

通过配置 `customClass` 类名称，自定义 `demoblock` 样式

    markdown: {
      config: (md) => {
        md.use(demoblockPlugin, {
          customClass: 'demoblock-custom'
        })
      }
    }

### 2.3 使用示例

假设我们有一个简单的 组件示例：basic.md，内容如下：

```vue
<template>
  <RePageCard>
    <ReList :items="items" :metas="metas"></ReList>
  </RePageCard>

  <RePageCard>
    <ReList :items="items" :metas="metas1"></ReList>
  </RePageCard>

  <RePageCard>
    <ReList :items="items" :metas="metas2"></ReList>
  </RePageCard>
</template>

<script setup lang="ts">
import { UserFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
const metas = ref({
  avatar: {},
  title: {},
  subTitle: {},
  description: {},
  content: {}
});
const metas1 = ref({
  title: {
    dataIndex: "title2"
  },
  description: {},
  content: {}
});
const metas2 = ref({
  avatar: {},
  title: {},
  content: {}
});

const items = ref([
  {
    id: 1,
    title: "Title1",
    title2: "Title2",
    subTitle: "Sub-title",
    description: "Description",
    content: "Content",
    avatar: UserFilled
  },
  {
    id: 2,
    title: "Title1",
    title2: "Title2",
    subTitle: "Sub-title1",
    description: "Description1",
    content: "Content1",
    avatar: UserFilled
  }
]);
</script>
```

在 Markdown 文件中引用该示例文件，使用:::demo语法：

    ## 基础

    通过 `metas` 字段配置列表项展示内容。支持配置列表项内容对于的数据字段，自定义渲染，绑定事件，自定义样式类。

    :::demo

    <!--@include: ../demo/list/basic.md-->

    :::

上述组件示例会在文档中展示：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/74c0c43e2bfb45308f877a70f01cd9b6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd2FuZ3Nk:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjMzOTM1MTczMDA3MzcxMCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1749798951&x-orig-sign=%2FgXrMsotd%2B0mmz4u%2BULIm8xiiiU%3D)

> 此版本的demo组件基于对markdown的代码片段的解析（基于markdonw-it），然后直接进行示例内容的渲染实现示例的展示，所以需要对示例中使用的组件进行全局注册，否则会导致渲染异常。

> 解析组件有误，可能是 @ 别名设置问题，需要在 `.vitepress/config.js` 文件中修改 vite.resolve.alias 配置。
