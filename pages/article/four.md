---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/06/12
articleTags: css,css-loader
articleTitle: 一文了解css loader
articleSummary: 前端项目时都会使用到sass-loader、less-loader、postcss-loader、css-loader、style-loader，但这些loader在其中起到什么作用呢？
---

<!--@include: ../../.vitepress/parts/article-child.md-->

> 大家都清楚在使用webpack构建前端项目时都会使用到sass-loader、less-loader、postcss-loader、css-loader、style-loader，但这些loader在其中起到什么作用呢？本篇主要阐述这些loader在打包中所扮演的角色。

# 概述
1、`css-loader`: 加载.css文件的loader，会对 `@import` 和 `url()` 进行处理

2、`style-loader`: 使用`<style>`将css-loader内部样式注入到我们的HTML页面

3、`postcss-loader`: 使用 [`PostCSS`](https://github.com/postcss/postcss) 处理 CSS 的 loader

4、`less-loader`: 将 Less 编译为 CSS 的 loader

5、`sass-loader`: 将 Sass/SCSS 文件并将他们编译为 CSS 的 loader

*通常将 `style-loader` 与 [`css-loader`](https://webpack.docschina.org/loaders/css-loader/) 一起使用*

## css-loader

`css-loader` 的主要作用是帮助 webpack 打包处理 CSS 文件。具体来说，它解析 CSS 文件中的 `@import` 和 `url()` 语句，就像 JavaScript 解析 `import/require()` 一样，然后将这些 CSS 文件或资源（如字体、图片等）处理并合并成一段 CSS 代码‌12。

以下是 `css-loader` 的几个关键特点和作用：

1.  ‌**解析和合并 CSS**‌：`css-loader` 会分析出各个 CSS 文件之间的关系，并将它们合并成一段 CSS，这有助于减少 HTTP 请求的数量，提高页面加载速度。
2.  ‌**处理 `@import` 和 `url()`** ‌：当 CSS 文件中包含 `@import` 语句或 `url()` 引用时，`css-loader` 会解析这些语句，并将相应的资源引入或处理。
3.  ‌**与 `style-loader` 配合使用**‌：`css-loader` 通常与 `style-loader` 配合使用，`style-loader` 会将 `css-loader` 生成的 CSS 代码挂载到页面的 `<head>` 部分，以 `<style>` 标签的形式插入到 HTML 中。这样，CSS 样式就可以被页面应用了。
4.  ‌**支持模块化**‌：`css-loader` 支持 CSS 模块化，可以将 CSS 封装成模块，避免全局污染。
5.  ‌**配置灵活**‌：`css-loader` 的配置非常灵活，可以通过 webpack 的配置文件（如 `webpack.config.js`）进行各种自定义设置，以满足不同的开发需求。

需要注意的是，`css-loader` 只是一个处理 CSS 文件的 loader，它本身并不具备将 CSS 插入到 HTML 中的功能。这个功能是由 `style-loader` 实现的。因此，在使用 `css-loader` 时，通常需要与 `style-loader` 配合使用‌。

**`css-loader` 只用来帮助javascript识别.css文件，分析css文件中的关系（处理@import），然后合并成一句样式字符串，仅此而已，不会进行样式转换/样式插入。**

## style-loader

‌[style-loader](https://www.baidu.com/s?sa=re_dqa_generate&wd=style-loader&rsv_pq=f08e15100216791e&oq=style-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=16858B5OBk5w61ugbc1TdI6eS7ogw8y7oIlkI4SuWihI6u6GNgFh+AvqQRO46nidUSWU&tn=baiduhome_pg&ie=utf-8)的作用是将[CSS代码](https://www.baidu.com/s?sa=re_dqa_generate&wd=CSS%E4%BB%A3%E7%A0%81&rsv_pq=f08e15100216791e&oq=style-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=16858B5OBk5w61ugbc1TdI6eS7ogw8y7oIlkI4SuWihI6u6GNgFh+AvqQRO46nidUSWU&tn=baiduhome_pg&ie=utf-8)以`<style>`标签的形式插入到HTML文件中，从而实现样式的加载和生效。** ‌

在构建过程中，[style-loader](https://www.baidu.com/s?sa=re_dqa_generate&wd=style-loader&rsv_pq=f08e15100216791e&oq=style-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=16858B5OBk5w61ugbc1TdI6eS7ogw8y7oIlkI4SuWihI6u6GNgFh+AvqQRO46nidUSWU&tn=baiduhome_pg&ie=utf-8)扮演着粘合剂的角色，它负责将JS中的CSS加载到HTML中。具体来说，当打包过程中遇到需要加载CSS的情况时，它会利用style-loader将CSS代码嵌入到HTML文件的`<head>`部分，以`<style>`标签的形式呈现，这样浏览器就能正确解析并应用这些样式，使得网页能够呈现出预期的视觉效果。

## postcss-loader

### postcss 的作用

*‌**‌[PostCSS**](https://www.baidu.com/s?wd=PostCSS&rsv_idx=2&tn=baiduhome_pg&usm=1&ie=utf-8&rsv_pq=8e193bdb0384b408&oq=postcss%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=15fd9bnqnevhQJTN3Li4NbVO76qfdCGy2%2FqcdMuumvmZGKuLUiNaNp9iV6msSSYIs8Rc&sa=re_dqa_generate)的核心作用**‌*是转换CSS和处理CSS。它通过插件机制来处理CSS文件，支持各种转换任务，如自动添加浏览器前缀、压缩代码、使用未来CSS语法等。‌12

*‌**PostCSS的功能和应用场景**‌*包括但不限于：

-   *‌**添加浏览器前缀**‌*：自动为CSS属性添加必要的浏览器前缀，确保跨浏览器兼容性。
-   *‌**压缩代码**‌*：减少CSS文件的大小，提高页面加载速度。
-   *‌**使用未来CSS语法**‌*：支持最新的CSS特性，如变量和混合器，提高开发效率。
-   *‌**优化和转换**‌*：优化CSS结构，转换旧版CSS到新版，提高代码的可维护性和性能。

通过 `postcss-loader` 可以实现对CSS文件的进一步处理，包括但不限于添加浏览器前缀、压缩CSS等，最后在交给`style-loader`注入到html中。

如postcss-loader通过集成如[autoprefixer**](https://www.baidu.com/s?sa=re_dqa_generate&wd=autoprefixer&rsv_pq=be61b0bd00f3697c&oq=postcss-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=621cv7Va7zN8ANNhc+yoezodvuwM+J06O6m8pDefoV/kI4tdAsZmbXUc81p70chKaK1z&tn=baiduhome_pg&ie=utf-8)等插件，可以自动为CSS添加浏览器前缀，确保样式在不同浏览器中的一致性‌，帮助开发者简化CSS代码，提高开发效率

*直观的体验就是使用postcss-loader后，一般我们不需要写ie样式兼容，浏览器前缀兼容，在html查看样式代码时能从控制台看到生成的代码自动带了这些样式转换*

## less-loader

‌[less-loader](https://www.baidu.com/s?sa=re_dqa_generate&wd=less-loader&rsv_pq=ddc1651a038886af&oq=less-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=e5bcwLhOcXD8MOIlC32wURApLU0tktSQI1KmpLN01sa1CXhGMPfxVg0/SnYRB3CbMPS+&tn=baiduhome_pg&ie=utf-8)的主要作用是将[Less](https://www.baidu.com/s?sa=re_dqa_generate&wd=Less&rsv_pq=ddc1651a038886af&oq=less-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=e5bcwLhOcXD8MOIlC32wURApLU0tktSQI1KmpLN01sa1CXhGMPfxVg0/SnYRB3CbMPS+&tn=baiduhome_pg&ie=utf-8)文件转换为浏览器可以识别的[CSS](https://www.baidu.com/s?sa=re_dqa_generate&wd=CSS&rsv_pq=ddc1651a038886af&oq=less-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=e5bcwLhOcXD8MOIlC32wURApLU0tktSQI1KmpLN01sa1CXhGMPfxVg0/SnYRB3CbMPS+&tn=baiduhome_pg&ie=utf-8)代码。

Less是一种CSS预处理语言，它扩展了CSS的功能，允许使用变量、Mixin、函数等特性，使得CSS更加灵活和可维护。然而，浏览器直接支持的是原始的CSS代码，而不支持Less语言的特性。因此，为了在Webpack项目中顺利使用Less，需要将Less文件转换为浏览器可以理解的CSS代码。这就是less-loader的作用所在。它接收由Webpack处理的Less文件，并将其转换成可被浏览器理解的CSS，从而实现了Less语法在现代前端开发流程中的应用。

但Less代码并不是浏览器可以直接识别的样式代码，需要less-loader通过将Less代码转换为CSS代码，才能在浏览器生效。

*less-loader如果没有less文件可以不用装*

## sass-loader

同 `less-loader` 类似。

‌[sass-loader](https://www.baidu.com/s?sa=re_dqa_generate&wd=sass-loader&rsv_pq=829f175e00f45ff4&oq=sass-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=f23fXas2MXNvXnJ5b8xwUhLGg1D5xDV3KpbKJObhlNPQC+60nzTZd4hXYVEXostQhEzX&tn=baiduhome_pg&ie=utf-8)的主要作用是将[Sass/Scss](https://www.baidu.com/s?sa=re_dqa_generate&wd=Sass%2FScss&rsv_pq=829f175e00f45ff4&oq=sass-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=f23fXas2MXNvXnJ5b8xwUhLGg1D5xDV3KpbKJObhlNPQC+60nzTZd4hXYVEXostQhEzX&tn=baiduhome_pg&ie=utf-8)语法转换为[CSS](https://www.baidu.com/s?sa=re_dqa_generate&wd=CSS&rsv_pq=829f175e00f45ff4&oq=sass-loader%E7%9A%84%E4%BD%9C%E7%94%A8&rsv_t=f23fXas2MXNvXnJ5b8xwUhLGg1D5xDV3KpbKJObhlNPQC+60nzTZd4hXYVEXostQhEzX&tn=baiduhome_pg&ie=utf-8)语法，以便浏览器能够识别和加载。

sass-loader是Webpack中的一个加载器（loader），它的作用在于处理Sass或Scss文件，将其转换为浏览器能够理解的CSS格式。Sass是一种CSS预处理器，它提供了变量、嵌套、混合等高级功能，使得CSS开发更加高效和灵活。然而，浏览器只能直接理解和加载CSS文件，因此需要将Sass或Scss代码转换为CSS格式。sass-loader正是执行这一转换任务的工具。

*sass-loader如果没有sass/scss文件可以不用装*

## loader执行顺序

[less-loader/sass-laoder] -》[css-loader] -》[postcss-laoder] -》[style-loader]

`less-loader`/`sass-laoder`、`postcss-laoder`可选，`postcss-laoder`建议选，`css-loader`/`style-loader`配合使用。