---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: article
articleTime: 2025/06/12
articleTags: webpack,vue-cli
articleTitle: Webpack量化打包时间和打包后分析
articleSummary: 主要介绍两个插件，用于量化打包时间，和打包后分析。
---

<!--@include: ../../.vitepress/parts/article-child.md-->

> 参考 https://blog.csdn.net/weixin_41779718/article/details/110038340

> 主要介绍两个插件，用于量化打包时间，和打包后分析。

# [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

> 可以测量各个插件和 loader 所花费的时间，构建完成后会显示时间信息：

## 安装：

```npm i speed-measure-webpack-plugin -D```

## 使用：

`new SpeedMeasurePlugin` 支持 `options`:

- `disabled`&lt;boolean&gt;：是否禁用插件
- `outputFormat`&lt;string&gt;: 展示信息格式
    -  `json`
    -  `human`: default
    -  `humanVerbose`
- `outputTarget`&lt;string|function&gt;：设置展示信息方式，默认使用 `console.log` function 在控制台打印信息；如果配置string，默认输出文件
- ...

## 配置：

```js
// vue-cli 4.x
// vue.config.js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
// const smp = new SpeedMeasurePlugin({
//     outputFormat: 'json',
//     outputTarget: 'build.speed.measure.json'
// })
module.exports = {
    // ...
    configureWebpack: smp.wrap({
        plugins: []
    })
    // ...
}
```

## 效果

控制台显示对应打包时间信息

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3752f570585147e2896732b266006255~tplv-k3u1fbpfcp-watermark.image?)

# [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

> 用于分析打包后bundle各个文件的大小

## 安装：

```npm i webpack-bundle-analyzer -D```

*在 Vue-cli 3.x 下，已经内置插件，无需手动安装*

## 配置：

在 `plugins` 中引用插件

```js
// vue-cli 4.x
// vue.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    // ...
    configureWebpack: smp.wrap({
        plugins: [
          // 这个要放在所有 plugins 最后
          new BundleAnalyzerPlugin()
        ]
    })
    // ...
}
```

## 效果

通过server服务展示打包后文件大小，浏览器打开 `127.0.0.1:8888`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/278b0b8853e34b8589bd224530605609~tplv-k3u1fbpfcp-watermark.image?)

# [hard-source-webpack-plugin](https://www.npmjs.com/package/hard-source-webpack-plugin)

> 这个是为模块提供中间缓存，效率提升很大。

## 安装：

```npm i hard-source-webpack-plugin -D```

## 配置：

在 `plugins` 中引用插件

```js
// vue-cli 4.x
// vue.config.js
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
    // ...
    configureWebpack: smp.wrap({
        plugins: [
          // 为模块提供中间缓存，缓存路径是：node_modules/.cache/hard-source
          new HardSourceWebpackPlugin(),
          new BundleAnalyzerPlugin()
        ]
    })
    // ...
}
```

# [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)

> 对于动态导入模块，提供通用的分块策略

> 从 webpack v4 开始，移除了 `CommonsChunkPlugin`，取而代之的是 `optimization.splitChunks`。

默认情况下，它只会影响到按需加载的 chunks，因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。

webpack 将根据以下条件自动拆分 chunks：

-   新的 chunk 可以被共享，或者模块来自于 `node_modules` 文件夹
-   新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
-   当按需加载 chunks 时，并行请求的最大数量小于或等于 30
-   当加载初始化页面时，并发请求的最大数量小于或等于 30

当尝试满足最后两个条件时，最好使用较大的 chunks。

```js
// vue-cli 4.x
// vue.config.js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\/]node_modules[\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
```

**拓展**

`package.json` 配置 `vue-cli-service inspect` 指令，可以查看当前生效的webpack配置项

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41a890fc8330456b852d8c306214b6e1~tplv-k3u1fbpfcp-watermark.image?)

默认打印配置到控制台，可使用 `>`/`>>` 管道直接输出配置到文件

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36dd52b9c6c34ad19517ee0eab5586c3~tplv-k3u1fbpfcp-watermark.image?)

也可以直接 `npm run inspect entry` 查看对应配置项内容，可同时查看多个配置项

- 查看entry

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8173edfcd0774caca96820a52c8e4986~tplv-k3u1fbpfcp-watermark.image?)

- 查看entry、output
 
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b191067a62eb44e68d288f1f341406f5~tplv-k3u1fbpfcp-watermark.image?)





