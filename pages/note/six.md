---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: note
noteTime: 2025/09/04
noteTitle: 常见组件功能实现集合
noteSummary: 收集一些常见组件功能功能的实现方法一二三，从各组件库源码中学习
---

<!--@include: ../../.vitepress/parts/note-child.md-->

# Watermark水印组件

## 基于Canvas获得水印图片

- 实现
  - canvas可以直接绘制image
  - canvas使用 fillText、measureText 绘制文本
  - 基于canvasContext2D.toDataURL() 直接获取图片临时路径
  - 或者基于canvasContext2D.toBlob()先转成 Blob 对象，在通过 URL.createObjectURL() 将 Blob 对象生成临时 URL
- 设置 background 样式，添加repeat平铺方式

## 基于svg获取水印图片

- 实现
  - svg内可以直接放置image标签，直接通过样式控制属性
  - 基于foreignObject标签可以直接放HTML内容，因此可以灵活自定义水印内容
  - 直接将svg内容转成Blob对象：`new Blob([svg.innerHTML], {type: 'image/svg+xml',})`；
  - 最后通过 URL.createObjectURL() 将 Blob 对象生成临时 URL
- 设置 background 样式，添加repeat平铺方式

# Guide引导组件