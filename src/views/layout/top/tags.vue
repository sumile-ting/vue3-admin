<!-- Tags页签 -->
<template>
  <div class="sumile-tags">
    <el-tabs
      v-model="active"
      type="card"
      class="sumile-tags-tabs"
      @tab-remove="handleRemove"
    >
      <el-tab-pane
        v-for="item in tags"
        :key="item.value"
        :label="item.label"
        :name="item.label"
        :closable="tags.length !== 1"
      >
        {{ item.label }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTagsStore } from "@/stores/tags.js";
const { tags, setTags } = useTagsStore();
const active = ref("");
const handleRemove = function(tabName) {
  const index = tags.findIndex(item => item.label === tabName || item.meta.title === tabName)
  if(index !== -1) {
    tags.splice(index, 1)
    setTags(tags)
  }
}
</script>

<style scoped>
.sumile-tags {
  height: 45px;
}
</style>
