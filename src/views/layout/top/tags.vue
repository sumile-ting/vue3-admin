<!-- Tags页签 -->
<template>
  <div class="sumile-tags">
    <el-tabs
      v-model="activeTag"
      type="card"
      class="sumile-tags-tabs"
      @tab-remove="handleRemove"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in tags.arr"
        :key="item.value"
        :label="item.label"
        :name="item.value"
        :closable="tags.arr.length !== 1"
      >
        {{ item.label }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref, watch, computed } from 'vue'
import { useTagsStore } from "@/stores/tags.js";
import {useMenusStore} from '@/stores/menus'
import {useRouter, useRoute} from 'vue-router'
const { tags, setTags } = useTagsStore();
const {activeMenuId, setActiveMenuId} = useMenusStore()
const router = useRouter()
const route = useRoute()
const activeTag = ref(route.path)

/**
 * 监听路由，设置当前tag
 */
watch(() => route.path, (path) => {
  activeTag.value = path
})

/**
 * 移除tag
 * @param {*} tabName 
 */
const handleRemove = function(tabName) {
  const index = tags.arr.findIndex(item => item.value === tabName)
  if(index !== -1) {
    tags.arr.splice(index, 1)
    setTags(tags.arr)
    // 设置当前tag为最后一次点击的tag
    if(tabName === route.path) {
      // 如果关闭本标签，则打开最近一次打开的标签
      const tag = tags.arr.reduce((preVal, curVal) => {
              return preVal.meta.order < curVal.meta.order ? curVal : preVal;
            }, {meta: {order: -1}})
      router.push(tag.value)
    }
  }
}
/**
 * 点击tag
 * @param {*} tab 
 */
const handleClick = function (tab) {
  const path = tab.props.name
  const tag = tags.arr.find(item => item.value === path)
  const { activeMenuId } = useMenusStore()
  // tag的menuId和顶部菜单激活状态的menuId不一致，更新顶部菜单激活状态
  if(tag.meta.menuId && tag.meta.menuId !== activeMenuId) {
    setActiveMenuId(tag.meta.menuId)
  }
  router.push(path)
}
</script>

<style scoped>
.sumile-tags {
  height: 45px;
}
</style>
