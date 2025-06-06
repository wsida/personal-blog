---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: note
noteTime: 2025/06/07
noteTitle: 微信小程序开发入坑
noteSummary: 这是我在开发微信小程序中遇到的坑，再此记录以防再次踩坑
---

<!--@include: ../../.vitepress/parts/note-child.md-->

# 微信小程序开发入坑

- onShareAppMessage 微信分享，限时`3s`，如果异步未转为 fulfilled/rejected 状态，也会走默认分享。
- onShareAppMessage 可以通过 `promise字段` 中 `reject(false)` 阻止分享