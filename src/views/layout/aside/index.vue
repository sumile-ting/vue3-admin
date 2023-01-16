<!-- 侧边导航栏 -->
<template>
  <el-aside class="sumile-aside">
    <div class="aside-menu">
      <el-menu
        default-active="2"
        class="sumile-aside-menus"
        :collapse="isMenuCollapse"
      >
        <el-menu-item index="item.path" v-for="item in menus" :key="item.id">
          <el-icon><icon-menu /></el-icon>
          <template #title>{{item.name}}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script setup>
import {computed, reactive} from 'vue'
import {useMenusStore} from '@/stores/menus.js'
import {useRoute} from 'vue-router'
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
const route = useRoute()
const menus = computed(() => {
  const {activeMenuId, menus} = useMenusStore()
  let menu = menus.find(menu => activeMenuId === menu.id)
  return menu && menu.children && menu.children.length ? menu.children : [];
})
const activeMenu = computed(() => {
  return route.path
})
</script>

<style scoped>
.sumile-aside {
  width: var(--sumile-aside-width);
  padding: 15px;
}
.aside-menu {
  height: 100%;
  padding: 10px 0;
  background: #fff;
  border-radius: var(--sumile-card-border-radius);
  box-shadow: 0px 8px 8px 0px rgb(69 90 199 / 7%);
}
</style>
