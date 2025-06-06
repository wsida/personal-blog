---
layout: doc
navbar: true
sidebar: true
title: contact
---

<!-- <el-descriptions style="max-width: 640px" border title="如何联系我" :column="1" size="large">
  <el-descriptions-item label="📱 手机">
    136****8177
  </el-descriptions-item>
  <el-descriptions-item label="🟢 微信">
    iwangsd
  </el-descriptions-item>
  <el-descriptions-item label="🔵 QQ">
    975784914
  </el-descriptions-item>
  <el-descriptions-item label="✉️ 邮件">
    975784914@qq.com
  </el-descriptions-item>
</el-descriptions> -->

# 如何联系我

:::info

有事联系，无事打扰～

:::

<el-divider></el-divider>

<style>
  .contact-list {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .contact-list-item.span2 {
    grid-column-start: span 2;
  }

  @media screen and (max-width: 480px) {
    .contact-list-item.span2 {
      grid-column-start: span 1;
    }
  }
</style>

<div class="contact-list">
  <el-card class="contact-list-item" shadow="hover">
    <div class="text-gray-500 text-base mb-2">📱 手机</div>
    <div class="text-gray-700 text-lg">136****8177</div>
  </el-card>
  <el-card class="contact-list-item" shadow="hover">
    <div class="text-gray-500 text-base mb-2">🟢 微信</div>
    <div class="text-gray-700 text-lg">iwangsd</div>
  </el-card>
  <el-card class="contact-list-item" shadow="hover">
    <div class="text-gray-500 text-base mb-2">🔵 QQ</div>
    <div class="text-gray-700 text-lg">975784914</div>
  </el-card>
  <el-card class="contact-list-item" shadow="hover">
    <div class="text-gray-500 text-base mb-2">✉️ 邮件</div>
    <div class="text-gray-700 text-lg">975784914@qq.com</div>
  </el-card>
  <el-card class="contact-list-item span2" shadow="hover">
    <div class="text-gray-500 text-base mb-2">🚩地址</div>
    <div class="text-gray-700 text-lg">福建泉州</div>
  </el-card>
</div>
