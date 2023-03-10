<!-- 表格中的状态列  -->
<template>
  <div class="sumile-status-column">
    <span :class="`dot dot--${type}`" :style="color ? {background: color } : null">     
    </span>
    <slot></slot>   
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
    required: true
  },
  color: {
    type: String,
    default: '',
    required: false
  }, 
})
</script>

<style scoped>
.sumile-status-column {
  display: flex;
  align-items: center;
}
.sumile-status-column .dot {
  width: 6px;
  height: 6px;    
  display: inline-block;
  border-radius: 3px;
  margin-right: 8px;
}
</style>
