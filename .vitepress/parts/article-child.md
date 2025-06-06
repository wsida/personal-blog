<script setup>
  import { withBase } from 'vitepress';
</script>

<el-breadcrumb class="mb-8" separator="/">
  <el-breadcrumb-item>
    <el-link :href="withBase('/pages/article/')" target="_self">文章</el-link>
  </el-breadcrumb-item>
  <el-breadcrumb-item>{{ $frontmatter.articleTitle }}</el-breadcrumb-item>
</el-breadcrumb>