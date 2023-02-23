<script setup>
import config from '@/config/index'
import { ElConfigProvider } from 'element-plus'
// 引入中文包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
let locale = zhCn
// 设置浏览器title
document.title = config.websiteTitle
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
