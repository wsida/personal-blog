---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/06/12
articleTags: shadowDOM,html
articleTitle: 什么是Shadow DOM
articleSummary: HTML原生组件的实现基于Shadow DOM。
---

<!--@include: ../../.vitepress/parts/article-child.md-->

> 我们常用的input、video、audio等这些元素，其实也是以组件的形式存在的，即[HTML Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)，这些都是得益于***Shadow DOM***才能实现。


## 什么是Shadow DOM

Shadow DOM是HTML的一个规范 ，它允许浏览器开发者封装自己的HTML标签、CSS样式和特定的javascript代码，同时也可以让开发人员创建类似\<video\>这样的自定义一级标签，创建这些新标签内容和相关的的API被称为 **Web Components**。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f62294b6e0946c792f78efba77c6422~tplv-k3u1fbpfcp-watermark.image?)

-  **shadow-root**：Shadow DOM的根节点
-  **shadow-tree**：Shadow DOM包含的子节点树结构
-  **shadow-host**：Shadow DOM的容器元素（宿主节点），如：\<video\>标签



## 深入理解Shadow DOM

以 `input` 为例，可以看到input内部包含 shadow-root 节点
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/731a5e2c6d7443d8a5b47f3bb88960ff~tplv-k3u1fbpfcp-watermark.image?)


选中 `input` 的 **shadow-root** 内部的第一个节点 `-webkit-input-placeholder`
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b235283e936f42d682e1b9c0a312910e~tplv-k3u1fbpfcp-watermark.image?)

可以看到一个伪类 `input::-webkit-input-placeholder`

可以通过这个伪类对 **shadow-root** 进行样式覆盖
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/613ca66ef1dd4dffbcadf9b1fce9661a~tplv-k3u1fbpfcp-watermark.image?)


## 自定义Shadow DOM

### 创建

#### ~【*已废弃*】Element.createShadowRoot()~

**可以通过 `Element.createShadowRoot()` 来创建 shadow-root，并附加到调用元素节点（作为shadow-host）**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>shadow-dom</title>
    <style>
        h1 {
            color: #db73ff !important;
        }
    </style>
</head>
<body>
<el-h1>
    <h1>这是不支持shadow-dom的标题~</h1>
</el-h1>
<script>
    if (document.body.createShadowRoot) {
    
        // 作为 shadow-host 的元素节点
        let host = document.querySelector('el-h1');
        // 创建 shadow-root
        let root = host.createShadowRoot();
        
        // 为 shadow-root 添加内容
        root.innerHTML = '<h1 style="background-color: #2cacff; color: white;">这是支持shadow-dom的标题~</h1>';
    }
</script>
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/361994333a5f4aedb973f3a3e7d90a4e~tplv-k3u1fbpfcp-watermark.image?)


#### 【*推荐*】Element.attachShadow()

**可以通过 `Element.attachShadow(shadowRootInitshadowRootInit)` 方法给指定的元素挂载一个Shadow DOM，并且返回对 `shadow-root` 的引用**


***shadowRootInit***： 一个 `ShadowRootInit` 字典，包括下列字段：

-   `mode 模式`

    指定 Shadow DOM 树 *封装模式* 的字符串，可以是以下值：

    -   `open` shadow root元素可以从js外部访问根节点，例如使用 [`Element.shadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot):

    ```
        element.shadowRoot; // 返回一个ShadowRoot对象
    ```

    -   `closed` 拒绝从js外部访问关闭的shadow root节点

    ```
        element.shadowRoot; // 返回null
    ```

-   `delegatesFocus 焦点委托`

    一个布尔值, 当设置为 `true` 时, 指定减轻自定义元素的聚焦性能问题行为.\
    当shadow DOM中不可聚焦的部分被点击时, 让第一个可聚焦的部分成为焦点, 并且shadow host（影子主机）将提供所有可用的 `:focus` 样式.
    
    
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>shadow</title>
</head>

<body>
    <div>hello world</div>
    <div id="shadow"></div>
    <script>
        let host = document.getElementById("shadow")
        // 创建 shadow-root
        let root = host.attachShadow({ mode: 'open' });  
        let pElem = document.createElement('p');
        let styleElem = document.createElement('style');

        styleElem.innerHTML = 'p{color:red}';
        pElem.innerHTML = 'hello shadow';

        root.appendChild(pElem);
        // 外部样式影响不了影子节点内部样式
        document.body.appendChild(styleElem);
        
        console.log(document.getElementById('shadow').firstChild) // 返回null
        console.log(document.getElementById('shadow').shadowRoot.firstChild)
        // 返回shadow DOM节点
    </script>
</body>

</html>
```


[传送门](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow#%E5%8F%AF%E4%BB%A5%E8%A2%AB%E6%8C%82%E8%BD%BD%E7%9A%84shadow_dom%E5%85%83%E7%B4%A0)


### 实例应用（Web Components）

利用template标签来实现的Shadow DOM
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/547e20e673c843bfbbe386950b4c88de~tplv-k3u1fbpfcp-watermark.image?)


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>shadow-dom</title>
    <style>
        h1, p {
            color: #db73ff !important;
        }
        #host {
            background-color: yellow;
        }
        span {
            text-decoration: underline;;
        }
    </style>
