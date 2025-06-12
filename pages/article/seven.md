---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/06/12
articleTags: Web Components,html
articleTitle: Web Components
articleSummary: Web Components 标准非常重要的一个特性是，它使开发者能够将HTML页面的功能封装为 custom elements（自定义标签），而往常，开发者不得不写一大堆冗长、深层嵌套的标签来实现同样的页面功能。
---

<!--@include: ../../.vitepress/parts/article-child.md-->

> Web Components 标准非常重要的一个特性是，它使开发者能够将HTML页面的功能封装为 custom elements（自定义标签），而往常，开发者不得不写一大堆冗长、深层嵌套的标签来实现同样的页面功能。


## 声明

> [`CustomElementRegistry`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry) 接口的实例用来处理 web 文档中的 custom elements — 该对象允许你注册一个 custom element，返回已注册 custom elements 的信息，等等。

[`CustomElementRegistry.define()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define) \
用来注册一个 custom element，该方法接受以下参数：

-   表示所创建的元素名称的符合 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 标准的字符串。注意，custom element 的名称不能是单个单词，且其中[必须要有短横线](https://html.spec.whatwg.org/#valid-custom-element-name)。

-   用于定义元素行为的 [类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 。

-   `可选参数`，一个包含 `extends` 属性的配置对象，是可选参数。它指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素，如 `{extends: 'div'}`。


```javascript
// Create a class for the element
class WordCount extends HTMLParagraphElement {
  constructor() {
    // Always call super first in constructor
    super();

    // count words in element's parent element
    const wcParent = this.parentNode;

    function countWords(node){
      const text = node.innerText || node.textContent;
      return text.split(/\s+/g).length;
    }

    const count = `Words: ${countWords(wcParent)}`;

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create text node and add word count to it
    const text = document.createElement('span');
    text.textContent = count;

    // Append it to the shadow root
    shadow.appendChild(text);

    // Update count when element content changes
    setInterval(function() {
      const count = `Words: ${countWords(wcParent)}`;
      text.textContent = count;
    }, 200);
  }
}

// Define the new element
customElements.define('word-count', WordCount, { extends: 'p' });

// 使用
document.creatElement('p', {is: 'word-count'})

```


## 类型

共有两种 custom elements：

-   **Autonomous custom elements** 是独立的元素，它**不继承**其他内建的HTML元素。你可以直接把它们写成HTML标签的形式，来在页面上使用。例如 `<popup-info>`，或者是`document.createElement("popup-info")`这样。

-   **Customized built-in elements** **继承**自基本的HTML元素。在创建时，你必须指定所需扩展的元素（正如上面例子所示），使用时，需要先写出基本的元素标签，并通过 [`is`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-is) 属性指定custom element的名称。例如`<p is="word-count">`, 或者 `document.createElement("p", { is: "word-count" })`。


### Autonomous custom elements

定义自定义元素类
```javascript
class PopUpInfo extends HTMLElement {
  constructor() {
    // 必须首先调用 super方法
    super();

    // 元素的功能代码写在这里

    ...
  }
}
```


声明自定义元素
```
customElements.define('popup-info', PopUpInfo);
```


使用自定义元素
```
<popup-info img="img/alt.png" text="Your card validation code (CVC)
  is an extra security feature — it is the last 3 or 4 numbers on the
  back of your card.">
```


### Customized built-in elements

定义自定义继承元素类
```javascript
class ExpandingList extends HTMLUListElement {
  constructor() {
    // 必须首先调用 super方法
    super();

    // 元素的功能代码写在这里

    ...
  }
}
```


声明定义自定义继承元素
```
customElements.define('expanding-list', ExpandingList, { extends: "ul" });
```


使用定义自定义继承元素
```
<ul is="expanding-list">
  ...
</ul>
```


## 生命周期

在custom element的构造函数中，可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用：

-  `connectedCallback`：当 custom element首次被插入文档DOM时，被调用。
-  `disconnectedCallback`：当 custom element从文档DOM中删除时，被调用。
-  `adoptedCallback`：当 custom element被移动到新的文档时，被调用。
-  `attributeChangedCallback`: 当 custom element增加、删除、修改自身属性时，被调用。








---
[Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)