<script setup>
import {Updater} from '@/util/update-subcribe.js'
import config from '@/config/index'
import { ElConfigProvider } from 'element-plus'
// 引入中文包
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// let locale = zhCn
// 设置浏览器title
document.title = config.websiteTitle

// 生产环境添加代码更新检查逻辑
if(import.meta.env.MODE === 'prod') {
  const updater = new Updater({
    timer:2000
  })
  //未更新通知
  updater.on('no-update',()=>{
    console.log('未更新')
  })
  //更新通知
  updater.on('update',()=>{
      console.log('更新了')
  })
}

</script>

<template>
  <el-config-provider>
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
