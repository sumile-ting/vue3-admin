<!-- Aside Menu Item -->
<template>
  <div class="sumile-aside-menu-items">
    <template v-for="item in menus">
      <el-menu-item :index="item.path" :key="item.id" v-if="!item.children || !item.children.length" @click="open(item)">
        <el-icon v-if="showIcon">
          <!-- 暂时先注释掉 引入iconfont后放开-->
          <!-- <i v-if="item.source" :class="item.source"></i> -->
          <icon-menu />
        </el-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
      <template v-else>
        <el-sub-menu :index="item.path" :key="item.id">
          <template #title>
            <el-icon v-if="showIcon">
              <!-- 暂时先注释掉 引入iconfont后放开-->
              <!-- <i v-if="item.source" :class="item.source"></i> -->
              <icon-menu />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="childItem in item.children">
            <template v-if="isMenuCollapse">
              <el-menu-item :index="childItem.path" :key="childItem.id" v-if="!childItem.children || !childItem.children.length" @click="open(childItem)">
                <template #title>{{ childItem.name }}</template>
              </el-menu-item>
              <AsideMenuItem :menus="[childItem]" :show-icon="false" v-else :activeMenu="activeMenu"></AsideMenuItem>
            </template>
            <template v-else>
              <el-menu-item :index="childItem.path" :key="childItem.id" v-if="!childItem.children || !childItem.children.length" @click="open(childItem)">
                <template #title>{{ childItem.name }}</template>
              </el-menu-item>
              <template v-else>
                <el-popover placement="right" :width="223" trigger="click" :popper-style="{padding: 0}">
                  <template #reference>
                    <el-menu-item :index="childItem.path" :key="childItem.id" @click="open(childItem)">
                      <template #title>{{ childItem.name }}</template>
                    </el-menu-item>
                  </template>
                  <el-menu class="el-menu-inner" router :default-active="activeMenu">
                    <template v-for="childItemChildItem in childItem.children" :key="childItemChildItem">
                      <el-sub-menu
                        v-if="childItemChildItem.children && childItemChildItem.children.length"
                        :index="childItemChildItem.path">
                        <template #title>
                          {{ childItemChildItem.name }}
                        </template>
                        <el-menu-item
                          v-for="child in childItemChildItem.children"
                          :key="child"
                          :index="child.path"
                          @click="loadChildMenu(childItem.children, childItem.path)">
                          <span>{{ child.name }}</span>
                        </el-menu-item>
                      </el-sub-menu>
                      <el-menu-item v-else  :index="childItemChildItem.path">
                        {{ childItemChildItem.name }}
                      </el-menu-item>
                    </template>

                  </el-menu>
                </el-popover>

              </template>
            </template>

          </template>
          <!-- <AsideMenuItem :menus="item.children" :show-icon="false"></AsideMenuItem> -->
        </el-sub-menu>
      </template>

    </template>
  </div>


</template>

<script setup>
import { toRefs, ref, computed} from 'vue'
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import {useRouter, useRoute} from 'vue-router'

import {useMenusStore} from '@/stores/menus.js'
const {isMenuCollapse} = toRefs(useMenusStore())
defineProps({
  menus: {
    type: Array,
    required: true
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: true
  },
  activeMenu: {
    type: String,
    required: false,
    default: ''
  }
})

const emit = defineEmits(['load-child-menu'])

const router = useRouter()


/**
 * 加载子菜单
 * @param {*} subItem 
 */
function loadChildMenu(subItem, path) {
  emit('load-child-menu', subItem, path)
}

/**
 * 点击菜单，路由跳转
 * @param {*} item 
 */
function open(item) {
  if (item.children && item.children.length > 0) return;

  router.push(item.path)
}
</script>

<style scoped>
.el-menu-inner {
  border-right: none;
}
.el-menu-inner .el-sub-menu__title {
  color: rgba(0,0,0,0.85);
}
.el-menu-inner .el-menu-item span{
  color: rgba(0,0,0,0.65);
}

.el-menu-inner li.el-menu-item.is-active {
  background: var(--sumile-aside-active-menu-background);
}
</style>
