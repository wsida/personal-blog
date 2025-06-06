---
layout: doc
navbar: true
sidebar: true
title: note
---

# 笔记

::: info

开发日常的随记，可能只是突发奇想的idea，也可能是遇到的坑爹玩意～

:::

<el-divider></el-divider>

<script setup>
  import { ref, onMounted } from 'vue';
  import { withBase, useRouter } from 'vitepress';
  const router = useRouter();

  const notes = ref([
    // {
    //   time: '2025/06/06',
    //   title: 'Title',
    //   summary: 'summary',
    //   page: 'one'
    // }
  ]);

  onMounted(async () => {
    const modules = import.meta.glob('./!(index).md');
    // console.log('>>>modules', modules);

    const result = []
    for (const path in modules) {
      const module = await modules[path]();
      // console.log('>>>note', path, module);
      if (module.__pageData) {
        const frontmatter = module.__pageData.frontmatter;
        const note = path.split('/').pop().replace(/\.(md)$/, '');
        result.push({
          time: frontmatter.noteTime,
          title: frontmatter.noteTitle,
          summary: frontmatter.noteSummary,
          page: note
        });
      }
    }

    result.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    })

    notes.value = result;
  })

  function onRouter(page) {
    router.go(withBase(`/pages/note/${page}`));
  }
</script>

<el-timeline v-if="!!notes.length">
  <el-timeline-item v-for="note in notes" :timestamp="note.time" placement="top">
    <el-card class="cursor-pointer" shadow="hover" @click="onRouter(note.page)">
      <h4>{{ note.title }}</h4>
      <p class="text-ellipsis whitespace-nowrap overflow-hidden">{{ note.summary }}</p>
    </el-card>
  </el-timeline-item>
</el-timeline>

<el-empty v-else description="小编还在努力整理～" />
