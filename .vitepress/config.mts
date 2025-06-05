import { defineConfig } from 'vitepress';
import path from 'path';
import {
  demoblockPlugin,
  demoblockVitePlugin,
} from 'vitepress-theme-demoblock';
// import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/personal-blog/',
  title: 'wangsd-blog',
  description: 'a simple personal blog',
  themeConfig: {
    siteTitle: 'Wangsd',
    logo: '/statics/svg/橘猫.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/pages/article/' },
    ],

    sidebar: [
      {
        text: '关于我',
        link: '/pages/personal/',
      },
      {
        text: '文章',
        link: '/pages/article/',
      },
      {
        text: '作品集',
        link: '/pages/portfolio/',
      },
      {
        text: '如何联系我',
        link: '/pages/contact/',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wsida' },
      { icon: 'juejin', link: 'https://juejin.cn/user/2339351730073710' },
      { icon: 'csdn', link: 'https://blog.csdn.net/Wang_Si_D?type=blog' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Wangsd'
    }
  },
  markdown: {
    config: md => {
      md.use(demoblockPlugin, {
        customClass: "wsd-demoblock-custom"
      });
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': path.join(__dirname, '../statics'),
      },
    },
    plugins: [
      demoblockVitePlugin(),
      // jsx、tsx语法支持
      vueJsx(),
    ],
  },
});
