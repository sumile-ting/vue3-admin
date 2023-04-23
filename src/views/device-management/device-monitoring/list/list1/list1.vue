<!--  -->
<template>
  <sumile-page-layout  :showFooter="false">
    <sumile-table :columns="columns" :requestApi="getTableData">
      <template #status="{row}">
        <sumile-status-column type="primary" :color="statusColor(row.status)">{{ statusFilter(row.status) }}</sumile-status-column>
      </template>
      <template #addressHeader="{column}">{{ column.label + '表头' }}</template>
    </sumile-table>
  </sumile-page-layout>
  
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from 'vue'
const columns = [
  {
    type: 'selection'
  },
  {
    type: 'index',
    label: '#'
  },
  {
    label: '状态',
    prop: 'status',
    width: '120',
    slot: true
  },
  {
    label: '地址',
    prop: 'address',
    width: 200,
    'show-overflow-tooltip': true,
    headerSlot: true
  }
]
const { proxy } = getCurrentInstance();
// 获取表格数据
function getTableData (params) {
  const newParams = {
    ...params,
  }
  return proxy.$get(`/api/${import.meta.env.VITE_REQUEST_PREFIX}-companies/page`, newParams)
}

/**
 * 状态过滤器
 * @param {*} status 
 */
 function statusFilter(status) {
  const statusArr = ['未开始', '进行中', '出错']
  return statusArr[status]
}

function statusColor(status) {
  const color = ['#62A6ED', '#47D56D', '#E35A7C']
  return color[status]
}
// 初始化

</script>

<style scoped>

</style>
