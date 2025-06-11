---
layout: doc
navbar: true
sidebar: true
title: portfolio
---

# 作品集

::: info

一些自己开发的组件、扩展的组件、或是一些开发脚手架～

:::

<script setup>
import { ref } from 'vue';

const portfolios = ref({
  components: [
    {
      title: 'ReTable',
      description: '基于ElementPlus的Table组件实现分页',
      link: 'https://juejin.cn/post/7402811750772064267',
      icon: `<svg data-v-066f83f9="" width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M65 60C65 58.8954 65.8954 58 67 58H213C214.105 58 215 58.8954 215 60V132C215 133.105 214.105 134 213 134H67C65.8954 134 65 133.105 65 132V60Z" fill="var(--el-fill-color-blank)"></path><path d="M67 57.7C65.7297 57.7 64.7 58.7297 64.7 60V132C64.7 133.27 65.7297 134.3 67 134.3H213C214.27 134.3 215.3 133.27 215.3 132V60C215.3 58.7297 214.27 57.7 213 57.7H67Z" stroke="var(--el-border-color-dark)" stroke-width="0.6"></path></g><rect x="71" y="76" width="16" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="71" y="92" width="16" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="71" y="108" width="16" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="71" y="124" width="16" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="107" y="76" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="107" y="92" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="107" y="108" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="107" y="124" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="143" y="76" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="143" y="92" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="143" y="108" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="143" y="124" width="20" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="197" y="76" width="12" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="197" y="92" width="12" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="197" y="108" width="12" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="197" y="124" width="12" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><path d="M65 60C65 58.8954 65.8954 58 67 58H213C214.105 58 215 58.8954 215 60V70H65V60Z" fill="var(--el-border-color-light)"></path><rect x="107" y="63" width="10" height="2" rx="1" fill="var(--el-border-color-dark)"></rect><rect x="143" y="63" width="10" height="2" rx="1" fill="var(--el-border-color-dark)"></rect><rect x="199" y="63" width="10" height="2" rx="1" fill="var(--el-border-color-dark)"></rect><rect x="71" y="63" width="10" height="2" rx="1" fill="var(--el-border-color-dark)"></rect><line x1="65" y1="85.75" x2="215" y2="85.75" stroke="var(--el-border-color-light)" stroke-width="0.5"></line><line x1="65" y1="101.75" x2="215" y2="101.75" stroke="var(--el-border-color-light)" stroke-width="0.5"></line><line x1="65" y1="117.75" x2="215" y2="117.75" stroke="var(--el-border-color-light)" stroke-width="0.5"></line><defs><filter id="filter0_d_13550_224439" x="51.0666" y="44.0671" width="177.867" height="103.866" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="6.66667"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13550_224439"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13550_224439" result="shape"></feBlend></filter></defs></svg>`
    },
    {
      title: 'ReList',
      description: '基于JSX风格实现高度动态的列表渲染组件，提供丰富的展示方式',
      link: 'https://juejin.cn/post/7402793540306862092',
      icon: `<svg data-v-066f83f9="" width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_13637_231257)"><path d="M60 54C60 52.8954 60.8954 52 62 52H218C219.105 52 220 52.8954 220 54V126C220 127.105 219.105 128 218 128H62C60.8954 128 60 127.105 60 126V54Z" fill="var(--el-fill-color-blank)"></path><path d="M62 51.7C60.7297 51.7 59.7 52.7297 59.7 54V126C59.7 127.27 60.7297 128.3 62 128.3H218C219.27 128.3 220.3 127.27 220.3 126V54C220.3 52.7297 219.27 51.7 218 51.7H62Z" stroke="var(--el-border-color-dark)" stroke-width="0.6"></path></g><rect x="69" y="56" width="24" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="69" y="68" width="120" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="69" y="80" width="44" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="69" y="96" width="24" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="69" y="108" width="100" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="69" y="120" width="44" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><defs><filter id="filter0_d_13637_231257" x="46.0666" y="38.0671" width="187.867" height="103.866" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="6.66667"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13637_231257"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13637_231257" result="shape"></feBlend></filter></defs></svg>`
    },
    {
      title: 'ReScrollList',
      description: '基于ReList实现滚动加载列表',
      link: 'https://juejin.cn/post/7402873035915280434',
      icon: `<svg data-v-066f83f9="" width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_13637_231257)"><path d="M60 54C60 52.8954 60.8954 52 62 52H218C219.105 52 220 52.8954 220 54V126C220 127.105 219.105 128 218 128H62C60.8954 128 60 127.105 60 126V54Z" fill="var(--el-fill-color-blank)"></path><path d="M62 51.7C60.7297 51.7 59.7 52.7297 59.7 54V126C59.7 127.27 60.7297 128.3 62 128.3H218C219.27 128.3 220.3 127.27 220.3 126V54C220.3 52.7297 219.27 51.7 218 51.7H62Z" stroke="var(--el-border-color-dark)" stroke-width="0.6"></path></g><rect x="69" y="56" width="24" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="69" y="68" width="120" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="69" y="80" width="44" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="69" y="96" width="24" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="69" y="108" width="100" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><rect x="69" y="120" width="44" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><defs><filter id="filter0_d_13637_231257" x="46.0666" y="38.0671" width="187.867" height="103.866" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="6.66667"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13637_231257"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13637_231257" result="shape"></feBlend></filter></defs></svg>`
    },
    {
      title: 'ReVirtualScrollList',
      description: '基于ReScrollList增加虚拟列表功能',
      link: 'https://juejin.cn/post/7402819666992267315',
    },
    {
      title: 'ReVirtualList',
      description: '在 ReList 的基础上，增加虚拟列表功能，在基于固定高度的前提下，可以优化大数据列表展示',
      link: 'https://juejin.cn/post/7402793540306878476'
    },
    {
      title: 'ReForm',
      description: '基于ElForm封装的动态表单组件，可通过配置对象自动渲染表单内容，可配置表单内容、表单校验规则、表单联动、折叠表单、多列表单，满足大部分表单应用场景。',
      link: 'https://juejin.cn/post/7402811750770540555',
      icon: `<svg data-v-066f83f9="" width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_12777_164014)"><g filter="url(#filter0_d_12777_164014)"><rect x="60" y="81" width="160" height="24" rx="2" fill="var(--el-fill-color-blank)"></rect><rect x="59.7" y="80.7" width="160.6" height="24.6" rx="2.3" stroke="var(--el-border-color-dark)" stroke-width="0.6"></rect></g><rect x="68" y="91" width="36" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="60" y="65" width="35" height="12" rx="2" fill="var(--el-color-primary)"></rect><rect x="67" y="70" width="20" height="2" rx="1" fill="white"></rect></g><defs><filter id="filter0_d_12777_164014" x="46.0667" y="67.0671" width="187.867" height="51.8659" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="6.66667"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12777_164014"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12777_164014" result="shape"></feBlend></filter></defs></svg>`
    },
    {
      title: 'ReSearchForm',
      description: '基于动态表单ReForm组件实现，支持网格布局，展开/折叠控制。',
      link: 'https://juejin.cn/post/7402811750770688011'
    },
    {
      title: 'Popover',
      description: '基础弹出框，支持向下/向上/向左/向右/居中方式弹出，带有多种遮罩',
      link: 'https://ext.dcloud.net.cn/plugin?id=20952',
      icon: `<svg data-v-066f83f9="" width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-outside-1_13637_231340" maskUnits="userSpaceOnUse" x="89" y="66" width="102" height="49" fill="black"><rect fill="white" x="89" y="66" width="102" height="49"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M92 67C90.8954 67 90 67.8954 90 69V107C90 108.105 90.8954 109 92 109H134.56C135.14 109 135.692 109.252 136.072 109.691L139.048 113.127C139.447 113.588 140.161 113.588 140.56 113.127L143.536 109.691C143.916 109.252 144.467 109 145.048 109H188C189.105 109 190 108.105 190 107V69C190 67.8954 189.105 67 188 67H92Z"></path></mask><path fill-rule="evenodd" clip-rule="evenodd" d="M92 67C90.8954 67 90 67.8954 90 69V107C90 108.105 90.8954 109 92 109H134.56C135.14 109 135.692 109.252 136.072 109.691L139.048 113.127C139.447 113.588 140.161 113.588 140.56 113.127L143.536 109.691C143.916 109.252 144.467 109 145.048 109H188C189.105 109 190 108.105 190 107V69C190 67.8954 189.105 67 188 67H92Z" fill="var(--el-bg-color-overlay)"></path><path d="M139.048 113.127L139.501 112.734H139.501L139.048 113.127ZM140.56 113.127L140.106 112.734H140.106L140.56 113.127ZM143.536 109.691L143.082 109.298L143.536 109.691ZM136.072 109.691L136.525 109.298L136.072 109.691ZM90.6 69C90.6 68.2268 91.2268 67.6 92 67.6V66.4C90.5641 66.4 89.4 67.5641 89.4 69H90.6ZM90.6 107V69H89.4V107H90.6ZM92 108.4C91.2268 108.4 90.6 107.773 90.6 107H89.4C89.4 108.436 90.5641 109.6 92 109.6V108.4ZM134.56 108.4H92V109.6H134.56V108.4ZM139.501 112.734L136.525 109.298L135.618 110.083L138.594 113.52L139.501 112.734ZM140.106 112.734C139.947 112.919 139.661 112.919 139.501 112.734L138.594 113.52C139.232 114.257 140.375 114.257 141.013 113.52L140.106 112.734ZM143.082 109.298L140.106 112.734L141.013 113.52L143.989 110.083L143.082 109.298ZM188 108.4H145.048V109.6H188V108.4ZM189.4 107C189.4 107.773 188.773 108.4 188 108.4V109.6C189.436 109.6 190.6 108.436 190.6 107H189.4ZM189.4 69V107H190.6V69H189.4ZM188 67.6C188.773 67.6 189.4 68.2268 189.4 69H190.6C190.6 67.5641 189.436 66.4 188 66.4V67.6ZM92 67.6H188V66.4H92V67.6ZM143.989 110.083C144.255 109.776 144.641 109.6 145.048 109.6V108.4C144.293 108.4 143.576 108.728 143.082 109.298L143.989 110.083ZM134.56 109.6C134.966 109.6 135.352 109.776 135.618 110.083L136.525 109.298C136.032 108.728 135.314 108.4 134.56 108.4V109.6Z" fill="var(--el-border-color-dark)" mask="url(#path-1-outside-1_13637_231340)"></path></g><rect x="100" y="77" width="24" height="4" rx="2" fill="var(--el-color-primary)"></rect><rect x="100" y="92" width="67" height="4" rx="2" fill="var(--el-border-color-dark)"></rect><defs><filter id="filter0_d_13637_231340" x="76.0666" y="53.0671" width="127.867" height="74.3385" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="6.66667"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_13637_231340"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_13637_231340" result="shape"></feBlend></filter></defs></svg>`
    },
    {
      title: 'Draggable',
      description: '提供一个可拖拽排序列表，支持长按开始拖拽排序。排序规则提供两种方式，一种插入位置，一种交换位置',
      link: 'https://ext.dcloud.net.cn/plugin?id=22749'
    },
    {
      title: 'VoiceInput',
      description: '长按语音输入蒙层',
      link: 'https://ext.dcloud.net.cn/plugin?id=23538'
    },
    {
      title: 'VirtualSwiper',
      description: '虚拟Swiper解决方案',
      link: 'https://ext.dcloud.net.cn/plugin?id=20991'
    }
  ],

  scaffolds: [
    {
      title: 'project-scaffold',
      description: '基于vue2 + Antd封装，内置mock、axios封装',
      link: 'https://juejin.cn/post/6954668513705328677'
    },
    {
      title: 'vue-template',
      description: '基于vue2 + Antd封装，内置mock、axios封装、i18n等',
      link: 'https://github.com/wsida/vue-template/tree/master'
    }
  ]
})

