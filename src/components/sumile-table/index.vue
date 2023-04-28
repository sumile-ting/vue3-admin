<!-- 封装表格组件 -->
<template>
  <div class="sumile-table-wrapper">

    <!-- 表格头部 操作按钮 -->
    <div class="sumile-table-header mb-12px" v-if="$slots.tableHeader">
      <div class="header-button-lf">
        <slot name="tableHeader" :selectedList="selected" />
      </div>
    </div>

    <!-- 表格主体 -->
    <el-table border stripe height="100%" ref="tableRef" v-bind="$attrs" :data="tableData.records" :row-key="props.rowKey"
      @selection-change="selectionChange">
      <!-- el-table 默认插槽 -->
      <slot></slot>
      <template v-for="(item, index) in props.columns">
        <el-table-column v-bind="item">
          <template #default="{ row }" v-if="item.slot">
            <slot :name="item.prop" v-bind="{ row }" v-if="$slots[item.prop]"></slot>
            <template v-else>{{ row[item.prop] }}</template>
          </template>
          <template #header="{ column }" v-if="item.headerSlot">
            <slot :name="item.prop + 'Header'" v-bind="{ column }" v-if="$slots[item.prop + 'Header']"></slot>
            <template v-else>{{ item.label }}</template>
          </template>
        </el-table-column>

      </template>


    </el-table>
    <!-- 表格下方的已选择XXx项共计XXX条数据 -->
    <div class="sumile-table-alert mt-15px" v-if="props.showAlert">
      <el-tag>
        <div>
          <span class="c-gray">已选择<span style="color: var(--el-color-primary-light-3)">{{ selected.length
          }}</span>项</span>
          <span class="c-black-085 ml-10px">共计<span class="mx-5px">{{ tableData.total }}</span>条数据</span>
        </div>
        <el-button type="primary" text @click="clearSelection()">
          清空已选
        </el-button>
      </el-tag>
    </div>
    <!-- 表格分页 -->
    <sumile-pagination 
      v-if="props.pagination && tableData.total" 
      v-model:current-page="page.currentPage" 
      v-model:page-size="page.pageSize"
      :total="tableData.total"
      :miniView="props.miniView"
    ></sumile-pagination>
  </div>
</template>

<script setup>

import useSelect from './select'
import useTable from './table.js'
const props = defineProps({
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: true
  },
  pageSize: {
    type: Number,
    default: 20
  },
  requestApi: {
    type: Function,
    required: true,
    default: () => { }
  },
  // 是否显示表格底部的alert
  showAlert: {
    type: Boolean,
    default: true
  },
  rowKey: {
    type: [String, Function],
    default: 'id'
  },
  // 对返回的数据进行数据处理
  dataCallBack: {
    type: Function,
    default: null
  },
  // 是否是在dialog中显示表格，dialog中的表格分页和正常表格有区分
  miniView: {
    type: Boolean,
    default: false
  }
})
const tableRef = ref() // 表格ref
const { selected, selectionChange, clearSelection } = useSelect(props.rowKey, tableRef)

const { tableData, getTableData, page } = useTable(props.requestApi, props.dataCallBack, props.pagination, props.pageSize)

onMounted(() => { getTableData() })


defineExpose({
  getTableData,
  page
})
</script>

<style scoped>
.sumile-table-wrapper {
  height: calc(100% - 5px);
  display: flex;
  flex-direction: column;
}

.sumile-table-wrapper:deep(>.el-table) {
  flex: 1;
}
</style>
