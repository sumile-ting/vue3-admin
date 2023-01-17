<!-- 顶部导航栏 -->
<template>
  <el-header class="sumile-top">
    <div class="sumile-header-left">
      <img src="@/assets/logo.svg" />
      <span v-show="!isMenuCollapse">XXX管理系统</span>
      <el-icon @click="handleCollapse"><Expand v-if="isMenuCollapse"/><Fold v-else /></el-icon>
      <el-divider direction="vertical" class="sumile-top-divider"/>
    </div>
    <div class="sumile-header-center">
      <el-menu
        :default-active="activeMenuId"
        class="sumile-top-menu"
        mode="horizontal"
        :ellipsis="false"
        text-color="#fff"
        active-text-color="#fff"
        background-color="#5682dc"
        @select="handleSelect"
      >
      <template v-for="item in menus"  :key="item.id">
        <el-menu-item :index="item.id">{{item.name}}</el-menu-item>

      </template>
      </el-menu>
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
import { ref, getCurrentInstance, computed, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMenusStore } from '@/stores/menus'
import { useTagsStore } from '@/stores/tags'
import {useRouter} from 'vue-router'
const router = useRouter()
const {userInfo, setUserInfo} = useUserStore()
const { proxy } = getCurrentInstance();
const { menus, activeMenuId, setActiveMenuId, setMenus, setMenuCollapse } = useMenusStore()
const {isMenuCollapse} = toRefs(useMenusStore())
const { setTags } = useTagsStore( )

const handleSelect = (key, keyPath) => {
  setActiveMenuId(key)
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
</script>

<style scoped>
.sumile-top {
  background: #5682dc;
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
}
.sumile-header-left span{
  margin-right: 15px;
}
.sumile-header-left .el-icon {
  cursor: pointer;
}
.sumile-top-menu .el-menu-item, .sumile-top-menu .el-menu-item.is-active{
  line-height: var(--sumile-header-height);
  height: var(--sumile-header-height);
  border-bottom: none;
}
.sumile-top-menu .el-menu-item:not(.is-disabled).is-active {
  background-color: var(--el-menu-hover-bg-color);
}
.el-dropdown-link {
  color: #fff;
}
.sumile-top-divider {
  border-left-color: rgba(255, 255, 255, 0.2);
  height: 29px;
}
</style>
