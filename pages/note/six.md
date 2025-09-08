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

```js
// 将SVG转换为字符串
const serializer = new XMLSerializer();
let svgStr = serializer.serializeToString(svgDOM);
// 关键：添加XML声明以确保正确解析
svgStr = '<?xml version="1.0" standalone="no"?>\r\n' + svgStr;
// 创建Blob对象
const svgBlob = new Blob([svgStr], {
  type: 'image/svg+xml',
});
// 创建Blob URL
return URL.createObjectURL(svgBlob);
```

<hr>

# Guide引导组件-挖空遮罩实现

## 基于box-shadow

- 实现【最方便】
  - 获取触发器元素的 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)，适当增加间距
  - 使用 DOMRect 尺寸创建一个透明元素，覆盖在触发器元素上，在为透明元素增加box-shadow样式
  - box-shadow直接按屏幕尺寸设置即可
- 注意
  - 基于box-shadow的挖空，如果要禁止点击遮罩透传，透明元素必须设置`pointer-events:auto`，但是点击挖空区域就无法透传【不足】

## 基于svg.path路径

- 实现
  - 获取触发器元素的 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)，适当增加间距
  - 基于屏幕尺寸和 DOMRect尺寸 生成path路径
  - 为path填充颜色即可
- 注意
  - path路径：先绘制屏幕大小的路径后（z结束路径），然后在重新绘制触发器大小的路径，带圆角需要用到 arc 弧线
  - 需要掌握path路径语法：move/M，line/L/V/H，ellipse/a，closePath/Z
  - path遮罩节点要禁止鼠标点击，path节点需要指定`pointer-events:auto`
  - 通过path节点实现的挖空区域，不属于path这个节点，可以直接点击透传下层节点，但是svg需要指定`pointer-events:none`，否则点击事件会到svg节点上

```html
<svg style="width: 100%; height: 100%;">
  <path
    class="el-tour__hollow"
    d="M978,0 L0,0 L0,798 L978,798 L978,0 Z M319.5,154.6796875 h87.75 a2,2 0 0 1 2,2 v40 a2,2 0 0 1 -2,2 h-87.75 a2,2 0 0 1 -2,-2 v-40 a2,2 0 0 1 2,-2 z"
    style="fill: rgba(0, 0, 0, 0.5); pointer-events: auto; cursor: auto;"
  ></path>
</svg>
```

## 基于svg.mask蒙层

- 实现
  - 获取触发器元素的 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect)，适当增加间距
  - 基于屏幕尺寸和 DOMRect尺寸 创建4个rect图形放置在触发器四周，用于组织鼠标点击，
  - 然后在基于屏幕尺寸和 DOMRect尺寸创建
  - 为path填充颜色即可mask蒙版，mask蒙版由两个rect图形组成：屏幕大小的rect图形，DOMRect大小的rect图形，大的rect图形填充white颜色，小的rect图形填充black颜色，这样这个蒙版就能生成带挖空的蒙版（空的地方就是填充颜色为black的位置，而蒙版颜色为填充颜色为white的位置）
  - 然后基于屏幕尺寸创建一个rect图形并设置填充颜色为遮罩颜色，同时使用这个mask
- 注意
  - [mask遮罩](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Reference/Element/mask)：蒙版效果是白色区域可见，黑色区域不可见。
  - rect遮罩节点要禁止鼠标点击，节点不能直接指定`pointer-events:auto`，因为挖空区域算是mask的内容，点击空白无法透传
  - 所以才添加4个rect节点用来占位遮罩阴影的位置，留出挖空位置，rect遮罩节点需要指定`pointer-events:none`或不知道这个属性

```html
<svg style="width: 100%; height: 100%;">
  <defs>
    <!--svg蒙版声明-->
    <mask id="ant-tour-mask-«rbt»">
      <rect
        x="0"
        y="0"
        width="100vw"
        height="100vh"
        fill="white"
      ></rect>
      <rect
        x="308.75"
        y="624.328125"
        rx="2"
        width="92.8203125"
        height="44"
        fill="black"
        class="ant-tour-placeholder-animated"
      ></rect>
    </mask>
  </defs>
  <!--挖空遮罩rect-->
  <rect
    x="0"
    y="0"
    width="100%"
    height="100%"
    fill="rgba(0,0,0,0.5)"
    mask="url(#ant-tour-mask-«rbt»)"
  ></rect>
  <!--4个遮罩rect，用于阻断鼠标点击-->
  <rect
    fill="transparent"
    pointer-events="auto"
    x="0"
    y="0"
    width="100%"
    height="624.328125"
    class="__web-inspector-hide-shortcut__"
  ></rect>
  <rect
    fill="transparent"
    pointer-events="auto"
    x="0"
    y="0"
    width="308.75"
    height="100%"
    class="__web-inspector-hide-shortcut__"
  ></rect>
  <rect
    fill="transparent"
    pointer-events="auto"
    x="0"
    y="668.328125"
    width="100%"
    height="calc(100vh - 668.328125px)"
    class="__web-inspector-hide-shortcut__"
  ></rect>
  <rect
    fill="transparent"
    pointer-events="auto"
    x="401.5703125"
    y="0"
    width="calc(100vw - 401.5703125px)"
    height="100%"
    class="__web-inspector-hide-shortcut__"
  ></rect>
</svg>
```
