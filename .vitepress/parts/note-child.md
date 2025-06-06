<script setup>
  import { withBase } from 'vitepress';
</script>

<el-breadcrumb class="mb-8" separator="/">
  <el-breadcrumb-item>
    <el-link :href="withBase('/pages/note/')" target="_self">笔记</el-link>
  </el-breadcrumb-item>
  <el-breadcrumb-item>{{ $frontmatter.noteTitle }}</el-breadcrumb-item>
</el-breadcrumb>