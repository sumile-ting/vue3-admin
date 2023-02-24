<!-- 顶部导航栏 -->
<template>
  <el-header class="sumile-top">
    <div class="sumile-header-left">
      <img src="@/assets/logo.svg" />
      <Transition><span v-show="!isMenuCollapse">{{config.websiteTitle}}</span></Transition>
      <el-icon @click="handleCollapse"><Expand v-if="isMenuCollapse"/><Fold v-else /></el-icon>
      <el-divider direction="vertical" class="sumile-top-divider"/>
    </div>
    <div class="sumile-header-center">
      <a class="header-home-menu" @click="goHomePage" v-if="config.showIndexPage">
        <el-icon><Menu /></el-icon>
        <span>首页</span>
      </a>
      <el-menu
        :default-active="activeId"
        class="sumile-top-menu"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
      <template v-for="item in menus"  :key="item.id">
        <el-menu-item :index="item.id"><el-icon><HomeFilled /></el-icon>{{item.name}}</el-menu-item>

      </template>

      </el-menu>
      <a  @click="toggleDark()" class="w-30px inline-block" title="切换暗黑主题">
        <button class="border-none w-full bg-transparent cursor-pointer c-white" style="height: 100%;">
          <i inline-flex class="dark:i-ep-moon i-ep-sunny" />
        </button>
      </a>
    </div>
    <div class="sumile-header-right">
      <el-divider direction="vertical"  class="sumile-top-divider"/>
      <img src="@/assets/images/profile.jpg" />
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{userInfo.real_name}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="1">个人信息</el-dropdown-item>
            <el-divider />
            <el-dropdown-item @click="logout" :command="2">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { ref, getCurrentInstance, computed, toRefs, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMenusStore } from '@/stores/menus'
import { useTagsStore } from '@/stores/tags'
import {useRouter} from 'vue-router'
import {getLeafPath} from '@/util/util'
import {
  HomeFilled, Menu
} from '@element-plus/icons-vue'
import config from '@/config/index.js'
import { useDark, useToggle } from '@vueuse/core'

const router = useRouter()
const {userInfo, setUserInfo} = useUserStore()
const { proxy } = getCurrentInstance();
const { menus, activeMenuId, setActiveMenuId, setMenus, setMenuCollapse } = useMenusStore()
const {isMenuCollapse} = toRefs(useMenusStore())
const { setTags } = useTagsStore()

// 切换暗黑模式
const isDark = useDark({
  storageKey: 'system-color-theme'
})
const toggleDark = useToggle(isDark)

/**
 * 切换tags，更新顶部激活状态
 */
const activeId = computed(() => {
  const { activeMenuId } = useMenusStore()
  return activeMenuId
})
/**
 * 顶部菜单点击事件
 * @param {*} key 
 * @param {*} keyPath 
 */
const handleSelect = (key, keyPath) => {
  setActiveMenuId(key)
  const subMenus = menus.find(item => item.id === key)
  if(!subMenus || !subMenus.children.length) {
    router.push('/404')
  }
  const menu = subMenus.children
  const path = getLeafPath(menu)
  router.push(path)
}
/**
 * 点击用户名后的下拉菜单
 * @param {*} command 
 */
const handleCommand = (command) => {
  if(command === 2) {
    logout()
  } else if(command === 1) {
    router.push('/user-info')
  }
}

/**
 * 登出
 */
function logout () {
  proxy.$get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-auth/oauth/logout`).then((res) => {
    setUserInfo({})
    setActiveMenuId('')
    setMenus([])
    setTags([])
    router.push('/login')
  })
}

/**
 * 点击展开/收缩
 */
function handleCollapse () {
  setMenuCollapse(!isMenuCollapse.value)
}

// 回到首页
function goHomePage () {
  router.push('/index')
}
</script>

<style scoped>
.sumile-top {
  background: var(--sumile-top-background);
  color: #fff;
  display: flex;
  height: var(--sumile-header-height);
}
.sumile-header-left img, .sumile-header-right img {
  width: 36px;
  height: 34px;
  object-fit: contain;
  margin-right: 12px;
}
.sumile-header-center {
  width: -webkit-fill-available;
  text-align: right;
}
.sumile-header-right, .sumile-header-left {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}
.sumile-header-right .el-dropdown {
  height: var(--sumile-header-height);
  line-height: var(--sumile-header-height);
  cursor: pointer;
}
.sumile-top-menu {
  display: inline-flex;
  padding-right: 48px;
  box-sizing: border-box;
  border-bottom: none;
}
.sumile-header-left span{
  margin-right: 15px;
}
.sumile-header-left .el-icon {
  cursor: pointer;
}
.sumile-top-menu .el-menu-item {
  line-height: var(--sumile-header-height);
  height: var(--sumile-header-height);
  
}
.sumile-top-menu .el-menu-item.is-active {
  border-bottom-color: #8FC4FF;
}

.sumile-top-menu .el-menu-item:not(.is-disabled).is-active {
   background: linear-gradient(180deg, rgba(94,151,249,0) 0%, #5E97F9 100%);;
}
.el-dropdown-link {
  color: #fff;
}
.sumile-top-divider {
  border-left-color: rgba(255, 255, 255, 0.2);
  height: 29px;
  margin: 0 15px;
}
.header-home-menu {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.header-home-menu span {
  margin-left: 5px;
}
</style>
