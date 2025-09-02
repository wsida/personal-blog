---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: note
noteTime: 2025/09/02
noteTitle: JSX/TSX小技巧
noteSummary: JSX一些技巧语法，能够让你更好的使用jsx语法实现高度动态可扩展的组件开发。
---

<!--@include: ../../.vitepress/parts/note-child.md-->

# JSX/TSX小技巧

## 动态tag

允许通过prop熟悉指定一个标签名，在jsx中直接使用prop字段作为标签名，后续自动转成渲染函数 `h(tag, {}, 'some content')` 语法。

```js
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    /* some props */
  },

  setup(props) {

    return () => {
      const { tag } = props;

      return <tag>some content</tag>;
    };
  },
});
``