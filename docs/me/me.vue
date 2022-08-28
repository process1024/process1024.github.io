<template>
  <h1>关于我</h1>
  <p>hi, 我是Process1024，一名前端开发工程师，目前在厦门工作。</p>
  <p>
    你可以在这里找到我：
    <a v-for="(link, index) of links" :key="link.text" :href="link.href">{{
      `${link.text} ${index + 1 < links.length ? "、" : ""}`
    }}</a>
  </p>

  <p>邮箱：62916233@qq.com</p>
  <p>微信：629162344</p>
</template>

<script lang="ts" setup>
const links = [
  {
    text: "github",
    href: "https://github.com/process1024",
  },
  {
    text: "掘金",
    href: "https://juejin.cn/user/1011206427522078",
  },
  {
    text: "哔哩哔哩",
    href: "https://space.bilibili.com/28611918",
  },
];
</script>

<style></style>
