<!-- Layout -->
<template>
  <div class="common-layout" :class="{'sumile--collapse': isMenuCollapse}">
      <el-container class="sumile-container" direction="vertical">
        <Top></Top>
        <el-container class="sumile-el-container">
          <Aside></Aside>
          <el-main class="sumile-main">
            <Tags />
            <router-view class="sumile-view"></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script setup>
import {toRefs} from 'vue'
import {useMenusStore} from '@/stores/menus'
import Top from './top/index.vue'
import Aside from './aside/index.vue'
import Tags from './top/tags.vue'
import { findRootNodeByPath } from '@/util/util'
import { useRoute } from 'vue-router'

const {isMenuCollapse, menus} = toRefs(useMenusStore())
const activeTopMenuId = ref()
const route = useRoute()

watchEffect(() => {
  // 根据当前页面地址查找顶部菜单的id
  const node = findRootNodeByPath(menus.value, route.path)
  if(!node) { // 动态路由里没匹配到, 则匹配顶部菜单路径
    const routePrefix = '/' + route.path.split('/')[1]
    const matched = menus.value.find(item => item.path === routePrefix)
    activeTopMenuId.value =  matched?.id || ''
  } else {
    activeTopMenuId.value =  node?.id || ''
  }
  
})

provide('activeTopMenuId', activeTopMenuId)

</script>

<style scoped>
.sumile-container {
  height: 100%;
}
.sumile-el-container {
  height: calc(100% - var(--sumile-header-height));
}
.sumile-main {
  padding: 15px 15px 0 0;
  display: flex;
  flex-direction: column;
}
.sumile-view {
  flex: 1;
}
</style>
