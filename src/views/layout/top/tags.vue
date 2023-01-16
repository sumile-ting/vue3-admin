<!-- Tags页签 -->
<template>
  <div class="sumile-tags">
    <el-tabs
      v-model="active"
      type="card"
      :closable="true"
      class="sumile-tags-tabs"
    >
      <el-tab-pane
        v-for="item in tags"
        :key="item.value"
        :label="item.label"
        :name="item.label"
      >
        {{ item.label }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTagsStore } from "@/stores/tags.js";
const { tags } = useTagsStore();
const active = ref("");
</script>

<style scoped>
.sumile-tags {
  height: 45px;
}
</style>
