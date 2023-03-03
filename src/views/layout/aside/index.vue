<!-- 侧边导航栏 -->
<template>
  <el-aside class="sumile-aside">
    <div class="aside-menu">
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          class="sumile-aside-menus"
          :collapse="isMenuCollapse"
          menu-trigger="click"
          unique-opened
          router
        >
          <aside-menu-item :menus="menus"></aside-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </el-aside>
</template>

<script setup>
import {computed, reactive, toRefs} from 'vue'
import {useMenusStore} from '@/stores/menus.js'
import {useRoute} from 'vue-router'
import AsideMenuItem from './AsideMenuItem.vue';

const route = useRoute()

const {isMenuCollapse} = toRefs(useMenusStore())
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
  box-sizing: content-box;
}
.aside-menu {
  height: 100%;
  padding: 10px 0;
  background: var(--el-bg-color-overlay);
  border-radius: var(--sumile-card-border-radius);
  box-shadow: 0px 8px 8px 0px rgb(69 90 199 / 7%);

}
.aside-menu .el-menu {
  border-right: none;
}


</style>
