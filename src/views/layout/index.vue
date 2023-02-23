<!-- Layout -->
<template>
  <div class="common-layout" :class="{'sumile--collapse': isMenuCollapse}">
      <el-container class="sumile-container" direction="vertical">
        <Top></Top>
        <el-container>
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
const {isMenuCollapse} = toRefs(useMenusStore())
</script>

<style scoped>
.sumile-container {
  height: 100%;
  background: var(--el-bg-color-overlay);
}
.sumile-main {
  padding: 15px 15px 15px 0;
  display: flex;
  flex-direction: column;
}
.sumile-view {
  flex: 1;
}
</style>
