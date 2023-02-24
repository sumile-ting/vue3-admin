<!-- 公共的页面布局，上面显示搜索面板，下面显示表格 -->
<template>
  <div class="sumile-basic-container">
    <slot name="search"></slot>
  
    <div class="sumile-basic-container-table">
      <div class="sumile-basic-container-table-operator">
        <slot name="operator"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>

</style>
