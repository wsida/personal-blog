---
layout: doc
navbar: true
sidebar: true
title: article
---

# 文章

::: info

自己整理的博文、或是转发的博文，总有一篇能够帮助你～

:::

<el-divider></el-divider>

<script setup>
  import { ref, onMounted } from 'vue';
  import { withBase, useRouter } from 'vitepress';
  const router = useRouter();

  const articles = ref([]);

  onMounted(async () => {
    const modules = import.meta.glob('./!(index).md');
    // console.log('>>>modules', modules);

    const result = []
    for (const path in modules) {
      const module = await modules[path]();
      // console.log('>>>article', path, module);
      if (module.__pageData) {
        const frontmatter = module.__pageData.frontmatter;
        const article = path.split('/').pop().replace(/\.(md)$/, '');
        result.push({
          time: frontmatter.articleTime,
          title: frontmatter.articleTitle,
          summary: frontmatter.articleSummary,
          tags: frontmatter.articleTags?.split(',') ?? [],
          page: article
        });
      }
    }

    result.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    })

    articles.value = result;
  })

  function onRouter(page) {
    router.go(withBase(`/pages/article/${page}`));
  }
</script>

<el-timeline v-if="!!articles.length">
  <el-timeline-item v-for="article in articles" :timestamp="article.time" placement="top">
    <el-card class="cursor-pointer" shadow="hover" @click="onRouter(article.page)">
      <h4>{{ article.title }}</h4>
      <el-space wrap class="mt-2">
        <el-tag v-for="tag in article.tags">{{ tag }}</el-tag>
      </el-space>
      <p class="text-ellipsis whitespace-nowrap overflow-hidden">{{ article.summary }}</p>
    </el-card>
  </el-timeline-item>
</el-timeline>

<el-empty v-else description="小编还在努力整理～" />