function onRouter(portfolio, target = '_blank') {
  if (portfolio.link) {
    window.open(portfolio.link, target)
  }
}
</script>

<style>
  .portfolio-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
</style>

<el-divider></el-divider>

<!-- <el-empty description="小编还在努力整理～" /> -->

<h3 class="mb-16px!">组件：</h3>
<div class="portfolio-list">
  <div v-for="(comp, index) in portfolios.components" :key="index" class="portfolio-item">
    <el-card class="cursor-pointer" shadow="hover" :body-style="{padding: 0}" @click="onRouter(comp)">
      <template #header>
        <div>
          <h4 class="h-24px leading-24px p-0! m-0!">{{ comp.title }}</h4>
          <div class="leading-20px p-0! m-0!">
            <el-text class="w-100% block text-gray-4! text-sm!" truncated>{{ comp.description }}</el-text>
          </div>
        </div>
      </template>
      <div class="bg-gray-100 p-16px">
        <template v-if="comp.icon">
          <div v-html="comp.icon"></div>
        </template>
        <template v-else>
            <el-empty class="h-180px" :image-size="56"><template #description></template></el-empty>
        </template>
      </div>
    </el-card>
  </div>
</div>

<h3 class="mb-16px!">脚手架：</h3>
<div class="portfolio-list">
  <div v-for="(scaffold, index) in portfolios.scaffolds" :key="index" class="portfolio-item">
    <el-card class="cursor-pointer" shadow="hover" :body-style="{padding: 0}" @click="onRouter(scaffold)">
      <template #header>
        <div>
          <h4 class="h-24px leading-24px p-0! m-0!">{{ scaffold.title }}</h4>
          <div class="leading-20px p-0! m-0!">
            <el-text class="w-100% block text-gray-4! text-sm!" truncated>{{ scaffold.description }}</el-text>
          </div>
        </div>
      </template>
      <div class="bg-gray-100 p-16px">
        <template v-if="scaffold.icon">
          <div v-html="scaffold.icon"></div>
        </template>
        <template v-else>
            <el-empty class="h-180px" :image-size="56"><template #description></template></el-empty>
        </template>
      </div>
    </el-card>
  </div>
</div>
