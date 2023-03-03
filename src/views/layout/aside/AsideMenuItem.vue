<!-- Aside Menu Item -->
<template>
  <div class="sumile-aside-menu-items">
    <template v-for="item in menus">
      <el-menu-item :index="item.path" :key="item.id" v-if="!item.children || !item.children.length">
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
            <el-icon>
              <!-- 暂时先注释掉 引入iconfont后放开-->
              <!-- <i v-if="item.source" :class="item.source"></i> -->
              <icon-menu />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <AsideMenuItem :menus="item.children" :show-icon="false"></AsideMenuItem>
        </el-sub-menu>
      </template>

    </template>
  </div>


</template>

<script setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
defineProps({
  menus: {
    type: Array,
    required: true
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: true
  }
})
</script>

<style scoped>
</style>
