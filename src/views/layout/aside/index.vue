<!-- 侧边导航栏 -->
<template>
  <el-aside class="sumile-aside">
    <div class="aside-menu">
      <el-scrollbar>
        <div v-if="childMenu.menu.length > 0" class="menu-top-btn"  @click="clearChildMenu">
          <i inline-flex class="i-ep-arrow-left ml-11px"></i>
          <span class="menu-top-title">返回上级导航</span>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="sumile-aside-menus"
          :collapse="isMenuCollapse"
          menu-trigger="click"
          unique-opened
          router
        >
          <aside-menu-item :menus="currentMenu" @load-child-menu="loadChildMenu" :showIcon="childMenu.menu.length === 0"></aside-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </el-aside>
</template>

<script setup>
import {computed, reactive, toRefs, ref} from 'vue'
import {useMenusStore} from '@/stores/menus.js'
import {useRoute} from 'vue-router'
import AsideMenuItem from './AsideMenuItem.vue';

const route = useRoute()
const childMenu = ref({
  menu: []
})


const {isMenuCollapse} = toRefs(useMenusStore())
const menus = computed(() => {
  const {activeMenuId, menus} = useMenusStore()
  let menu = menus.find(menu => activeMenuId === menu.id)
  return menu && menu.children && menu.children.length ? menu.children : [];
})

const activeMenu = computed(() => {
  return route.path
})

function loadChildMenu (menus) {
  childMenu.value.menu = menus instanceof Array ? menus :[menus]
}

const currentMenu = computed(() => {
  if(childMenu.value.menu && childMenu.value.menu.length) {
    return childMenu.value.menu || []
  }
  return menus.value
})

/**
 * 返回上级导航
 */
function clearChildMenu() {
  childMenu.value.menu = []
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
  box-shadow: 0px 8px 8px 0px rgb(69 90 199 / 7%);

}
.aside-menu .el-menu {
  border-right: none;
}

.menu-top-btn {
  border-bottom: 1px solid rgba(0,0,0,0.08);
  padding-bottom: 7px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.menu-top-btn .menu-top-title {
  font-weight: 400;
  color: rgba(0,0,0,0.85);
  line-height: 22px;
}
.menu-top-btn .i-ep-arrow-left {
  color: rgba(0,0,0,0.65);
}
</style>
