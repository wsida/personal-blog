// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import 'virtual:uno.css'
import './style.css'
import DefaultTheme from 'vitepress/theme'
import "vitepress-theme-demoblock/dist/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册自定义全局组件
    app.use(ElementPlus, { locale: zhCn });
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
  }
} satisfies Theme
