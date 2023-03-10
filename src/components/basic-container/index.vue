<!-- 公共的页面布局，上面显示搜索面板，下面显示表格 -->
<template>
  <div class="sumile-basic-container">
    <slot name="search"></slot>
  
    <div class="sumile-basic-container-table">
      <div class="sumile-basic-container-table-operator" v-if="$slots.operator">
        <slot name="operator"></slot>
      </div>
      <template v-if="$slots.default">
        <div class="sumile-table-container" :style="{height: tableHeight}">
          <slot></slot>
        </div>
    </template>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
    required: false
  },
  // 是否显示已选择Xx项
  showAlert: {
    type: Boolean,
    default: true,
    required: false
  },
  // 是否显示表格上方的操作按钮
  showOperator: {
    type: Boolean,
    default: true,
    required: false
  }
})

const tableHeight = computed(() => {
  const otherHeight = (props.showOperator ? 44 : 0) + (props.showAlert ? 53 : 0) + (props.showPagination ? 48 : 0)
  return `calc(100% - ${otherHeight}px)`
})

</script>

<style scoped>

</style>