</head>
<body>
<h1>I am first title</h1>
<div id="host">
    <h1 slot="title" class="title">I am second title</h1>
    <p slot="subtitle" class="subtitle">I am subtitle</p>
</div>
<template id="temp">
    <style>
        span {
            color: red;
        }
        p, h1 {
            background-color: #60d9ff;
        }
        :host {
            border: 2px solid #14ff1a;
        }
        ::slotted(.title) {
            background-color: #60d900;
        }
    </style>
    <p onclick="alert('hello~');" pseudo="test">template - 点我吧~~</p>
    <span pseudo="shadow-root-span" class="shadow-root-span">I'm the span tag of template</span>
    <!-- 绑定#host所有内容 -->
    <!-- <slot></slot> -->

    <!-- 绑定#host p的内容 -->
    <slot name="subtitle"></slot>
    <!-- 绑定#host h1的内容 -->
    <slot name="title"></slot>
</template>
<script>
    var host = document.querySelector('#host');
    var root = host.attachShadow({mode:'open'});
    var temp = document.querySelector('#temp');
    var clone = document.importNode(temp.content, true);

    root.appendChild(clone);
    document.addEventListener('click', function(e) {
        console.log(e.target.innerHTML + ' click!');
        console.log(e);
    });
</script>
```

> ***要注意的是，***
> - 不是每一种类型的元素都可以附加到shadow root（影子根）下面。出于安全考虑，一些元素不能使用 shadow DOM（例如[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)），以及许多其他的元素。
> - **Shadow DOM 并不在主DOM树内**
> - **Shadow DOM 和主DOM的样式隔离，不相互影响**。p, h1 样式对主DOM不生效，span样式对Shadow DOM不生效
> - **在Shadow DOM中用 `:host` 选择器表示 shadow-host**。还有 :host-content(elements) 和 :host(selector) 两个选择器，表示特定 shadow-root
> - **在Shadow DOM中用 `::slotted()`伪类表示 元素节点插槽，不包括文本节点**，只在Shadow DOM 样式中生效
> - 要更改shadow-root里面元素的样式，可以直接在template标签内添加style标签像平时写样式一样即可。
> - **[slot 标签](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_templates_and_slots)**，定义插槽。在shadow-root内定义插槽（支持具名插槽、以及默认插槽内容），然后在 shadow-host 绑定插槽

*原文的[`<content>`] **已废弃**，改用 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) 代替*


### Shadow DOM 事件

示例同上

点击 主DOM first title，触发事件节点为h1，打印实际节点内容
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bf74db1528b4547aa60573bb3e0e9eb~tplv-k3u1fbpfcp-watermark.image?)


点击 Shadow DOM 插槽内容 subtitle，触发事件节点为 p，打印实际节点内容
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e27528ac7e224f0280c8025399e80983~tplv-k3u1fbpfcp-watermark.image?)


点击 Shadow DOM 插槽内容 second title，触发事件节点为 h1，打印实际节点内容
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a47905a2cf2b4c53b19a2d92a88b8da4~tplv-k3u1fbpfcp-watermark.image?)


点击 Shadow DOM 节点p，事件触发节点为 p，p自身绑定的click事件会触发，同时正常冒泡事件，最终打印的是#host节点（宿主 shadow-host）内容
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cde82eda83f94228a37d43eef0e346bc~tplv-k3u1fbpfcp-watermark.image?)


点击 Shadow DOM 节点span，事件触发节点为 span，同时正常冒泡事件，最终打印的是#host节点（宿主 shadow-host）内容
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16fbb8fe0b4246b2bca152257cad014c~tplv-k3u1fbpfcp-watermark.image?)

***总结：***

- Shadow DOM的事件全部绑定到了宿主对象（shadow-host）上面，避免破坏主DOM的事件。

- slot的内容，实际在主DOM上，所以没有没有重定向到宿主上面。

- 可以为shadow-root里面的节点绑定事件，能正常触发，同时事件也会正常冒泡。



## Elements 查看Shadow DOM

以`Google`浏览器为例，DevTools支持查看隐藏的 Shadow DOM


点击设置
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dd3223dc5b045adb2f400156604a173~tplv-k3u1fbpfcp-watermark.image?)


选择 `Preferences` -> `Elements` -> 勾选 `Show user agent shadow DOM`
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5537b5ee7d9a4dcebebf013bbf26bf10~tplv-k3u1fbpfcp-watermark.image?)


Elements Panel 面板的文档树，就会显示 **shadow-root**
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7961b842d1b473ebd383f3004e92e4d~tplv-k3u1fbpfcp-watermark.image?)


未勾选，**shadow-root** 会被隐藏

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/775efae9f6d34b0bb7c2c15f4f10b284~tplv-k3u1fbpfcp-watermark.image?)



---

[Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

**参考**\
作者：家里有棵核桃树\
链接：https://www.jianshu.com/p/e47b103f3b60\
来源：简书\
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

