<!-- Tags页签 -->
<template>
  <div class="sumile-tags">
    <el-tabs
      v-model="route.path"
      type="card"
      class="sumile-tags-tabs"
      @tab-remove="handleRemove"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in tags"
        :key="item.value"
        :label="item.label"
        :name="item.value"
        :closable="tags.length !== 1"
      >
        {{ item.label }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { useTagsStore } from "@/stores/tags.js";
import {useRouter, useRoute} from 'vue-router'
const { tags, setTags } = useTagsStore();
const router = useRouter()
const route = useRoute()
/**
 * 移除tag
 * @param {*} tabName 
 */
const handleRemove = function(tabName) {
  const index = tags.findIndex(item => item.label === tabName || item.meta.title === tabName)
  if(index !== -1) {
    tags.splice(index, 1)
    setTags(tags)
  }
}
/**
 * 点击tag
 * @param {*} tab 
 */
const handleClick = function (tab) {
  router.push(tab.props.name)
}
</script>

<style scoped>
.sumile-tags {
  height: 45px;
}
</style>
