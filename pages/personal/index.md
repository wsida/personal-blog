---
layout: doc
navbar: true
sidebar: true
title: personal
---

# 关于我

:::info

想成为朋友，先从了解我开始！

:::

<el-divider></el-divider>

<style>
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
</style>

<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { withBase } from 'vitepress'

const options = ref([
  {
    label: '基本信息',
    value: 'basic',
  },
  {
    label: '学习经历',
    value: 'study',
  },
  {
    label: '工作经历',
    value: 'work',
  },
  {
    label: '个人展示',
    value: 'person',
  }
]);

const tab = ref('basic');

const tags = ref([
  {
    type: 'success',
    text: '专注型'
  },
  {
    type: 'primary',
    text: '前端开发'
  },
  {
    type: 'info',
    text: '计划型'
  },
  {
    type: 'warning',
    text: 'ESTJ'
  },
  {
    type: 'danger',
    text: '爱拍照'
  }
]);


const skill = ref(['HTML', 'Javascript', 'Typescript', 'JQuery', 'Vue2/3', 'UniApp', '微信小程序', 'React', 'Vuex', 'Iconify', 'ElementPlus', 'TailwindCss', 'UnoCss', 'VueRouter', 'Pinia', 'VueUse', 'Lodash', 'Dayjs/Momentjs', 'Echarts', 'AMap/BMap', 'Webpack', 'Vite', 'Vitepress', 'Mockjs']);
const otherSkill = ref(['Vscode', 'HbuildX', 'Modao', 'Drama', 'Jianyin', 'Meitu', 'PPT', 'Focusky', 'Xmind']);
const interest = ref([
  ['拍照', '画画', '手工'],
  ['打篮球', '打羽毛球', '打乒乓球', '桌球'],
  ['麻将', '户外野营'],
  ['旅行', '逗猫', '户外散步'],
])
</script>

<el-segmented class="mb-6" v-model="tab" size="large" :options="options" />

<!--基本信息-->
<div v-show="tab === options[0].value">
<el-row :gutter="20">
  <el-col :xs="24" :sm="24" :md="8" :lg="6">
    <div class="flex flex-col items-center justify-start">
      <el-avatar shape="circle" :size="108" :src="withBase('/images/icon.jpeg')" />
      <h1 class="my-6">汪思达</h1>
      <div class="text-gray-400 text-sm">我是一名前端工程师</div>
      <el-divider></el-divider>
      <div class="flex gap-2 justify-center flex-wrap">
        <el-tag v-for="tag in tags" :type="tag.type">{{ tag.text }}</el-tag>
      </div>
    </div>
  </el-col>
  <el-col :xs="24" :sm="24" :md="16" :lg="18">
    <el-descriptions title="我的简介" :column="2" label-width="80px" size="large" border>
      <el-descriptions-item label="姓名">汪思达</el-descriptions-item>
      <el-descriptions-item label="手机号">136****8177</el-descriptions-item>
      <el-descriptions-item label="籍贯">福建泉州</el-descriptions-item>
      <el-descriptions-item label="民族">汉族</el-descriptions-item>
      <el-descriptions-item label="地址">福建省泉州市丰泽区**街道****</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="我的技能" :column="1" label-width="80px" size="large" border>
      <el-descriptions-item label="主要技术栈">
        <el-space wrap>
          <el-tag v-for="tag in skill" size="large">{{ tag }}</el-tag>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="常用App">
        <el-space wrap>
          <el-tag v-for="tag in otherSkill" type="warning" size="large">{{ tag }}</el-tag>
        </el-space>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="我的兴趣" :column="1" label-width="80px" size="large" border>
      <el-descriptions-item label="技能型">
        <el-space wrap>
          <el-tag v-for="tag in interest[0]" size="large">{{ tag }}</el-tag>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="运动型">
        <el-space wrap>
          <el-tag v-for="tag in interest[1]" type="success" size="large">{{ tag }}</el-tag>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="社交型">
        <el-space wrap>
          <el-tag v-for="tag in interest[2]" type="warning" size="large">{{ tag }}</el-tag>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="自然型">
        <el-space wrap>
          <el-tag v-for="tag in interest[3]" type="info" size="large">{{ tag }}</el-tag>
        </el-space>
      </el-descriptions-item>
    </el-descriptions>
  </el-col>
</el-row>
</div>

<!--学习经历-->
<div v-show="tab === options[1].value">
  <el-timeline>
    <el-timeline-item timestamp="2012/09" placement="top">
      <el-card>
        <h4>高中</h4>
        <p>就读福建泉州惠安高级中学，高二、高三曾担任<b>班长</b>一职</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2015/09" placement="top">
      <el-card>
        <h4>大学<el-tag class="ml-2" type="danger">年段前10</el-tag></h4>
        <p>就读福建福州大学软件工程专业，担任过班级<b>学习委员</b>、<b>体育委员</b>，</p>
        <p>课外加入院红十字会社团，并参与过相关社团活动</p>
        <p>拿过多次学年奖学金</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>

<!--工作经历-->
<div v-show="tab === options[2].value">
  <el-timeline>
    <el-timeline-item timestamp="2018/06-2018/10" placement="top">
      <el-card>
        <h4>福州半云科技｜⼯业⼤脑部⻔<el-tag class="ml-2" type="info">实习</el-tag></h4>
        <p>担任前端开发工程师一职</p>
        <p>主要使用技术栈：React</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2019/09-2020/06" placement="top">
      <el-card>
        <h4>泉州南威软件股份有限公司｜网链部门<el-tag class="ml-2" type="primary">正式</el-tag></h4>
        <p>担任前端开发工程师一职</p>
        <p>主要使用技术栈：JQuery、Vue2、微信小程序</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2020/06-2024/06" placement="top">
      <el-card>
        <h4>厦门网宿股份有限公司｜Portal中台部<el-tag class="ml-2" type="primary">正式</el-tag></h4>
        <p>担任高级前端开发工程师一职</p>
        <p>主要使用技术栈：Vue2、Vue3</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2024/06-至今" placement="top">
      <el-card>
        <h4>泉州易客创新｜艾奇科技<el-tag class="ml-2" type="primary">正式</el-tag></h4>
        <p>担任软件工程师一职</p>
        <p>主要使用技术栈：Vue2、Vue3、UniApp、微信小程序</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>

<!--个人展示-->
<div v-show="tab === options[3].value">
  <el-empty description="小编还在努力整理～" />
</div>