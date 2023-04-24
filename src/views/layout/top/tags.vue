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
      </el-tab-pane>
    </el-tabs>
    <div class="sumile-tags-right">
      <el-button @click="closeOther">关闭其他</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import useTag from "./tags.js";
import { useRoute } from 'vue-router'
const route = useRoute()
const activeTag = ref(route.path);
const {tags, handleRemove, handleClick, closeOther} = useTag()
/**
 * 监听路由，设置当前tag
 */
watch(
  () => route.path,
  (path) => {
    activeTag.value = path;
  }
);


</script>

<style scoped>
.sumile-tags {
  margin-bottom: 5px;
  display: flex;
}
.sumile-tags .sumile-tags-tabs {
  flex: 1;
  overflow: hidden;
}
.sumile-tags .sumile-tags-right {
  flex-shrink: 0;
  margin-left: 10px
}
.sumile-tags .sumile-tags-right:deep(>.el-button) {
  box-shadow: var(--sumile-box-shadow);
  border-radius: 4px;
  border: none;
  height: 28px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(0,0,0,0.45);
}
</style>
