---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/06/07
articleTags: Css
articleTitle: 一文带你认识z-Index
articleSummary: 在 CSS 中，`z-index` 属性用于控制元素在垂直于屏幕方向（即 z 轴）上的堆叠顺序，也就是元素的层级关系
---

<!--@include: ../../.vitepress/parts/article-child.md-->


在 CSS 中，`z-index` 属性用于控制元素在垂直于屏幕方向（即 z 轴）上的堆叠顺序，也就是元素的层级关系。以下是关于 `z-index` 层级规则的详细解答：

### 引言

在开发中，是否常常碰见 `z-index` 不起作用！！！明明样式也设置了，大小也控制了，但是效果就是不符合预期！可能你忽略了一个重要概念-堆叠上下文（层级上下文）。不妨看完全文再去试试看！




### 基本概念

  


-   **`z-index` 的取值**：`z-index` 可以取整数值（包括正数、负数和零）、`auto` 或者 `inherit`。取值越大的元素会覆盖取值较小的元素，从而显示在更上层。

### 规则详解

#### 1. 没有 `z-index` 的情况

  


-   当元素没有设置 `z-index` 时，它们按照在 HTML 文档流中的顺序进行堆叠，即后面的元素会覆盖前面的元素。

  




```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    .box1 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: red;
    }

    .box2 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: blue;
      top: -50px;
      left: 50px;
    }
  </style>
</head>

<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>

</html>
```

  


在这个例子中，`.box2` 在 HTML 中位于 `.box1` 之后，所以 `.box2` 会覆盖 `.box1` 的一部分。

#### 2. 设置 `z-index` 的情况

  


-   当元素设置了 `z-index` 时，`z-index` 值大的元素会覆盖 `z-index` 值小的元素。

  



```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    .box1 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: red;
      z-index: 1;
    }

    .box2 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: blue;
      top: -50px;
      left: 50px;
      z-index: 2;
    }
  </style>
</head>

<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>

</html>
```

  


这里 `.box2` 的 `z-index` 为 2，大于 `.box1` 的 `z-index` 值 1，所以 `.box2` 会显示在 `.box1` 的上面。

#### 3. 负 `z-index` 值

  


-   `z-index` 可以取负值，此时元素会被放置在没有设置 `z-index` 或者 `z-index` 为正值的元素的下面。

  




```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    .box1 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: red;
      z-index: -1;
    }

    .box2 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: blue;
      top: -50px;
      left: 50px;
    }
  </style>
</head>

<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>

</html>
```

  


在这个例子中，`.box1` 的 `z-index` 为 -1，所以 `.box2` 会覆盖 `.box1`。

#### 4. `z-index` 与定位的关系

  


-   `z-index` 只对定位元素（`position` 属性值为 `relative`、`absolute`、`fixed` 或 `sticky`）有效。对于没有设置定位的元素，设置 `z-index` 不会产生任何效果。

  



```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    .box1 {
      width: 100px;
      height: 100px;
      background-color: red;
      z-index: 1;
    }

    .box2 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: blue;
      top: -50px;
      left: 50px;
      z-index: 2;
    }
  </style>
</head>

<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>

</html>
```

  


这里 `.box1` 没有设置定位，所以它的 `z-index` 不起作用，`.box2` 仍然会覆盖 `.box1`。

#### 5. 堆叠上下文

  


-   堆叠上下文是一个重要的概念，它会影响元素的 `z-index` 表现。当一个元素创建了堆叠上下文时，它内部的子元素的 `z-index` 只在该堆叠上下文中生效，而不会与外部元素的 `z-index` 直接比较。

-   创建堆叠上下文的常见情况包括：

    -   根元素（`<html>`）。
    -   元素的 `position` 为 `absolute` 或 `relative`，且 `z-index` 不为 `auto`。
    -   元素的 `position` 为 `fixed` 或 `sticky`。
    -   元素的 `opacity` 小于 1。
    -   元素的 `transform` 不为 `none`。
    -   元素的 `filter` 不为 `none` 等。

  



```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    .parent {
      position: relative;
      z-index: 1;
      opacity: 0.9; /* 创建堆叠上下文 */
    }

    .child1 {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: red;
      z-index: 2;
    }

    .sibling {
      position: relative;
      width: 100px;
      height: 100px;
      background-color: blue;
      z-index: 3;
    }
  </style>
</head>

<body>
  <div class="parent">
    <div class="child1"></div>
  </div>
  <div class="sibling"></div>
</body>

</html>
```

  


  


  


  


  


  


  


在这个例子中，`.parent` 由于 `opacity` 小于 1 创建了一个堆叠上下文，`.child1` 的 `z-index` 只在 `.parent` 这个堆叠上下文中生效，所以 `.sibling` 会覆盖 `.child1`，即使 `.child1` 的 `z-index` 看起来更大。



### 常见场景

- 元素嵌套过深，想要管控层级顺序，必须考虑层级上下文
    1. 保证所有层级元素都在同一个层级上下文中，直接根据 `z-index` 值控制层级顺序。
    2. 若不能在同个层级上下文，需要保证元素的父代节点在同个层级上下文，根据 `z-index` 值控制父代层级顺序即可。
- 元素设置了 `transform` / `filter` 属性导致 `z-index` 失效，同样考虑层级上下文。
- 父元素设置了 `transform` / `filter` 属性导致子元素设置 `fixed` 定位时，不是相对屏幕定位。
    1. 去掉 `transform` / `filter` 属性
    2. 调整父子层级为同层或者将子元素直接提到body层（子元素fixed定位）



### 总结

  


理解 `z-index` 的层级规则对于处理元素的堆叠顺序非常重要，特别是在处理复杂的布局和交互时。需要注意元素的定位、`z-index` 的取值以及堆叠上下文的影响。
