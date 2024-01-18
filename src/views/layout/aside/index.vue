<!-- 侧边导航栏 -->
<template>
  <el-aside class="sumile-aside">
    <div class="aside-menu">
      <el-scrollbar>
        <div v-if="childMenu.menu.length > 0" class="menu-top-btn" @click="clearChildMenu">
          <i inline-flex class="i-ep-arrow-left ml-11px"></i>
          <span class="menu-top-title">返回上级导航</span>
        </div>
        <el-menu :default-active="activeMenu" class="sumile-aside-menus" :collapse="isMenuCollapse" menu-trigger="click"
          unique-opened v-if="childMenu.menu && childMenu.menu.length">
          <aside-menu-item :menus="childMenu.menu" @load-child-menu="loadChildMenu"
            :showIcon="childMenu.menu.length === 0" :activeMenu="activeMenu">
          </aside-menu-item>
        </el-menu>
        <el-menu :default-active="activeSubMenu" class="sumile-aside-menus" :collapse="isMenuCollapse" menu-trigger="click"
          unique-opened v-else>
          <aside-menu-item :menus="asideMenus" @load-child-menu="loadChildMenu" :showIcon="childMenu.menu.length === 0"
            :activeMenu="activeMenu">
          </aside-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </el-aside>
</template>

<script setup>
import { computed, reactive, toRefs, ref, watch, nextTick } from 'vue'
import { useMenusStore } from '@/stores/menus.js'
import { useRoute, useRouter } from 'vue-router'
import AsideMenuItem from './AsideMenuItem.vue';
import { useTagsStore } from "@/stores/tags.js";

const childMenu = ref({
  menu: []
})

const { isMenuCollapse, menus,  activeMenuId} = toRefs(useMenusStore())

const asideMenus = ref([])
function loadAsideMenus() {
  let menu = menus.value.find(menu => activeMenuId.value === menu.id)
  asideMenus.value = menu && menu.children && menu.children.length ? menu.children : [];
}

loadAsideMenus()


watch(() => (activeMenuId.value), () => {
  loadAsideMenus()
})

const route = useRoute()
const router = useRouter()
const activeMenu = ref(route.path)
const activeSubMenu = ref(route.path)

watch(() => (route.path), () => {
  activeMenu.value = route.path
  nextTick(() => {
    if(!childMenu.value.menu || !childMenu.value.menu.length) {
      activeSubMenu.value = route.path
    }

    /**
     * 切换tag时，刷新左侧菜单激活状态
     */
     const { tags } = useTagsStore();
     const currentTag = tags.arr.find(item => item.value === route.path)
     // 在左侧为子菜单，从顶部切换tag到一级菜单
     if(currentTag.meta.parentPath === route.path && childMenu.value.menu.length) {
      childMenu.value.menu = []
      nextTick(() => {
        activeSubMenu.value = route.path
      })
     }

     if(currentTag.meta.parentPath !== route.path && !childMenu.value.menu.length) {
      activeSubMenu.value = currentTag.meta.parentPath
     }

  })
})

/**
 * 加载三四级路由菜单
 * @param {*} menus 
 * @param {*} path 
 */
function loadChildMenu (menus, path) {
  childMenu.value.menu = menus instanceof Array ? menus : [menus]
  activeSubMenu.value = path
}


/**
 * 返回上级导航
 */
function clearChildMenu () {
  childMenu.value.menu = []
  activeMenu.value = route.path
}

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
  box-shadow: var(--sumile-box-shadow);

}

.aside-menu .el-menu {
  border-right: none;
}

.menu-top-btn {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 7px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-top-btn .menu-top-title {
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
}

.menu-top-btn .i-ep-arrow-left {
  color: rgba(0, 0, 0, 0.65);
}
</style>
